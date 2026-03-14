// ===== SURVIVE — 2D Top-Down =====
const C = document.getElementById('game');
const ctx = C.getContext('2d');
let W, H;
function resize() { W = C.width = innerWidth; H = C.height = innerHeight; }
resize(); addEventListener('resize', resize);

// ===== WORLD =====
const TILE = 32;
const MAP_W = 120, MAP_H = 120;
const WORLD = MAP_W * TILE; // total world pixel size

// Camera
let cam = { x: 0, y: 0 };

// Player
let player = { x: MAP_W/2*TILE, y: MAP_H/2*TILE, targetX: 0, targetY: 0, speed: 120, moving: false };

// Game state
const G = { day:1, food:15, water:15, wood:3, meds:1, shelter:0, started:false, over:false, weather:'Clear' };
let equip = 0; // 0=hand,1=spear,2=axe,3=bow,4=trap
const inv = { spear:0, axe:0, bow:0, trap:0 };
const TOOLS = ['Hand','Spear','Axe','Bow','Trap'];
const TOOL_ICONS = ['✊','🔪','🪓','🏹','🪤'];
const RECIPES = [{id:'spear',cost:3,icon:'🔪',name:'Spear'},{id:'axe',cost:2,icon:'🪓',name:'Axe'},{id:'bow',cost:5,icon:'🏹',name:'Bow'},{id:'trap',cost:4,icon:'🪤',name:'Trap'}];

// Entities
let survivors = [];
let trees = [];
let animals = [];
let pickups = [];
let shelters = [];
let particles = [];

// Map tiles (0=grass, 1=water, 2=sand, 3=dirt)
let map = [];

// ===== GENERATE WORLD =====
function genWorld() {
    map = [];
    for (let y = 0; y < MAP_H; y++) {
        map[y] = [];
        for (let x = 0; x < MAP_W; x++) {
            const nx = x/MAP_W - 0.5, ny = y/MAP_H - 0.5;
            const n = Math.sin(nx*12)*Math.cos(ny*10)*0.5 + Math.sin(nx*25+ny*18)*0.3;
            // River running through
            const riverDist = Math.abs(x - MAP_W*0.7);
            if (riverDist < 3 + Math.sin(y*0.2)*2) map[y][x] = 1; // water
            else if (riverDist < 5 + Math.sin(y*0.2)*2) map[y][x] = 2; // sand
            else if (n > 0.3) map[y][x] = 3; // dirt path
            else map[y][x] = 0; // grass
        }
    }

    // Trees
    trees = [];
    for (let i = 0; i < 300; i++) {
        const x = Math.random()*MAP_W*TILE, y = Math.random()*MAP_H*TILE;
        const tx = Math.floor(x/TILE), ty = Math.floor(y/TILE);
        if (tx>=0&&tx<MAP_W&&ty>=0&&ty<MAP_H && map[ty][tx] !== 1 && dist(x,y,player.x,player.y) > 80) {
            trees.push({ x, y, type: Math.random()<0.5?'pine':'oak', hp:3 });
        }
    }

    // Animals
    animals = [];
    for (let i = 0; i < 15; i++) {
        const x = Math.random()*MAP_W*TILE, y = Math.random()*MAP_H*TILE;
        const type = Math.random()<0.4?'deer':Math.random()<0.6?'rabbit':'boar';
        animals.push({ x, y, type, hp: type==='rabbit'?1:type==='deer'?3:5, food: type==='rabbit'?3:type==='deer'?8:12, tx:x, ty:y, timer:0, speed:type==='rabbit'?80:type==='deer'?50:30, alive:true });
    }

    // Pickups (berries, herbs)
    pickups = [];
    spawnPickups(25);

    // Survivors
    survivors = [];
    const NAMES = ['Jordan','Sam','Riley','Morgan','Casey','Quinn','Drew','Avery','Blake'];
    const COLORS = ['#ef4444','#3b82f6','#f59e0b','#8b5cf6','#ec4899','#06b6d4','#f97316','#14b8a6','#6366f1'];
    for (let i = 0; i < 9; i++) {
        const angle = (i/9)*Math.PI*2;
        const r = 60 + Math.random()*40;
        survivors.push({
            name: NAMES[i], color: COLORS[i],
            x: player.x + Math.cos(angle)*r, y: player.y + Math.sin(angle)*r,
            hp:100, hunger:100, thirst:100, morale:80,
            alive:true, sick:false, injured:false,
            task:'idle', tx:0, ty:0, workTimer:0, speed: 40+Math.random()*20
        });
    }
}

function spawnPickups(n) {
    for (let i = 0; i < n; i++) {
        const x = Math.random()*MAP_W*TILE, y = Math.random()*MAP_H*TILE;
        const type = Math.random()<0.6?'berry':'herb';
        pickups.push({ x, y, type, collected:false });
    }
}

// ===== INPUT =====
let mouse = { x:0, y:0, wx:0, wy:0 }; // screen + world coords
let clicked = null; // what was clicked
let rightClick = false;
let hovered = null;
let keys = {};
let showCraft = false;
let aiOpen = false;

