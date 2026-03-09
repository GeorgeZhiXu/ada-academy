"""Debating Pro - Live Debate WebSocket Server"""
import asyncio
import json
import random
import string
import time
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# Room storage
rooms: dict[str, dict] = {}

ROUND_TIME = 90  # seconds per round
MAX_ROUNDS = 3


def gen_code():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))


def make_room(code: str, topic: str, creator_name: str):
    return {
        "code": code,
        "topic": topic,
        "players": {},  # ws_id -> {ws, name, side, ready}
        "state": "waiting",  # waiting, picking, live, done
        "round": 0,
        "max_rounds": MAX_ROUNDS,
        "turn": None,  # which player's turn (ws_id)
        "turn_order": [],
        "arguments": [],  # [{player, name, text, round}]
        "timer_task": None,
        "timer_end": None,
        "created": time.time(),
    }


async def broadcast(room, msg):
    data = json.dumps(msg)
    for pid, p in list(room["players"].items()):
        try:
            await p["ws"].send_text(data)
        except Exception:
            pass


async def send_to(ws, msg):
    try:
        await ws.send_text(json.dumps(msg))
    except Exception:
        pass


async def run_timer(room):
    """Countdown timer that auto-advances turn when time runs out."""
    room["timer_end"] = time.time() + ROUND_TIME
    await broadcast(room, {"type": "timer_start", "seconds": ROUND_TIME})
    await asyncio.sleep(ROUND_TIME)

    # Time ran out — skip this turn
    if room["state"] == "live":
        current = room["turn"]
        pname = room["players"].get(current, {}).get("name", "Player")
        await broadcast(room, {"type": "time_up", "player": pname})
        await advance_turn(room)


async def advance_turn(room):
    """Move to the next turn or end the debate."""
    order = room["turn_order"]
    current_idx = order.index(room["turn"]) if room["turn"] in order else -1
    next_idx = current_idx + 1

    if next_idx >= len(order):
        # Both players went — next round
        room["round"] += 1
        if room["round"] > room["max_rounds"]:
            # Debate over
            room["state"] = "done"
            await broadcast(room, {"type": "debate_end", "arguments": room["arguments"]})
            return
        next_idx = 0
        round_type = "rebuttal" if room["round"] == room["max_rounds"] else "constructive"
        await broadcast(room, {
            "type": "new_round",
            "round": room["round"],
            "max_rounds": room["max_rounds"],
            "round_type": round_type
        })

    room["turn"] = order[next_idx]
    turn_player = room["players"][room["turn"]]
    await broadcast(room, {"type": "turn", "player_id": room["turn"], "player_name": turn_player["name"]})

    # Cancel old timer, start new one
    if room["timer_task"] and not room["timer_task"].done():
        room["timer_task"].cancel()
    room["timer_task"] = asyncio.create_task(run_timer(room))


async def start_debate(room):
    """Begin the live debate."""
    room["state"] = "live"
    room["round"] = 1

    pids = list(room["players"].keys())
    random.shuffle(pids)
    # Each round both players go, so turn order = [p1, p2]
    room["turn_order"] = pids
    room["turn"] = pids[0]

    players_info = [{"id": pid, "name": room["players"][pid]["name"], "side": room["players"][pid]["side"]} for pid in pids]

    await broadcast(room, {
        "type": "debate_start",
        "topic": room["topic"],
        "round": 1,
        "max_rounds": room["max_rounds"],
        "players": players_info,
        "first_turn": pids[0],
        "first_name": room["players"][pids[0]]["name"],
        "round_type": "constructive"
    })

    room["timer_task"] = asyncio.create_task(run_timer(room))


@app.websocket("/ws/debate")
async def debate_ws(websocket: WebSocket):
    await websocket.accept()
    ws_id = id(websocket)
    my_room = None

    try:
        while True:
            raw = await websocket.receive_text()
            msg = json.loads(raw)
            action = msg.get("action")

            if action == "create":
                code = gen_code()
                topic = msg.get("topic", "TBD")
                name = msg.get("name", "Player 1")
                room = make_room(code, topic, name)
                room["players"][ws_id] = {"ws": websocket, "name": name, "side": None, "ready": False}
                rooms[code] = room
                my_room = room
                await send_to(websocket, {"type": "room_created", "code": code, "topic": topic})

            elif action == "join":
                code = msg.get("code", "").upper()
                name = msg.get("name", "Player 2")
                room = rooms.get(code)
                if not room:
                    await send_to(websocket, {"type": "error", "msg": "Room not found. Check the code."})
                    continue
                if len(room["players"]) >= 2:
                    await send_to(websocket, {"type": "error", "msg": "Room is full."})
                    continue
                if room["state"] != "waiting":
                    await send_to(websocket, {"type": "error", "msg": "Debate already started."})
                    continue

                room["players"][ws_id] = {"ws": websocket, "name": name, "side": None, "ready": False}
                my_room = room

                pnames = [p["name"] for p in room["players"].values()]
                await broadcast(room, {"type": "player_joined", "players": pnames, "topic": room["topic"], "code": code})

                # Auto-assign sides if 2 players
                if len(room["players"]) == 2:
                    pids = list(room["players"].keys())
                    random.shuffle(pids)
                    room["players"][pids[0]]["side"] = "for"
                    room["players"][pids[1]]["side"] = "against"
                    for pid in pids:
                        p = room["players"][pid]
                        await send_to(p["ws"], {"type": "side_assigned", "side": p["side"], "name": p["name"]})
                    await broadcast(room, {"type": "ready_check", "msg": "Both players connected. Ready up to start!"})

            elif action == "ready":
                if not my_room:
                    continue
                if ws_id in my_room["players"]:
                    my_room["players"][ws_id]["ready"] = True
                    name = my_room["players"][ws_id]["name"]
                    await broadcast(my_room, {"type": "player_ready", "name": name})

                    # Check if all ready
                    all_ready = all(p["ready"] for p in my_room["players"].values())
                    if all_ready and len(my_room["players"]) == 2:
                        await start_debate(my_room)

            elif action == "argument":
                if not my_room or my_room["state"] != "live":
                    continue
                if my_room["turn"] != ws_id:
                    await send_to(websocket, {"type": "error", "msg": "It's not your turn."})
                    continue

                text = msg.get("text", "").strip()
                if not text:
                    continue

                name = my_room["players"][ws_id]["name"]
                side = my_room["players"][ws_id]["side"]
                my_room["arguments"].append({
                    "player_id": ws_id,
                    "name": name,
                    "side": side,
                    "text": text,
                    "round": my_room["round"]
                })

                await broadcast(my_room, {"type": "argument", "name": name, "side": side, "text": text, "round": my_room["round"]})

                # Cancel timer and advance
                if my_room["timer_task"] and not my_room["timer_task"].done():
                    my_room["timer_task"].cancel()
                await advance_turn(my_room)

    except WebSocketDisconnect:
        pass
    except Exception:
        pass
    finally:
        # Cleanup
        if my_room and ws_id in my_room["players"]:
            name = my_room["players"][ws_id]["name"]
            del my_room["players"][ws_id]
            if my_room["timer_task"] and not my_room["timer_task"].done():
                my_room["timer_task"].cancel()
            if len(my_room["players"]) > 0:
                await broadcast(my_room, {"type": "player_left", "name": name})
            else:
                # Remove empty room
                code = my_room.get("code")
                if code and code in rooms:
                    del rooms[code]


@app.get("/health")
async def health():
    return {"status": "ok", "rooms": len(rooms)}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8020)
