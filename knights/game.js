// ===== WAR OF THE KNIGHTS — Web Version =====

let P = {};
let enemy = {};
let wave = 1;
let defending = false;
let inCombat = false;
let simRunning = false;

const ENEMIES = [
    { name:'Goblin Scout',  sprite:'👺', tier:1 },
    { name:'Orc Warrior',   sprite:'👹', tier:2 },
    { name:'Dark Knight',   sprite:'🗡️', tier:3 },
    { name:'Forest Troll',  sprite:'🧌', tier:3 },
    { name:'Shadow Mage',   sprite:'🧙', tier:4 },
    { name:'Fire Dragon',   sprite:'🐉', tier:5 },
    { name:'Death Lord',    sprite:'💀', tier:5 },
    { name:'Skeleton',      sprite:'💀', tier:1 },
];

const SHOP = [
    { id:'potion', name:'Health Potion', desc:'Heals 30 HP in battle', icon:'🧪', cost:20, fn(p){ p.potions++; } },
    { id:'sword',  name:'Upgrade Sword', desc:'+3 base attack', icon:'⚔️', cost:50, fn(p){ p.baseAtk+=3; } },
    { id:'shield', name:'Upgrade Shield', desc:'+2 defense', icon:'🛡️', cost:40, fn(p){ p.def+=2; } },
    { id:'hp',     name:'Vitality Rune', desc:'+15 max HP', icon:'❤️', cost:30, fn(p){ p.maxHp+=15; p.hp+=15; } },
    { id:'crit',   name:'Crit Gem', desc:'+5% crit chance', icon:'💎', cost:60, fn(p){ p.critChance=Math.min(0.4,p.critChance+0.05); } },
    { id:'pot5',   name:'Potion Pack (x3)', desc:'3 potions at discount', icon:'🧪🧪🧪', cost:50, fn(p){ p.potions+=3; } },
];

// ===== SCREEN MANAGEMENT =====
function show(id) {
    ['title','game','shop','gameover','sim-setup','sim-battle','dungeon-screen'].forEach(s => {
        const el = document.getElementById(s);
        if (el) el.style.display = 'none';
    });
    const target = document.getElementById(id);
    if (target) target.style.display = (id === 'gameover') ? 'flex' : 'block';
    simRunning = false;
}

// ===== ARENA MODE =====
function beginGame() {
    P = { maxHp:100, hp:100, baseAtk:15, def:5, gold:50, potions:3, potionHeal:30, level:1, exp:0, expNext:100, critChance:0.1, kills:0 };
    wave = 1;
    show('game');
    startWave();
}

function startWave() {
    const pool = ENEMIES.filter(e => e.tier <= Math.ceil(wave / 2));
    const template = pool[Math.floor(Math.random() * pool.length)];
    const base = wave * 10;
    enemy = {
        name: template.name, sprite: template.sprite,
        maxHp: rand(base + 10, base + 40), hp: 0,
        atk: rand(wave * 3 + 5, wave * 3 + 15),
        level: wave,
        goldReward: rand(wave * 5, wave * 15),
        expReward: rand(wave * 10, wave * 20),
    };
    enemy.hp = enemy.maxHp;
    defending = false;
    inCombat = true;

    document.getElementById('wave-title').textContent = `Wave ${wave}`;
    document.getElementById('wave-sub').textContent = `A ${enemy.name} appears!`;
    clearLog();
    addLog(`⚔️ A wild ${enemy.name} (Level ${enemy.level}) enters the arena!`, 'info');
    updateUI();
    renderCombatActions();
}