C.addEventListener('mousemove', e => {
    mouse.x = e.clientX; mouse.y = e.clientY;
    mouse.wx = e.clientX + cam.x; mouse.wy = e.clientY + cam.y;
    updateHover();
});
C.addEventListener('click', e => {
    if (!G.started || G.over) return;
    mouse.wx = e.clientX + cam.x; mouse.wy = e.clientY + cam.y;

    // Check if clicking an entity
    const clickedEntity = getEntityAt(mouse.wx, mouse.wy);
    if (clickedEntity) {
        handleInteract(clickedEntity);
    } else {
        // Move player
        player.targetX = mouse.wx;
        player.targetY = mouse.wy;
        player.moving = true;
    }
});
C.addEventListener('contextmenu', e => { e.preventDefault(); });
addEventListener('keydown', e => {
    keys[e.code] = true;
    if (e.code === 'Space' && G.started && !G.over) endDay();
    if (e.code === 'KeyC') showCraft = !showCraft;
    if (e.code === 'Digit1') { equip=0; updateHotbar(); }
    if (e.code === 'Digit2') { equip=1; updateHotbar(); }
    if (e.code === 'Digit3') { equip=2; updateHotbar(); }
    if (e.code === 'Digit4') { equip=3; updateHotbar(); }
    if (e.code === 'Digit5') { equip=4; updateHotbar(); }
    if (e.code === 'Tab') { e.preventDefault(); showPeople = !showPeople; }
});
addEventListener('keyup', e => { keys[e.code] = false; });

// ===== HOVER/INTERACTION =====
function getEntityAt(wx, wy) {
    // Survivors first
    for (const s of survivors) {
        if (s.alive && dist(wx,wy,s.x,s.y) < 20) return { type:'survivor', data:s };
    }
    for (const a of animals) {
        if (a.alive && dist(wx,wy,a.x,a.y) < 18) return { type:'animal', data:a };
    }
    for (const p of pickups) {
        if (!p.collected && dist(wx,wy,p.x,p.y) < 16) return { type:'pickup', data:p };
    }
    for (const t of trees) {
        if (t.hp > 0 && dist(wx,wy,t.x,t.y) < 16) return { type:'tree', data:t };
    }
    // Water tile
    const tx = Math.floor(wx/TILE), ty = Math.floor(wy/TILE);
    if (tx>=0&&tx<MAP_W&&ty>=0&&ty<MAP_H && map[ty][tx]===1) return { type:'water' };
    return null;
}

function updateHover() {
    hovered = getEntityAt(mouse.wx, mouse.wy);
    const tip = document.getElementById('tooltip');
    if (hovered) {
        tip.style.display = 'block';
        tip.style.left = (mouse.x+12)+'px';
        tip.style.top = (mouse.y-8)+'px';
        const h = hovered;
        if (h.type==='survivor') tip.textContent = `${h.data.name} (${h.data.task}) — Click to command`;
        else if (h.type==='animal') tip.textContent = `${h.data.type} — HP: ${h.data.hp} — Click to hunt (${TOOLS[equip]})`;
        else if (h.type==='pickup') tip.textContent = `${h.data.type} — Click to pick up`;
        else if (h.type==='tree') tip.textContent = `Tree — Click to chop (+${inv.axe?4:2} wood)`;
        else if (h.type==='water') tip.textContent = `Water — Click to collect (+4 water)`;
    } else {
        tip.style.display = 'none';
    }
}

let commandTarget = null;
let showPeople = false;

function handleInteract(entity) {
    const d = dist(player.x, player.y, entity.type==='water' ? mouse.wx : entity.data?.x||mouse.wx, entity.type==='water' ? mouse.wy : entity.data?.y||mouse.wy);

    // If too far, walk there first
    if (d > 50) {
        player.targetX = entity.type==='water' ? mouse.wx : entity.data?.x || mouse.wx;
        player.targetY = entity.type==='water' ? mouse.wy : entity.data?.y || mouse.wy;
        player.moving = true;
        player.pendingInteract = entity;
        return;
    }

    spawnParticles(entity.data?.x||mouse.wx, entity.data?.y||mouse.wy, '#fff', 5);

    if (entity.type === 'survivor') {
        commandTarget = entity.data;
    }
    else if (entity.type === 'animal') {
        const a = entity.data;
        const dmg = equip===3&&inv.bow?3 : equip===1&&inv.spear?2 : equip===2&&inv.axe?1.5 : 0.5;
        a.hp -= dmg;
        spawnParticles(a.x, a.y, '#ef4444', 8);
        if (a.hp <= 0) {
            a.alive = false;
            G.food += a.food;
            log(`Killed ${a.type}! +${a.food} food`, 'good');
            spawnParticles(a.x, a.y, '#22c55e', 12);
        } else {
            log(`Hit ${a.type} (${Math.ceil(a.hp)} hp left)`, 'warn');
            a.tx = a.x + (a.x-player.x)*2; a.ty = a.y + (a.y-player.y)*2; a.timer=100;
        }
    }
    else if (entity.type === 'pickup' && !entity.data.collected) {
        entity.data.collected = true;
        if (entity.data.type==='berry') { G.food+=3; log('+3 food (berries)','good'); }
        else { G.meds+=1; log('+1 medicine','good'); }
        spawnParticles(entity.data.x, entity.data.y, '#22c55e', 6);
    }
    else if (entity.type === 'tree') {
        const t = entity.data;
        const bonus = equip===2&&inv.axe ? 4 : 2;
        G.wood += bonus;
        t.hp--;
        log(`+${bonus} wood`, 'good');
        spawnParticles(t.x, t.y, '#f59e0b', 6);
        if (t.hp <= 0) spawnParticles(t.x, t.y, '#5c3a1e', 10);
    }
    else if (entity.type === 'water') {
        G.water += 4;
        log('+4 water', 'good');
        spawnParticles(mouse.wx, mouse.wy, '#3b82f6', 8);
    }
    updateHUD();
}

