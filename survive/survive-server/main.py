"""Survive Game — AI Companion Server"""
import os
import json
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY", ""))

SYSTEM_PROMPT = """You are the AI companion in a wilderness survival game called "Survive." The player leads 10 survivors stranded in the wilderness trying to survive 30 days until rescue.

Your role: Be a helpful, in-character survival advisor. You speak as if you're there with them.

Current game state will be provided. Give SHORT, practical advice (2-3 sentences max). Be direct.

You can:
- Suggest what to do next
- Warn about dangers
- Comment on the situation
- Give survival tips
- React to events

Stay in character. Don't break the fourth wall. Don't mention "the game" — treat it as real.
Keep responses under 50 words. Be concise and urgent like a real survival situation."""


@app.post("/api/survive/ai")
async def ai_chat(request: Request):
    body = await request.json()
    message = body.get("message", "")
    game_state = body.get("state", {})

    state_summary = f"""Day {game_state.get('day', 1)}/30. {game_state.get('alive', 10)} survivors alive.
Food: {game_state.get('food', 0)}, Water: {game_state.get('water', 0)}, Wood: {game_state.get('wood', 0)}, Meds: {game_state.get('meds', 0)}.
Shelter level: {game_state.get('shelter', 0)}/3. Weather: {game_state.get('weather', 'Clear')}.
Inventory: spear={game_state.get('spear', 0)}, axe={game_state.get('axe', 0)}, bow={game_state.get('bow', 0)}, trap={game_state.get('trap', 0)}."""

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "system", "content": f"Current situation: {state_summary}"},
                {"role": "user", "content": message},
            ],
            max_tokens=100,
            temperature=0.8,
        )
        reply = response.choices[0].message.content.strip()
        return {"reply": reply}
    except Exception as e:
        return {"reply": f"[Radio static] Can't reach base... ({str(e)[:50]})"}


@app.get("/api/survive/health")
async def health():
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8021)