function doAction(action) {
    if (!inCombat) return;
    defending = false;

    if (action === 'attack') {
        let dmg = rand(P.baseAtk - 4, P.baseAtk + 4);
        let isCrit = Math.random() < P.critChance;
        if (isCrit) { dmg = Math.floor(dmg * 2); addLog('💥 CRITICAL HIT!', 'crit'); }
        enemy.hp = Math.max(0, enemy.hp - dmg);
        addLog(`You strike ${enemy.name} for ${dmg} damage!`, 'dmg');
        animateHit('enemy-card');
        if (enemy.hp <= 0) { victory(); return; }
    } else if (action === 'defend') {
        defending = true;
        addLog('🛡️ You raise your shield.', 'info');
    } else if (action === 'potion') {
        if (P.potions <= 0) { addLog('No potions left!', 'dmg'); }
        else { P.potions--; P.hp = Math.min(P.maxHp, P.hp + P.potionHeal); addLog(`🧪 Healed ${P.potionHeal} HP!`, 'heal'); }
    } else if (action === 'run') {
        if (Math.random() < 0.5) {
            addLog('🏃 You fled!', 'info');
            inCombat = false;
            wave++;
            updateUI();
            setTimeout(showWaveTransition, 500);
            return;
        } else { addLog('❌ Failed to escape!', 'dmg'); }
    }

    if (enemy.hp > 0) setTimeout(enemyTurn, 500);
    updateUI();
}

function enemyTurn() {
    let dmg = rand(enemy.atk - 3, enemy.atk + 3);
    if (defending) { dmg = Math.max(1, Math.floor(dmg / 2)); addLog('🛡️ Shield absorbs some damage!', 'info'); }
    const reduced = Math.max(1, dmg - P.def);
    P.hp = Math.max(0, P.hp - reduced);
    addLog(`${enemy.name} attacks for ${reduced} damage!`, 'dmg');
    animateHit('player-card');
    if (P.hp <= 0) { gameOver(); return; }
    updateUI();
}

function victory() {
    inCombat = false;
    P.gold += enemy.goldReward;
    P.kills++;
    addLog(`✅ ${enemy.name} defeated!`, 'heal');
    addLog(`💰 +${enemy.goldReward} gold | +${enemy.expReward} EXP`, 'gold-log');
    if (Math.random() < 0.3) { P.potions++; addLog('🧪 Found a potion!', 'heal'); }
    P.exp += enemy.expReward;
    if (P.exp >= P.expNext) {
        P.exp -= P.expNext; P.level++; P.expNext = Math.floor(P.expNext * 1.5);
        P.maxHp += 20; P.hp = P.maxHp; P.baseAtk += 5; P.def += 2;
        addLog(`⭐ LEVEL UP! Now level ${P.level}!`, 'crit');
    }
    P.hp = Math.min(P.maxHp, P.hp + 10);
    wave++;
    updateUI();
    setTimeout(showWaveTransition, 800);
}

function showWaveTransition() {
    // Show shop/continue buttons
    const el = document.getElementById('actions');
    el.innerHTML = `
        <button class="act" onclick="openShop()"><span class="icon">🛒</span>Visit Shop</button>
        <button class="act" onclick="startWave()"><span class="icon">⚔️</span>Next Wave (${wave})</button>
    `;
}

function gameOver() {
    inCombat = false;
    show('gameover');
    document.getElementById('final-stats').textContent = `Wave ${wave} | Level ${P.level} | ${P.kills} Kills | ${P.gold} Gold`;
}

// ===== SHOP =====
function openShop() {
    show('shop');
    document.getElementById('shop-gold').textContent = P.gold;
    document.getElementById('shop-items').innerHTML = SHOP.map(s => {
        const can = P.gold >= s.cost;
        return `<div class="shop-item ${can?'':'cant'}" onclick="${can ? `buyItem('${s.id}')` : ''}">
            <span class="shop-icon">${s.icon}</span>
            <div class="shop-info"><h4>${s.name}</h4><p>${s.desc}</p></div>
            <span class="shop-price">💰 ${s.cost}</span>
        </div>`;
    }).join('');
}
function buyItem(id) {
    const item = SHOP.find(s => s.id === id);
    if (!item || P.gold < item.cost) return;
    P.gold -= item.cost;
    item.fn(P);
    openShop();
}
function leaveShop() { show('game'); startWave(); }