// ===== COMMAND MENU =====
function drawCommandMenu() {
    if (!commandTarget) return;
    const tasks = [
        {id:'hunt',icon:'🏹',label:'Hunt'},
        {id:'forage',icon:'🌿',label:'Forage'},
        {id:'water',icon:'💧',label:'Water'},
        {id:'wood',icon:'🪵',label:'Wood'},
        {id:'build',icon:'🔨',label:'Build'},
        {id:'scout',icon:'🔍',label:'Scout'},
        {id:'rest',icon:'😴',label:'Rest'},
        {id:'heal',icon:'💊',label:'Heal'},
    ];
    // Draw centered panel
    const pw=240, ph=tasks.length*34+50;
    const px=W/2-pw/2, py=H/2-ph/2;
    ctx.fillStyle='rgba(0,0,0,.85)'; roundRect(px,py,pw,ph,12); ctx.fill();
    ctx.strokeStyle='rgba(34,197,94,.3)'; ctx.lineWidth=1; roundRect(px,py,pw,ph,12); ctx.stroke();
    ctx.fillStyle='#22c55e'; ctx.font='bold 13px sans-serif'; ctx.textAlign='center';
    ctx.fillText(`Orders: ${commandTarget.name} (${commandTarget.task})`, W/2, py+22);

    tasks.forEach((t,i) => {
        const by = py+36+i*34, bx=px+8, bw=pw-16, bh=30;
        const hover = mouse.x>=bx&&mouse.x<=bx+bw&&mouse.y>=by&&mouse.y<=by+bh;
        const active = commandTarget.task===t.id;
        ctx.fillStyle = hover?'rgba(34,197,94,.15)':active?'rgba(34,197,94,.08)':'rgba(255,255,255,.03)';
        roundRect(bx,by,bw,bh,6); ctx.fill();
        ctx.fillStyle='#fff'; ctx.font='13px sans-serif'; ctx.textAlign='left';
        ctx.fillText(`${t.icon} [${i+1}] ${t.label}`, bx+10, by+20);

        // Click detection
        if (hover && mouseJustClicked) {
            assignSurvivor(commandTarget, t.id);
        }
    });

    // Key commands
    for (let i=1;i<=8;i++) {
        if (keys[`Digit${i}`]) { assignSurvivor(commandTarget, tasks[i-1].id); keys[`Digit${i}`]=false; }
    }
    if (keys['Escape']) { commandTarget=null; keys['Escape']=false; }
}

const TASK_POS = {
    hunt:{x:-30,y:-25}, forage:{x:-15,y:15}, water:{x:35,y:0}, wood:{x:-25,y:10},
    build:{x:3,y:-3}, scout:{x:0,y:-35}, rest:{x:0,y:0}, heal:{x:2,y:2}, idle:{x:0,y:0}
};

function assignSurvivor(s, task) {
    s.task = task;
    const zone = TASK_POS[task];
    s.tx = player.x + zone.x*TILE + (Math.random()-.5)*40;
    s.ty = player.y + zone.y*TILE + (Math.random()-.5)*40;
    s.workTimer = 0;
    log(`${s.name} → ${task}`, 'good');
    commandTarget = null;
}

// ===== CRAFTING =====
function drawCraftMenu() {
    if (!showCraft) return;
    const pw=220, ph=RECIPES.length*40+40;
    const px=W/2-pw/2, py=H/2-ph/2;
    ctx.fillStyle='rgba(0,0,0,.85)'; roundRect(px,py,pw,ph,12); ctx.fill();
    ctx.strokeStyle='rgba(245,158,11,.3)'; ctx.lineWidth=1; roundRect(px,py,pw,ph,12); ctx.stroke();
    ctx.fillStyle='#f59e0b'; ctx.font='bold 13px sans-serif'; ctx.textAlign='center';
    ctx.fillText(`Crafting (${Math.floor(G.wood)} wood)`, W/2, py+22);

    RECIPES.forEach((r,i) => {
        const by=py+32+i*40, bx=px+8, bw=pw-16, bh=34;
        const can = G.wood >= r.cost;
        const hover = mouse.x>=bx&&mouse.x<=bx+bw&&mouse.y>=by&&mouse.y<=by+bh;
        ctx.globalAlpha = can?1:.4;
        ctx.fillStyle = hover&&can?'rgba(245,158,11,.15)':'rgba(255,255,255,.03)';
        roundRect(bx,by,bw,bh,6); ctx.fill();
        ctx.fillStyle='#fff'; ctx.font='13px sans-serif'; ctx.textAlign='left';
        ctx.fillText(`${r.icon} ${r.name} (${r.cost} wood) x${inv[r.id]}`, bx+10, by+22);
        ctx.globalAlpha=1;

        if (hover && can && mouseJustClicked) {
            G.wood -= r.cost; inv[r.id]++;
            log(`Crafted ${r.name}!`, 'good');
            updateHotbar(); updateHUD();
        }
    });
    if (keys['Escape']) { showCraft=false; keys['Escape']=false; }
}

// ===== PEOPLE PANEL =====
function drawPeoplePanel() {
    if (!showPeople) return;
    const pw=320, ph=survivors.length*42+40;
    const px=W/2-pw/2, py=Math.max(10, H/2-ph/2);
    ctx.fillStyle='rgba(0,0,0,.88)'; roundRect(px,py,pw,ph,12); ctx.fill();
    ctx.fillStyle='#22c55e'; ctx.font='bold 13px sans-serif'; ctx.textAlign='center';
    ctx.fillText('Survivors (TAB to close)', W/2, py+22);

    survivors.forEach((s,i) => {
        const sy = py+32+i*42;
        ctx.fillStyle = s.alive?'rgba(255,255,255,.03)':'rgba(239,68,68,.05)';
        roundRect(px+6,sy,pw-12,38,6); ctx.fill();
        // Name + task
        ctx.fillStyle = s.alive?'#fff':'#666'; ctx.font='bold 12px sans-serif'; ctx.textAlign='left';
        ctx.fillText(`${s.name} [${s.task}]`, px+12, sy+14);
        // Status
        if (s.sick) { ctx.fillStyle='#ef4444'; ctx.fillText('SICK', px+pw-50, sy+14); }
        if (s.injured) { ctx.fillStyle='#f59e0b'; ctx.fillText('HURT', px+pw-50, sy+14); }
        // Bars
        drawBar(px+12, sy+20, 70, 5, s.hp/100, s.hp>50?'#22c55e':s.hp>25?'#f59e0b':'#ef4444');
        drawBar(px+88, sy+20, 50, 5, s.hunger/100, '#f59e0b');
        drawBar(px+144, sy+20, 50, 5, s.thirst/100, '#3b82f6');
        drawBar(px+200, sy+20, 50, 5, s.morale/100, '#8b5cf6');
        // Labels
        ctx.fillStyle='#666'; ctx.font='8px sans-serif';
        ctx.fillText('HP',px+12,sy+34); ctx.fillText('Food',px+88,sy+34);
        ctx.fillText('Water',px+144,sy+34); ctx.fillText('Morale',px+200,sy+34);
    });
    if (keys['Escape']||keys['Tab']) { showPeople=false; keys['Escape']=false; keys['Tab']=false; }
}

function drawBar(x,y,w,h,pct,color) {
    ctx.fillStyle='rgba(255,255,255,.06)'; ctx.fillRect(x,y,w,h);
    ctx.fillStyle=color; ctx.fillRect(x,y,w*Math.max(0,Math.min(1,pct)),h);
}

// ===== END DAY =====
function endDay() {
    const el = document.getElementById('dayover');
    document.getElementById('daytext').textContent = `Night ${G.day}...`;
    el.classList.add('show');
    setTimeout(() => { processDay(); el.classList.remove('show'); }, 1500);
}