// ===== UI =====
function updateUI() {
    document.getElementById('stats-bar').innerHTML = `
        <div class="stat"><b class="gold">💰 ${P.gold}</b></div>
        <div class="stat"><b class="blue">Lvl ${P.level}</b></div>
        <div class="stat"><b>🧪 ${P.potions}</b></div>
        <div class="stat"><b>EXP ${P.exp}/${P.expNext}</b></div>
        <div class="stat"><b>Kills: ${P.kills}</b></div>
    `;
    const pPct = Math.max(0, P.hp / P.maxHp * 100);
    document.getElementById('player-hp-fill').style.width = pPct + '%';
    document.getElementById('player-hp-fill').className = 'hp-fill ' + (pPct > 50 ? 'green' : pPct > 25 ? 'yellow' : 'red');
    document.getElementById('player-hp-text').textContent = `${P.hp}/${P.maxHp}`;
    document.getElementById('p-atk').textContent = P.baseAtk;
    document.getElementById('p-def').textContent = P.def;

    const ePct = Math.max(0, enemy.hp / (enemy.maxHp||1) * 100);
    document.getElementById('enemy-hp-fill').style.width = ePct + '%';
    document.getElementById('enemy-hp-fill').className = 'hp-fill ' + (ePct > 50 ? 'red' : ePct > 25 ? 'yellow' : 'red');
    document.getElementById('enemy-hp-text').textContent = `${Math.max(0,enemy.hp||0)}/${enemy.maxHp||0}`;
    document.getElementById('enemy-name').textContent = enemy.name || '???';
    document.getElementById('enemy-sprite').textContent = enemy.sprite || '👹';
    document.getElementById('e-atk').textContent = enemy.atk || 0;
    document.getElementById('e-lvl').textContent = enemy.level || 1;
}

function renderCombatActions() {
    document.getElementById('actions').innerHTML = `
        <button class="act" onclick="doAction('attack')"><span class="icon">⚔️</span>Attack<div class="desc">Strike with your sword</div></button>
        <button class="act" onclick="doAction('defend')"><span class="icon">🛡️</span>Defend<div class="desc">Block half damage</div></button>
        <button class="act" onclick="doAction('potion')"><span class="icon">🧪</span>Potion (${P.potions})<div class="desc">Heal ${P.potionHeal} HP</div></button>
        <button class="act" onclick="doAction('run')"><span class="icon">🏃</span>Run<div class="desc">50% chance to flee</div></button>
    `;
}

function animateHit(id) {
    const el = document.getElementById(id);
    el.classList.add('shake','hit');
    setTimeout(() => el.classList.remove('shake','hit'), 400);
    playHit();
}
function addLog(text, cls) {
    const log = document.getElementById('log');
    const e = document.createElement('div');
    e.className = `log-entry ${cls||''}`;
    e.textContent = text;
    log.prepend(e);
    while (log.children.length > 20) log.removeChild(log.lastChild);
}
function clearLog() { document.getElementById('log').innerHTML = ''; }

// ===== SOUND =====
let audioCtx;
function playHit() {
    try {
        if (!audioCtx) audioCtx = new (window.AudioContext||window.webkitAudioContext)();
        const o=audioCtx.createOscillator(),g=audioCtx.createGain();
        o.connect(g);g.connect(audioCtx.destination);
        o.frequency.setValueAtTime(250,audioCtx.currentTime);
        o.frequency.exponentialRampToValueAtTime(80,audioCtx.currentTime+.12);
        g.gain.setValueAtTime(.15,audioCtx.currentTime);
        g.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+.15);
        o.start();o.stop(audioCtx.currentTime+.15);
    } catch(e){}
}