function processDay() {
    const alive = survivors.filter(s=>s.alive);
    // Process tasks
    alive.forEach(s => {
        const luck = .7+Math.random()*.6;
        switch(s.task) {
            case 'hunt': { const wb=inv.bow?2:inv.spear?1.5:1; const y=Math.round((3+Math.random()*4)*luck*wb); G.food+=y; if(Math.random()<.12){s.injured=true;s.hp-=15;} log(`${s.name} hunted: +${y} food`,'good'); break; }
            case 'forage': { const f=Math.round((2+Math.random()*2)*luck), w=Math.round((1+Math.random()*2)*luck); G.food+=f;G.water+=w; log(`${s.name}: +${f} food +${w} water`,'good'); break; }
            case 'water': { const w=Math.round((4+Math.random()*3)*luck); G.water+=w; log(`${s.name}: +${w} water`,'good'); break; }
            case 'wood': { const ab=inv.axe?1.5:1; const w=Math.round((2+Math.random()*3)*luck*ab); G.wood+=w; log(`${s.name}: +${w} wood`,'good'); break; }
            case 'build': { if(G.wood>=5&&G.shelter<3){G.wood-=5;G.shelter++;shelters.push({x:player.x+30+shelters.length*50,y:player.y-30,level:G.shelter});log(`${s.name} built shelter! (${G.shelter}/3)`,'good');}break; }
            case 'scout': { if(Math.random()<.4){const b=Math.round(3+Math.random()*8);G.food+=b;log(`${s.name} found +${b} food!`,'good');}break; }
            case 'rest': { s.hp=Math.min(100,s.hp+15);s.morale=Math.min(100,s.morale+12);break; }
            case 'heal': { if(G.meds>0&&(s.sick||s.injured)){G.meds--;s.sick=false;s.injured=false;s.hp=Math.min(100,s.hp+25);log(`${s.name} healed`,'good');}break; }
            case 'idle': { const f=Math.round(1+Math.random()); G.food+=f; break; }
        }
    });
    // Traps
    if (inv.trap>0) { G.food+=inv.trap*2; log(`Traps: +${inv.trap*2} food`,'good'); }
    // Consume
    const n=alive.length+1, save=G.shelter*.1;
    G.food-=Math.round(n*(1-save)); G.water-=Math.round(n*(1-save)); G.wood-=Math.max(1,2-G.shelter);
    if(G.food<0){log('Starvation!','bad');alive.forEach(s=>{s.hp-=10;s.hunger-=20;});G.food=0;}
    else alive.forEach(s=>{s.hunger=Math.min(100,s.hunger+5);});
    if(G.water<0){log('Dehydration!','bad');alive.forEach(s=>{s.hp-=12;s.thirst-=25;});G.water=0;}
    else alive.forEach(s=>{s.thirst=Math.min(100,s.thirst+5);});
    if(G.wood<0){log('No fire!','bad');alive.forEach(s=>{s.hp-=5;s.morale-=8;});G.wood=0;}
    // Sickness
    alive.forEach(s=>{if(s.sick)s.hp-=8;if(s.injured)s.hp-=5;if(Math.random()<.06)s.sick=true;
        if(s.hp<=0||s.hunger<=0||s.thirst<=0){s.alive=false;log(`${s.name} died.`,'bad');}
    });
    // Respawn
    spawnPickups(5);
    if(animals.filter(a=>a.alive).length<5) for(let i=0;i<4;i++){
        animals.push({x:Math.random()*WORLD,y:Math.random()*WORLD,type:Math.random()<.4?'deer':'rabbit',hp:Math.random()<.4?3:1,food:Math.random()<.4?8:3,tx:0,ty:0,timer:0,speed:50,alive:true});
    }
    G.day++;
    const al=survivors.filter(s=>s.alive).length;
    log(`Day ${G.day}. ${al} alive.`,'info');
    if(al===0){G.over=true;log('Everyone died. Game over.','bad');}
    if(G.day>30){G.over=true;log(`RESCUED! ${al} survived!`,'good');}
    updateHUD();
}

// ===== PARTICLES =====
function spawnParticles(x,y,color,n) {
    for(let i=0;i<n;i++) particles.push({x,y,vx:(Math.random()-.5)*60,vy:(Math.random()-.5)*60,life:30+Math.random()*20,color,r:2+Math.random()*3});
}

// ===== AI =====
let aiOpen2 = false;
function toggleAI() { aiOpen2=!aiOpen2; document.getElementById('ai-chat').style.display=aiOpen2?'block':'none'; }
function sendAI() {
    const inp=document.getElementById('ai-in'), msg=inp.value.trim(); if(!msg)return; inp.value='';
    addAI(msg,'me');
    const r = getAdvice(msg);
    setTimeout(()=>addAI(r,'ai'), 300);
}
function addAI(t,who) {
    const el=document.getElementById('ai-msgs'), m=document.createElement('div');
    m.className=`ai-m ${who}`; m.textContent=(who==='ai'?'📡 ':'')+t;
    el.appendChild(m); el.scrollTop=el.scrollHeight;
}
function getAdvice(msg) {
    const m=msg.toLowerCase(), alive=survivors.filter(s=>s.alive);
    const foodDays=G.food>0?Math.floor(G.food/(alive.length+1)):0;
    const waterDays=G.water>0?Math.floor(G.water/(alive.length+1)):0;
    const idle=alive.filter(s=>s.task==='idle').length;
    const sick=alive.filter(s=>s.sick||s.injured).length;
    if(G.food<=0) return "EMERGENCY: No food! Click trees to chop wood, craft a spear (C key), then click animals to hunt them.";
    if(G.water<=0) return "EMERGENCY: No water! Click on the blue river tiles to collect water NOW.";
    if(m.includes('help')||m.includes('what')||m.includes('do')||m.includes('advice')) {
        let a=`Day ${G.day}. ${alive.length} alive. Food: ${Math.floor(G.food)} (${foodDays}d), Water: ${Math.floor(G.water)} (${waterDays}d). `;
        if(idle>2) a+=`${idle} people idle — click them to assign tasks! `;
        if(inv.spear===0&&inv.bow===0&&G.wood>=3) a+="Craft a Spear (press C)! ";
        else if(inv.spear===0&&inv.bow===0) a+=`Need ${3-Math.floor(G.wood)} more wood to craft a Spear. Click trees to chop. `;
        if(foodDays<=2) a+="Get food: hunt animals or pick berries (red dots). ";
        if(G.shelter===0&&G.day>=4) a+="Build shelter! Click a survivor, assign Build. ";
        if(sick>0) a+=`${sick} people sick — need meds. `;
        return a;
    }
    if(m.includes('craft')||m.includes('weapon')) return `Press C to craft. You have ${Math.floor(G.wood)} wood. Spear=3, Axe=2, Bow=5, Trap=4. Press 1-5 to equip tools.`;
    if(m.includes('hunt')||m.includes('animal')) return inv.bow?"Equip bow (4), click animals.":inv.spear?"Equip spear (2), click animals.":"Craft a weapon first! C to open crafting.";
    if(m.includes('food')) return `${Math.floor(G.food)} food (${foodDays} days). Hunt animals, pick berries, or assign foragers.`;
    if(m.includes('water')) return `${Math.floor(G.water)} water (${waterDays} days). Click blue river tiles to collect.`;
    return `Day ${G.day}. ${alive.length} alive. ${idle} idle. Food:${Math.floor(G.food)} Water:${Math.floor(G.water)} Wood:${Math.floor(G.wood)}. Ask me anything specific.`;
}

// ===== DRAW =====
let mouseJustClicked = false;
let lastClickFrame = 0;
C.addEventListener('mousedown', () => { mouseJustClicked = true; });