// ===== SIMULATOR =====
let simK1, simK2, simSpeed = 600;
function showSimSetup() { show('sim-setup'); }
function randomizeKnights() {
    const n=['Arthur','Lancelot','Galahad','Percival','Gawain','Tristan','Bedivere','Gareth','Roland','Siegfried'];
    document.getElementById('k1-name').value='Sir '+n[rand(0,n.length-1)];
    document.getElementById('k1-hp').value=rand(80,150);
    document.getElementById('k1-atk').value=rand(10,25);
    document.getElementById('k1-def').value=rand(2,10);
    document.getElementById('k2-name').value='Sir '+n[rand(0,n.length-1)];
    document.getElementById('k2-hp').value=rand(80,150);
    document.getElementById('k2-atk').value=rand(10,25);
    document.getElementById('k2-def').value=rand(2,10);
}
function startSim() {
    const hp1=clamp(parseInt(document.getElementById('k1-hp').value)||100,50,200);
    const hp2=clamp(parseInt(document.getElementById('k2-hp').value)||100,50,200);
    simK1={name:document.getElementById('k1-name').value||'Knight 1',maxHp:hp1,hp:hp1,atk:clamp(parseInt(document.getElementById('k1-atk').value)||15,5,30),def:clamp(parseInt(document.getElementById('k1-def').value)||5,0,15),crit:.1};
    simK2={name:document.getElementById('k2-name').value||'Knight 2',maxHp:hp2,hp:hp2,atk:clamp(parseInt(document.getElementById('k2-atk').value)||15,5,30),def:clamp(parseInt(document.getElementById('k2-def').value)||5,0,15),crit:.1};
    simSpeed=parseInt(document.getElementById('sim-speed').value)||600;
    show('sim-battle');
    document.getElementById('sim-log').innerHTML='';
    document.getElementById('sim-k1-name').textContent=simK1.name;
    document.getElementById('sim-k2-name').textContent=simK2.name;
    document.getElementById('sim-k1-atk').textContent=simK1.atk;
    document.getElementById('sim-k1-def').textContent=simK1.def;
    document.getElementById('sim-k2-atk').textContent=simK2.atk;
    document.getElementById('sim-k2-def').textContent=simK2.def;
    updateSimUI();
    simAddLog(`⚔️ ${simK1.name} vs ${simK2.name} — FIGHT!`,'info');
    simRunning=true;
    simTurn(0,1);
}
function simTurn(turn,roundNum) {
    if (!simRunning) return;
    const a=turn===0?simK1:simK2, d=turn===0?simK2:simK1;
    document.getElementById('sim-round').textContent=`Round ${roundNum}`;
    let dmg=rand(a.atk-3,a.atk+3);
    let crit=Math.random()<a.crit;
    if(crit)dmg=Math.floor(dmg*1.5);
    const actual=Math.max(1,dmg-d.def);
    d.hp=Math.max(0,d.hp-actual);
    simAddLog(`${a.name} → ${d.name} for ${actual}${crit?' 💥 CRIT!':''}`,crit?'crit':'dmg');
    animateHit(d===simK1?'sim-k1-card':'sim-k2-card');
    updateSimUI();
    if(d.hp<=0){simRunning=false;simAddLog(`💀 ${d.name} falls!`,'dmg');simAddLog(`🏆 ${a.name} WINS!`,'heal');document.getElementById('sim-round').textContent=`🏆 ${a.name} Wins!`;return;}
    setTimeout(()=>simTurn(1-turn,turn===1?roundNum+1:roundNum),simSpeed);
}
function updateSimUI() {
    const p1=Math.max(0,simK1.hp/simK1.maxHp*100),p2=Math.max(0,simK2.hp/simK2.maxHp*100);
    document.getElementById('sim-k1-hp').style.width=p1+'%';
    document.getElementById('sim-k1-hp').className='hp-fill '+(p1>50?'green':p1>25?'yellow':'red');
    document.getElementById('sim-k1-hp-text').textContent=`${Math.max(0,simK1.hp)}/${simK1.maxHp}`;
    document.getElementById('sim-k2-hp').style.width=p2+'%';
    document.getElementById('sim-k2-hp').className='hp-fill '+(p2>50?'red':p2>25?'yellow':'red');
    document.getElementById('sim-k2-hp-text').textContent=`${Math.max(0,simK2.hp)}/${simK2.maxHp}`;
}
function simAddLog(t,c){const l=document.getElementById('sim-log'),e=document.createElement('div');e.className=`log-entry ${c||''}`;e.textContent=t;l.prepend(e);while(l.children.length>50)l.removeChild(l.lastChild);}

// ===== DUNGEON MODE =====
let dMap, dPlayer, dEnemies, dPotions, dExitPos, dungeonOver;
const D_W=10, D_H=8;
const D_TILES={floor:'.',wall:'#',enemy:'E',potion:'P',exit:'X',player:'@'};

function startDungeon() {
    show('dungeon-screen');
    dPlayer={x:1,y:1,hp:50,maxHp:50,atk:12,def:3,potions:2,potionHeal:20,level:1};
    dEnemies=[];dPotions=[];dungeonOver=false;
    generateDungeon();
    renderDungeon();
}

function generateDungeon() {
    dMap=[];
    for(let y=0;y<D_H;y++){dMap[y]=[];for(let x=0;x<D_W;x++){
        if(x===0||y===0||x===D_W-1||y===D_H-1) dMap[y][x]='#';
        else dMap[y][x]='.';
    }}
    dExitPos={x:D_W-2,y:D_H-2};
    dMap[dExitPos.y][dExitPos.x]='X';
    // Enemies
    dEnemies=[];
    for(let i=0;i<3+rand(0,3);i++){
        const x=rand(2,D_W-3),y=rand(2,D_H-3);
        if((x===1&&y===1)||(x===dExitPos.x&&y===dExitPos.y))continue;
        if(dMap[y][x]==='.'){dMap[y][x]='E';dEnemies.push({x,y});}
    }
    // Potions
    dPotions=[];
    for(let i=0;i<rand(2,4);i++){
        const x=rand(1,D_W-2),y=rand(1,D_H-2);
        if(dMap[y][x]==='.'){dMap[y][x]='P';dPotions.push({x,y});}
    }
    // Some random walls for interest
    for(let i=0;i<6;i++){
        const x=rand(2,D_W-3),y=rand(2,D_H-3);
        if(dMap[y][x]==='.'&&!(x===1&&y===1))dMap[y][x]='#';
    }
}

function renderDungeon() {
    const grid=document.getElementById('d-grid');
    if(!grid)return;
    let html='';
    for(let y=0;y<D_H;y++){
        for(let x=0;x<D_W;x++){
            let cls='d-floor',ch='';
            if(x===dPlayer.x&&y===dPlayer.y){cls='d-player';ch='@';}
            else{
                const t=dMap[y][x];
                if(t==='#'){cls='d-wall';ch='';}
                else if(t==='E'){cls='d-enemy';ch='👹';}
                else if(t==='P'){cls='d-potion';ch='🧪';}
                else if(t==='X'){cls='d-exit';ch='🚪';}
                else{cls='d-floor';ch='';}
            }
            html+=`<div class="d-cell ${cls}">${ch}</div>`;
        }
    }
    grid.innerHTML=html;
    // Stats
    const stats=document.getElementById('d-stats');
    if(stats){
        const pct=Math.max(0,dPlayer.hp/dPlayer.maxHp*100);
        const barCol=pct>50?'var(--green)':pct>25?'var(--gold)':'var(--red)';
        stats.innerHTML=`
            <span>❤️ ${dPlayer.hp}/${dPlayer.maxHp}</span>
            <div style="width:100px;height:8px;background:rgba(255,255,255,.06);border-radius:4px;overflow:hidden"><div style="width:${pct}%;height:100%;background:${barCol};border-radius:4px;transition:width .3s"></div></div>
            <span>⚔️ ${dPlayer.atk}</span><span>🛡️ ${dPlayer.def}</span><span>🧪 ${dPlayer.potions}</span><span>Lvl ${dPlayer.level}</span>
        `;
    }
}