function draw() {
    requestAnimationFrame(draw);
    if (!G.started) return;
    const dt = 1/60;

    ctx.clearRect(0,0,W,H);

    // WASD movement
    let dx=0,dy=0;
    if(keys['KeyW']||keys['ArrowUp'])dy=-1;
    if(keys['KeyS']||keys['ArrowDown'])dy=1;
    if(keys['KeyA']||keys['ArrowLeft'])dx=-1;
    if(keys['KeyD']||keys['ArrowRight'])dx=1;
    if(dx||dy){
        const len=Math.sqrt(dx*dx+dy*dy);
        player.x+=dx/len*player.speed*dt; player.y+=dy/len*player.speed*dt;
        player.moving=false;
    }

    // Click-to-move
    if(player.moving) {
        const pdx=player.targetX-player.x, pdy=player.targetY-player.y;
        const pd=Math.sqrt(pdx*pdx+pdy*pdy);
        if(pd>3){
            player.x+=pdx/pd*player.speed*dt; player.y+=pdy/pd*player.speed*dt;
        } else {
            player.moving=false;
            if(player.pendingInteract) { handleInteract(player.pendingInteract); player.pendingInteract=null; }
        }
    }

    // Camera follow
    cam.x = player.x - W/2;
    cam.y = player.y - H/2;

    ctx.save();
    ctx.translate(-cam.x, -cam.y);

    // Draw map tiles
    const startX = Math.max(0,Math.floor(cam.x/TILE));
    const startY = Math.max(0,Math.floor(cam.y/TILE));
    const endX = Math.min(MAP_W, Math.ceil((cam.x+W)/TILE)+1);
    const endY = Math.min(MAP_H, Math.ceil((cam.y+H)/TILE)+1);

    for(let y=startY;y<endY;y++) for(let x=startX;x<endX;x++) {
        const t = map[y]?.[x] ?? 0;
        const px=x*TILE, py=y*TILE;
        const n = (Math.sin(x*1.1+y*0.7)*.5+.5)*.15;
        if(t===0) ctx.fillStyle=`rgb(${58+n*40},${110+n*30},${42+n*20})`; // grass
        else if(t===1) ctx.fillStyle=`rgb(${30+n*10},${80+n*20},${140+n*30})`; // water
        else if(t===2) ctx.fillStyle=`rgb(${180+n*20},${160+n*20},${110+n*15})`; // sand
        else ctx.fillStyle=`rgb(${90+n*30},${75+n*20},${55+n*15})`; // dirt
        ctx.fillRect(px,py,TILE+1,TILE+1);
    }

    // Shelters
    shelters.forEach(s => {
        ctx.fillStyle='#5c3a1e'; ctx.fillRect(s.x-15,s.y-15,30,30);
        ctx.fillStyle='#8b6914'; ctx.fillRect(s.x-18,s.y-18,36,6);
        ctx.font='14px sans-serif'; ctx.textAlign='center'; ctx.fillText('🏠',s.x,s.y+5);
    });

    // Trees
    trees.forEach(t => {
        if(t.hp<=0)return;
        ctx.fillStyle='#3a2010'; ctx.fillRect(t.x-2,t.y-2,4,8);
        ctx.fillStyle = t.type==='pine'?'#1a5a1a':'#2a6a2a';
        ctx.beginPath();
        if(t.type==='pine') { ctx.moveTo(t.x,t.y-18);ctx.lineTo(t.x+10,t.y);ctx.lineTo(t.x-10,t.y); }
        else { ctx.arc(t.x,t.y-10,10,0,Math.PI*2); }
        ctx.fill();
        // Shadow
        ctx.fillStyle='rgba(0,0,0,.15)'; ctx.beginPath(); ctx.ellipse(t.x,t.y+4,8,3,0,0,Math.PI*2); ctx.fill();
    });

    // Pickups
    pickups.forEach(p => {
        if(p.collected)return;
        const bob = Math.sin(Date.now()*.004+p.x)*.003;
        ctx.fillStyle = p.type==='berry'?'#dc2626':'#16a34a';
        ctx.beginPath(); ctx.arc(p.x,p.y+bob*100,5,0,Math.PI*2); ctx.fill();
        ctx.fillStyle = p.type==='berry'?'rgba(220,38,38,.2)':'rgba(22,163,74,.2)';
        ctx.beginPath(); ctx.arc(p.x,p.y,10,0,Math.PI*2); ctx.fill();
    });

    // Animals
    animals.forEach(a => {
        if(!a.alive)return;
        a.timer-=1;
        if(a.timer<=0){a.timer=80+Math.random()*120;a.tx=a.x+(Math.random()-.5)*200;a.ty=a.y+(Math.random()-.5)*200;}
        // Flee from player
        if(dist(a.x,a.y,player.x,player.y)<80){a.tx=a.x+(a.x-player.x)*2;a.ty=a.y+(a.y-player.y)*2;a.timer=60;}
        const adx=a.tx-a.x,ady=a.ty-a.y,ad=Math.sqrt(adx*adx+ady*ady);
        if(ad>2){a.x+=adx/ad*a.speed*dt;a.y+=ady/ad*a.speed*dt;}
        // Draw
        ctx.fillStyle='rgba(0,0,0,.1)'; ctx.beginPath(); ctx.ellipse(a.x,a.y+6,6,3,0,0,Math.PI*2); ctx.fill();
        ctx.font='16px sans-serif'; ctx.textAlign='center';
        ctx.fillText(a.type==='deer'?'🦌':a.type==='rabbit'?'🐇':'🐗', a.x, a.y+4);
    });

    // Survivors
    survivors.forEach(s => {
        if(!s.alive)return;
        const sdx=s.tx-s.x,sdy=s.ty-s.y,sd=Math.sqrt(sdx*sdx+sdy*sdy);
        if(sd>3){s.x+=sdx/sd*s.speed*dt;s.y+=sdy/sd*s.speed*dt;}
        // Shadow
        ctx.fillStyle='rgba(0,0,0,.15)'; ctx.beginPath(); ctx.ellipse(s.x,s.y+8,7,3,0,0,Math.PI*2); ctx.fill();
        // Body
        ctx.fillStyle=s.color; ctx.beginPath(); ctx.arc(s.x,s.y,8,0,Math.PI*2); ctx.fill();
        // Head
        ctx.fillStyle='#deb887'; ctx.beginPath(); ctx.arc(s.x,s.y-6,5,0,Math.PI*2); ctx.fill();
        // HP bar
        drawBar(s.x-8,s.y-15,16,2,s.hp/100,s.hp>50?'#22c55e':'#ef4444');
        // Name
        ctx.fillStyle='#fff'; ctx.font='bold 8px sans-serif'; ctx.textAlign='center';
        ctx.fillText(s.name,s.x,s.y+18);
        // Task icon
        const ti = {hunt:'🏹',forage:'🌿',water:'💧',wood:'🪵',build:'🔨',scout:'🔍',rest:'😴',heal:'💊',idle:'💤'}[s.task]||'';
        ctx.font='10px sans-serif'; ctx.fillText(ti,s.x+12,s.y-8);
        // Sick/injured
        if(s.sick) { ctx.font='10px sans-serif'; ctx.fillText('🤢',s.x-12,s.y-8); }
        if(s.injured) { ctx.font='10px sans-serif'; ctx.fillText('🩹',s.x-12,s.y); }
    });

    // Player
    ctx.fillStyle='rgba(0,0,0,.15)'; ctx.beginPath(); ctx.ellipse(player.x,player.y+8,8,3,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#22c55e'; ctx.beginPath(); ctx.arc(player.x,player.y,10,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle='#fff'; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle='#deb887'; ctx.beginPath(); ctx.arc(player.x,player.y-7,6,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#fff'; ctx.font='bold 9px sans-serif'; ctx.textAlign='center';
    ctx.fillText('YOU',player.x,player.y+20);
    // Equipped tool
    ctx.font='12px sans-serif'; ctx.fillText(TOOL_ICONS[equip],player.x+14,player.y);

    // Particles
    particles = particles.filter(p=>p.life>0);
    particles.forEach(p=>{
        p.x+=p.vx*dt; p.y+=p.vy*dt; p.life--;
        ctx.globalAlpha=p.life/50; ctx.fillStyle=p.color;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
    });
    ctx.globalAlpha=1;

    // Move indicator
    if(player.moving) {
        ctx.strokeStyle='rgba(34,197,94,.3)'; ctx.lineWidth=1; ctx.setLineDash([4,4]);
        ctx.beginPath(); ctx.moveTo(player.x,player.y); ctx.lineTo(player.targetX,player.targetY); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle='rgba(34,197,94,.4)'; ctx.beginPath(); ctx.arc(player.targetX,player.targetY,4,0,Math.PI*2); ctx.fill();
    }

    ctx.restore();

    // UI overlays
    drawCommandMenu();
    drawCraftMenu();
    drawPeoplePanel();

    // Minimap
    drawMinimap();

    mouseJustClicked = false;
}

// ===== MINIMAP =====
function drawMinimap() {
    const mc=document.getElementById('mmc').getContext('2d');
    mc.fillStyle='#0a1a0a'; mc.fillRect(0,0,120,120);
    const scale = 120/(MAP_W*TILE);
    // Water
    mc.fillStyle='rgba(30,80,140,.5)';
    for(let y=0;y<MAP_H;y+=4) for(let x=0;x<MAP_W;x+=4) {
        if(map[y]?.[x]===1) mc.fillRect(x*TILE*scale,y*TILE*scale,4,4);
    }
    // Trees
    mc.fillStyle='#0a3a0a'; trees.forEach(t=>{if(t.hp>0)mc.fillRect(t.x*scale,t.y*scale,1,1);});
    // Survivors
    mc.fillStyle='#3b82f6'; survivors.forEach(s=>{if(s.alive)mc.fillRect(s.x*scale-1,s.y*scale-1,2,2);});
    // Player
    mc.fillStyle='#22c55e'; mc.beginPath(); mc.arc(player.x*scale,player.y*scale,3,0,Math.PI*2); mc.fill();
}

// ===== HUD =====
function updateHUD() {
    const cl=v=>v<=5?'hb-low':v<=12?'hb-ok':'hb-good';
    const al=survivors.filter(s=>s.alive).length;
    document.getElementById('hud').innerHTML=`
        <div class="hud-box"><b class="hb-good">${G.day}</b>Day/30</div>
        <div class="hud-box"><b>${al+1}</b>Alive</div>
        <div class="hud-box"><b class="${cl(G.food)}">🍖${Math.floor(G.food)}</b></div>
        <div class="hud-box"><b class="${cl(G.water)}">💧${Math.floor(G.water)}</b></div>
        <div class="hud-box"><b class="${cl(G.wood)}">🪵${Math.floor(G.wood)}</b></div>
        <div class="hud-box"><b>💊${G.meds}</b></div>
        <div class="hud-box"><b>🏠${G.shelter}/3</b></div>
    `;
}
function updateHotbar() {
    document.getElementById('hotbar').innerHTML = TOOL_ICONS.map((ic,i)=>{
        const cnt = i===0?'':inv[RECIPES[i-1]?.id]||0;
        return `<div class="hb-slot ${i===equip?'active':''}" onclick="equip=${i};updateHotbar()"><span class="key">${i+1}</span>${ic}${cnt?`<span class="cnt">${cnt}</span>`:''}</div>`;
    }).join('');
}

// ===== LOG =====
function log(t,type) {
    const el=document.getElementById('log'), m=document.createElement('div');
    m.className=`log-msg ${type||''}`; m.textContent=t;
    el.appendChild(m); while(el.children.length>6)el.removeChild(el.firstChild);
    setTimeout(()=>{m.style.opacity='0';m.style.transition='opacity .5s';setTimeout(()=>m.remove(),500);},5000);
}

// ===== UTIL =====
function dist(x1,y1,x2,y2){return Math.sqrt((x2-x1)**2+(y2-y1)**2);}
function roundRect(x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);ctx.lineTo(x+r,y+h);ctx.quadraticCurveTo(x,y+h,x,y+h-r);ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();}

// ===== START =====
function start() {
    document.getElementById('title').classList.add('hidden');
    G.started = true;
    player.targetX = player.x; player.targetY = player.y;
    genWorld();
    updateHUD();
    updateHotbar();
    draw();
    log('Click to move. Click things to interact. SPACE = end day. C = craft. TAB = people.','info');
    setTimeout(()=>{
        addAI("We're stranded. 10 of us. Click your survivors to give them jobs — hunt, forage, fetch water. Click trees to chop wood. Press C to craft weapons. Ask me anything.",'ai');
        document.getElementById('ai-chat').style.display='block'; aiOpen2=true;
        setTimeout(()=>{document.getElementById('ai-chat').style.display='none';aiOpen2=false;},8000);
    },1500);
}
draw();