function dungeonMove(dx,dy) {
    if(dungeonOver)return;
    const nx=dPlayer.x+dx, ny=dPlayer.y+dy;
    if(nx<0||ny<0||nx>=D_W||ny>=D_H)return;
    const tile=dMap[ny][nx];
    if(tile==='#')return;

    const dlog=document.getElementById('d-log');
    if(tile==='E'){
        // Combat
        const elvl=Math.max(1,dPlayer.level+rand(-1,1));
        const ehp=rand(20+elvl*5,40+elvl*8);
        const eatk=rand(5+elvl*2,10+elvl*3);
        const ename=['Goblin','Orc','Skeleton','Dark Knight'][rand(0,3)];
        // Simple auto-resolve: player attacks, enemy attacks, repeat
        let eHp=ehp;
        let log=`⚔️ Fighting ${ename} (HP:${ehp} ATK:${eatk})...\n`;
        while(dPlayer.hp>0&&eHp>0){
            let pdmg=rand(dPlayer.atk-3,dPlayer.atk+3);
            if(Math.random()<0.1)pdmg*=2;
            eHp-=Math.max(1,pdmg);
            if(eHp<=0){log+=`✅ ${ename} defeated!\n`;break;}
            let edmg=Math.max(1,rand(eatk-2,eatk+2)-dPlayer.def);
            dPlayer.hp-=edmg;
        }
        if(dPlayer.hp<=0){
            dPlayer.hp=0;dungeonOver=true;
            if(dlog)dlog.textContent=log+'💀 You died!';
            renderDungeon();return;
        }
        // Victory
        dMap[ny][nx]='.';
        dEnemies=dEnemies.filter(e=>!(e.x===nx&&e.y===ny));
        dPlayer.level++;dPlayer.maxHp+=15;dPlayer.hp=dPlayer.maxHp;dPlayer.atk+=3;dPlayer.def+=1;
        dPlayer.x=nx;dPlayer.y=ny;
        if(dlog)dlog.textContent=log+`⭐ Level up! Now level ${dPlayer.level}`;
    } else if(tile==='P'){
        dPlayer.potions++;
        dMap[ny][nx]='.';
        dPotions=dPotions.filter(p=>!(p.x===nx&&p.y===ny));
        dPlayer.x=nx;dPlayer.y=ny;
        if(dlog)dlog.textContent='🧪 Found a potion!';
    } else if(tile==='X'){
        dPlayer.x=nx;dPlayer.y=ny;dungeonOver=true;
        if(dlog)dlog.textContent='🏆 You reached the exit! VICTORY!';
    } else {
        dPlayer.x=nx;dPlayer.y=ny;
        if(dlog)dlog.textContent='';
    }
    renderDungeon();
}

function dungeonUsePotion() {
    if(dungeonOver||dPlayer.potions<=0)return;
    dPlayer.potions--;
    dPlayer.hp=Math.min(dPlayer.maxHp,dPlayer.hp+dPlayer.potionHeal);
    const dlog=document.getElementById('d-log');
    if(dlog)dlog.textContent=`🧪 Healed ${dPlayer.potionHeal} HP!`;
    renderDungeon();
}

// Keyboard for dungeon
document.addEventListener('keydown', e => {
    if(document.getElementById('dungeon-screen').style.display==='none')return;
    if(e.key==='w'||e.key==='W'||e.key==='ArrowUp')dungeonMove(0,-1);
    if(e.key==='s'||e.key==='S'||e.key==='ArrowDown')dungeonMove(0,1);
    if(e.key==='a'||e.key==='A'||e.key==='ArrowLeft')dungeonMove(-1,0);
    if(e.key==='d'||e.key==='D'||e.key==='ArrowRight')dungeonMove(1,0);
    if(e.key==='q'||e.key==='Q')show('title');
    if(e.key==='e'||e.key==='E')dungeonUsePotion();
});

// ===== UTIL =====
function rand(a,b){return Math.floor(Math.random()*(b-a+1))+a;}
function clamp(v,mn,mx){return Math.max(mn,Math.min(mx,v));}
