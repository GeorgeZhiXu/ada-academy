// ===== WARFRONT 3D — Hex Strategy =====
let scene, camera, renderer, raycaster, mouseVec;
let hexMeshes = []; // flat array of {mesh, r, c}
let unitMeshes = []; // {mesh, label, r, c, owner, type}
let highlightMeshes = [];

// === CONSTANTS ===
const HEX_R = 1;
const HEX_H = 0.3;
const COLS = 20, ROWS = 14;
const PLAYER = 0, ENEMY = 1, NEUTRAL = 2;
const OWNER_COLOR = { [PLAYER]: 0x3b82f6, [ENEMY]: 0xef4444, [NEUTRAL]: 0x444444 };
const UNIT_TYPES = {
    infantry: { name:'Infantry', hp:3, atk:2, range:1, move:2, cost:10, color:0x2563EB, height:0.4 },
    archer:   { name:'Archer',   hp:2, atk:3, range:3, move:2, cost:15, color:0x7C3AED, height:0.5 },
    cavalry:  { name:'Cavalry',  hp:4, atk:3, range:1, move:4, cost:25, color:0x0891B2, height:0.6 },
    cannon:   { name:'Cannon',   hp:2, atk:5, range:4, move:1, cost:35, color:0xD97706, height:0.35 },
    general:  { name:'General',  hp:6, atk:4, range:1, move:3, cost:0,  color:0xF59E0B, height:0.7 },
};
const TERRAIN = {
    plains:  { name:'Plains',   color:0x5a9a4a, height:0.15, moveCost:1, def:0 },
    forest:  { name:'Forest',   color:0x2a6a2a, height:0.35, moveCost:2, def:1 },
    mountain:{ name:'Mountain', color:0x7a7a7a, height:0.8,  moveCost:3, def:2 },
    water:   { name:'Water',    color:0x1a5a9a, height:0.05, moveCost:99,def:0 },
    city:    { name:'City',     color:0x9a8a5a, height:0.25, moveCost:1, def:2 },
    fort:    { name:'Fort',     color:0x8a6a4a, height:0.5,  moveCost:1, def:3 },
};

// === STATE ===
let G = { started:false, turn:PLAYER, turnNum:1, gold:[50,50], income:[10,5], difficulty:'normal' };
let grid = [];
let selected = null;
let validMoves = [];
let validAttacks = [];
let mode = null;
let recruitType = null;
let animating = false;
let chosenMap = 'continents';
let decorMeshes = [];
let combatParticles = [];
let shakeAmount = 0;
let audioCtx;

// Sound FX
function playSound(type) {
    try {
        if(!audioCtx) audioCtx = new (window.AudioContext||window.webkitAudioContext)();
        const osc=audioCtx.createOscillator(), gain=audioCtx.createGain();
        osc.connect(gain); gain.connect(audioCtx.destination);
        if(type==='hit') { osc.frequency.setValueAtTime(300,audioCtx.currentTime); osc.frequency.exponentialRampToValueAtTime(80,audioCtx.currentTime+.15); gain.gain.setValueAtTime(.2,audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+.2); osc.start(); osc.stop(audioCtx.currentTime+.2); }
        if(type==='kill') { osc.frequency.setValueAtTime(600,audioCtx.currentTime); osc.frequency.exponentialRampToValueAtTime(100,audioCtx.currentTime+.4); gain.gain.setValueAtTime(.25,audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+.4); osc.start(); osc.stop(audioCtx.currentTime+.4); }
        if(type==='recruit') { osc.type='triangle'; osc.frequency.setValueAtTime(400,audioCtx.currentTime); osc.frequency.exponentialRampToValueAtTime(800,audioCtx.currentTime+.15); gain.gain.setValueAtTime(.15,audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+.2); osc.start(); osc.stop(audioCtx.currentTime+.2); }
        if(type==='move') { osc.type='sine'; osc.frequency.setValueAtTime(200,audioCtx.currentTime); osc.frequency.exponentialRampToValueAtTime(300,audioCtx.currentTime+.1); gain.gain.setValueAtTime(.08,audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+.1); osc.start(); osc.stop(audioCtx.currentTime+.1); }
        if(type==='victory') { osc.type='triangle'; osc.frequency.setValueAtTime(400,audioCtx.currentTime); osc.frequency.setValueAtTime(500,audioCtx.currentTime+.1); osc.frequency.setValueAtTime(600,audioCtx.currentTime+.2); osc.frequency.setValueAtTime(800,audioCtx.currentTime+.3); gain.gain.setValueAtTime(.2,audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+.5); osc.start(); osc.stop(audioCtx.currentTime+.5); }
    } catch(e){}
}

function flashScreen(color) {
    const el=document.getElementById('screenflash');
    el.style.background=color; el.style.opacity='1';
    setTimeout(()=>{el.style.opacity='0';},100);
}

function screenShake(amount) { shakeAmount = amount; }

function spawnExplosion(worldX, worldZ, color, count) {
    for(let i=0;i<count;i++) {
        combatParticles.push({
            x:worldX, y:0.5+Math.random(), z:worldZ,
            vx:(Math.random()-.5)*3, vy:1+Math.random()*3, vz:(Math.random()-.5)*3,
            life:30+Math.random()*20, color, size: 0.05+Math.random()*0.1
        });
    }
}

function addKillFeed(text, color) {
    const el=document.getElementById('killfeed');
    const msg=document.createElement('div');
    msg.style.cssText=`background:rgba(0,0,0,.7);border-left:3px solid ${color};padding:4px 10px;border-radius:4px;font-size:11px;font-weight:600;color:${color};animation:logIn .3s`;
    msg.textContent=text;
    el.appendChild(msg);
    while(el.children.length>5) el.removeChild(el.firstChild);
    setTimeout(()=>{msg.style.opacity='0';msg.style.transition='opacity .5s';setTimeout(()=>msg.remove(),500);},4000);
}

// === HEX MATH ===
function hexToWorld(r, c) {
    const x = c * HEX_R * Math.sqrt(3) + (r % 2) * HEX_R * Math.sqrt(3) / 2;
    const z = r * HEX_R * 1.5;
    return { x, z };
}
function hexDist(r1,c1,r2,c2) {
    const ax=c1-(r1-(r1&1))/2, az=r1, ay=-ax-az;
    const bx=c2-(r2-(r2&1))/2, bz=r2, by=-bx-bz;
    return Math.max(Math.abs(ax-bx),Math.abs(ay-by),Math.abs(az-bz));
}
function hexNeighbors(r,c) {
    const d = r%2===0 ? [[-1,-1],[-1,0],[0,-1],[0,1],[1,-1],[1,0]] : [[-1,0],[-1,1],[0,-1],[0,1],[1,0],[1,1]];
    return d.map(([dr,dc])=>({r:r+dr,c:c+dc})).filter(h=>h.r>=0&&h.r<ROWS&&h.c>=0&&h.c<COLS);
}

// === CREATE HEX GEOMETRY ===
function createHexGeo(radius, height) {
    const shape = new THREE.Shape();
    for (let i = 0; i < 6; i++) {
        const angle = Math.PI / 3 * i - Math.PI / 6;
        const x = radius * Math.cos(angle), y = radius * Math.sin(angle);
        if (i === 0) shape.moveTo(x, y); else shape.lineTo(x, y);
    }
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, { depth: height, bevelEnabled: false });
}

// === INIT ===
function init3D() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);
    scene.fog = new THREE.FogExp2(0x1a1a2e, 0.02);

    // Camera — top-down angled
    camera = new THREE.PerspectiveCamera(50, innerWidth/innerHeight, 0.1, 200);
    camera.position.set(COLS*0.8, 25, ROWS*1.2);
    camera.lookAt(COLS*0.8, 0, ROWS*0.6);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    document.body.appendChild(renderer.domElement);

    // Replace canvas ref
    const oldCanvas = document.getElementById('game');
    if (oldCanvas) oldCanvas.remove();

    // Lights
    const ambient = new THREE.AmbientLight(0x404060, 0.6);
    scene.add(ambient);
    const sun = new THREE.DirectionalLight(0xffeedd, 1.2);
    sun.position.set(20, 30, 10);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    const sc = sun.shadow.camera;
    sc.left=-30;sc.right=30;sc.top=30;sc.bottom=-30;sc.near=1;sc.far=80;
    scene.add(sun);

    const hemi = new THREE.HemisphereLight(0x6688cc, 0x445522, 0.3);
    scene.add(hemi);

    raycaster = new THREE.Raycaster();
    mouseVec = new THREE.Vector2();

    // Input
    renderer.domElement.addEventListener('click', onClick3D);
    renderer.domElement.addEventListener('mousemove', onMove3D);
    renderer.domElement.addEventListener('contextmenu', e => e.preventDefault());

    // Camera controls — scroll to zoom, drag to pan
    let isDragging = false, dragPrev = {x:0,y:0};
    renderer.domElement.addEventListener('mousedown', e => { if(e.button===2||e.button===1){isDragging=true;dragPrev={x:e.clientX,y:e.clientY};} });
    renderer.domElement.addEventListener('mousemove', e => {
        if (!isDragging) return;
        const dx = e.clientX - dragPrev.x, dy = e.clientY - dragPrev.y;
        camera.position.x -= dx * 0.05;
        camera.position.z -= dy * 0.05;
        camera.lookAt(camera.position.x, 0, camera.position.z - 8);
        dragPrev = {x:e.clientX, y:e.clientY};
    });
    renderer.domElement.addEventListener('mouseup', () => isDragging = false);
    renderer.domElement.addEventListener('wheel', e => {
        camera.position.y = Math.max(8, Math.min(40, camera.position.y + e.deltaY * 0.02));
        camera.lookAt(camera.position.x, 0, camera.position.z - 8);
    });

    // Keyboard pan
    addEventListener('keydown', e => {
        const s = 0.5;
        if(e.code==='KeyW'||e.code==='ArrowUp'){camera.position.z-=s;camera.lookAt(camera.position.x,0,camera.position.z-8);}
        if(e.code==='KeyS'||e.code==='ArrowDown'){camera.position.z+=s;camera.lookAt(camera.position.x,0,camera.position.z-8);}
        if(e.code==='KeyA'||e.code==='ArrowLeft'){camera.position.x-=s;camera.lookAt(camera.position.x,0,camera.position.z-8);}
        if(e.code==='KeyD'||e.code==='ArrowRight'){camera.position.x+=s;camera.lookAt(camera.position.x,0,camera.position.z-8);}
        if(e.code==='Space'&&G.started&&G.turn===PLAYER&&!animating) endTurn();
        if(e.code==='Escape'){selected=null;mode=null;validMoves=[];validAttacks=[];clearHighlights();updateActions();}
    });

    addEventListener('resize', () => {
        camera.aspect = innerWidth / innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(innerWidth, innerHeight);
    });

    animate();
}

// === BUILD MAP ===
function genTerrain(r, c) {
    if (chosenMap === 'continents') {
        const n = Math.sin(r*0.7+c*0.4)*0.5 + Math.sin(r*0.25-c*0.6)*0.3 + Math.random()*0.15;
        const rd = Math.abs(c - COLS*0.65);
        if (rd < 1.5+Math.sin(r*0.3)) return 'water';
        if (n > 0.5) return 'mountain';
        if (n > 0.2) return 'forest';
        return 'plains';
    }
    if (chosenMap === 'islands') {
        const cx1=COLS*0.25,cy1=ROWS*0.35, cx2=COLS*0.7,cy2=ROWS*0.65;
        const d1=Math.sqrt((c-cx1)**2+(r-cy1)**2), d2=Math.sqrt((c-cx2)**2+(r-cy2)**2);
        const island = Math.min(d1,d2);
        if (island > 7+Math.sin(r+c)*1.5) return 'water';
        if (island > 5.5) return 'plains';
        const n=Math.sin(r*0.9+c*0.6)*0.5+Math.random()*0.2;
        if (n>0.4) return 'forest';
        if (n>0.2&&island<3) return 'mountain';
        return 'plains';
    }
    if (chosenMap === 'river') {
        const riverC = COLS/2 + Math.sin(r*0.5)*3;
        const rd = Math.abs(c-riverC);
        if (rd < 1.2) return 'water';
        if (rd < 2.5) return 'plains';
        const n=Math.sin(r*0.6+c*0.8)*0.5+Math.random()*0.2;
        if (n>0.4) return 'forest';
        if (n>0.2) return 'mountain';
        return 'plains';
    }
    if (chosenMap === 'fortress') {
        const cx=COLS/2,cy=ROWS/2, d=Math.sqrt((c-cx)**2+(r-cy)**2);
        if (d<2) return 'plains';
        if (d>8) { const n=Math.sin(r+c)*0.5+Math.random()*0.3; return n>0.3?'forest':'plains'; }
        if (Math.abs(d-5)<0.8&&(r+c)%3!==0) return 'mountain';
        return 'plains';
    }
    if (chosenMap === 'desert') {
        const n=Math.sin(r*0.5+c*0.3)*0.5+Math.sin(r*0.2-c*0.7)*0.3+Math.random()*0.15;
        if (c<2||c>COLS-3) return 'water';
        if (n>0.5) return 'mountain';
        if (n>0.1) return 'plains';
        return 'forest';
    }
    return 'plains';
}

function buildMap() {
    // Clear old
    hexMeshes.forEach(h => scene.remove(h.mesh));
    unitMeshes.forEach(u => { scene.remove(u.mesh); });
    decorMeshes.forEach(m => scene.remove(m));
    hexMeshes = []; unitMeshes = []; decorMeshes = [];

    // Gen grid
    grid = [];
    for (let r = 0; r < ROWS; r++) {
        grid[r] = [];
        for (let c = 0; c < COLS; c++) {
            grid[r][c] = { terrain: genTerrain(r,c), owner: NEUTRAL, unit: null };
        }
    }

    // Cities (spread based on map)
    const citySpots = [];
    for (let i=0;i<8;i++) {
        let cr,cc,tries=0;
        do { cr=Math.floor(Math.random()*ROWS); cc=Math.floor(Math.random()*COLS); tries++; }
        while (tries<50 && (grid[cr][cc].terrain==='water'||grid[cr][cc].terrain==='mountain'||citySpots.find(s=>hexDist(s[0],s[1],cr,cc)<3)));
        if(tries<50) { grid[cr][cc].terrain='city'; citySpots.push([cr,cc]); }
    }

    // Bases — player bottom-left, enemy top-right
    const pb = findSafeSpot(ROWS-3, 1);
    const eb = findSafeSpot(2, COLS-3);
    grid[pb.r][pb.c].terrain='fort'; grid[pb.r][pb.c].owner=PLAYER;
    hexNeighbors(pb.r,pb.c).slice(0,2).forEach(n=>{if(grid[n.r][n.c].terrain!=='water')grid[n.r][n.c].owner=PLAYER;});
    grid[eb.r][eb.c].terrain='fort'; grid[eb.r][eb.c].owner=ENEMY;
    hexNeighbors(eb.r,eb.c).slice(0,2).forEach(n=>{if(grid[n.r][n.c].terrain!=='water')grid[n.r][n.c].owner=ENEMY;});

    // Starting units
    addUnit(pb.r,pb.c,PLAYER,'general');
    hexNeighbors(pb.r,pb.c).filter(n=>grid[n.r][n.c].terrain!=='water'&&!grid[n.r][n.c].unit).slice(0,3).forEach((n,i)=>{
        addUnit(n.r,n.c,PLAYER,['infantry','infantry','archer'][i]);
    });
    addUnit(eb.r,eb.c,ENEMY,'general');
    hexNeighbors(eb.r,eb.c).filter(n=>grid[n.r][n.c].terrain!=='water'&&!grid[n.r][n.c].unit).slice(0,3).forEach((n,i)=>{
        addUnit(n.r,n.c,ENEMY,['infantry','infantry','archer'][i]);
    });
    if(G.difficulty==='hard') {
        const extras=hexNeighbors(eb.r,eb.c).filter(n=>grid[n.r][n.c].terrain!=='water'&&!grid[n.r][n.c].unit);
        if(extras[0]) addUnit(extras[0].r,extras[0].c,ENEMY,'cavalry');
        if(extras[1]) addUnit(extras[1].r,extras[1].c,ENEMY,'cannon');
        G.income[ENEMY]=8;
    }
    if(G.difficulty==='easy') G.income[ENEMY]=3;

    // Build 3D hexes + decorations
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
        const cell = grid[r][c];
        const t = TERRAIN[cell.terrain];
        const {x, z} = hexToWorld(r, c);
        const geo = createHexGeo(HEX_R * 0.95, t.height);
        geo.rotateX(-Math.PI / 2);
        // Desert map recolors plains to sand
        let hexColor = t.color;
        if (chosenMap === 'desert' && cell.terrain === 'plains') hexColor = 0xc4a44a + Math.floor(Math.random()*0x101010);
        if (chosenMap === 'desert' && cell.terrain === 'forest') hexColor = 0x6a8a3a;
        if (chosenMap === 'desert' && cell.terrain === 'mountain') hexColor = 0x9a7a5a;
        // Add subtle per-hex color variation
        const variation = Math.floor(Math.random()*0x0a0a0a);
        const mat = new THREE.MeshStandardMaterial({
            color: hexColor + variation,
            roughness: cell.terrain === 'water' ? 0.05 : 0.85,
            metalness: cell.terrain === 'water' ? 0.4 : 0,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(x, 0, z);
        mesh.receiveShadow = true;
        mesh.userData = { r, c };
        scene.add(mesh);
        hexMeshes.push({ mesh, r, c });

        // Terrain decorations
        if (cell.terrain === 'forest') {
            for (let i = 0; i < 2; i++) {
                const ox = (Math.random()-.5)*0.6, oz = (Math.random()-.5)*0.6;
                const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.04,0.06,0.35,5), new THREE.MeshStandardMaterial({color:0x4a2a10}));
                trunk.position.set(x+ox, t.height+0.17, z+oz); trunk.castShadow=true; scene.add(trunk); decorMeshes.push(trunk);
                const leaves = new THREE.Mesh(new THREE.ConeGeometry(0.22,0.4,5), new THREE.MeshStandardMaterial({color:0x1a6a1a+Math.floor(Math.random()*0x0a0a0a)}));
                leaves.position.set(x+ox, t.height+0.5, z+oz); leaves.castShadow=true; scene.add(leaves); decorMeshes.push(leaves);
            }
        }
        if (cell.terrain === 'mountain') {
            const peak = new THREE.Mesh(new THREE.ConeGeometry(0.4,0.6,5), new THREE.MeshStandardMaterial({color:0x8a8a8a,roughness:0.95}));
            peak.position.set(x, t.height+0.3, z); peak.castShadow=true; scene.add(peak); decorMeshes.push(peak);
            // Snow cap
            const snow = new THREE.Mesh(new THREE.ConeGeometry(0.15,0.15,5), new THREE.MeshStandardMaterial({color:0xeeeeee}));
            snow.position.set(x, t.height+0.7, z); scene.add(snow); decorMeshes.push(snow);
        }
        if (cell.terrain === 'city') {
            for (let i = 0; i < 3; i++) {
                const ox=(Math.random()-.5)*0.5, oz=(Math.random()-.5)*0.5;
                const bh=0.15+Math.random()*0.2;
                const bld = new THREE.Mesh(new THREE.BoxGeometry(0.18,bh,0.18), new THREE.MeshStandardMaterial({color:0xaa9966}));
                bld.position.set(x+ox, t.height+bh/2, z+oz); bld.castShadow=true; scene.add(bld); decorMeshes.push(bld);
            }
        }
        if (cell.terrain === 'fort') {
            // Tower
            const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.2,0.25,0.6,6), new THREE.MeshStandardMaterial({color:0x7a5a3a}));
            tower.position.set(x, t.height+0.3, z); tower.castShadow=true; scene.add(tower); decorMeshes.push(tower);
            // Battlement
            const top = new THREE.Mesh(new THREE.CylinderGeometry(0.28,0.28,0.08,6), new THREE.MeshStandardMaterial({color:0x6a4a2a}));
            top.position.set(x, t.height+0.62, z); scene.add(top); decorMeshes.push(top);
            // Flag
            const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.015,0.015,0.4,4), new THREE.MeshStandardMaterial({color:0xaaaaaa}));
            pole.position.set(x+0.2, t.height+0.8, z); scene.add(pole); decorMeshes.push(pole);
            const flag = new THREE.Mesh(new THREE.PlaneGeometry(0.2,0.1), new THREE.MeshBasicMaterial({color:cell.owner===PLAYER?0x3b82f6:cell.owner===ENEMY?0xef4444:0x888888,side:THREE.DoubleSide}));
            flag.position.set(x+0.3, t.height+0.9, z); scene.add(flag); decorMeshes.push(flag);
        }
        if (cell.terrain === 'water') {
            // Slight wave animation handled in animate
            mesh.userData.isWater = true;
        }
    }

    // Build 3D units
    rebuildUnits();
}

function findSafeSpot(targetR, targetC) {
    if(grid[targetR]&&grid[targetR][targetC]&&grid[targetR][targetC].terrain!=='water') return {r:targetR,c:targetC};
    for(let d=1;d<5;d++) for(let r=targetR-d;r<=targetR+d;r++) for(let c=targetC-d;c<=targetC+d;c++) {
        if(r>=0&&r<ROWS&&c>=0&&c<COLS&&grid[r][c].terrain!=='water') return {r,c};
    }
    return {r:targetR,c:targetC};
}

function addUnit(r, c, owner, type) {
    if (!grid[r]||!grid[r][c]||grid[r][c].terrain==='water') return;
    grid[r][c].unit = { type, owner, hp: UNIT_TYPES[type].hp, maxHp: UNIT_TYPES[type].hp, moved:false, attacked:false };
}

function rebuildUnits() {
    unitMeshes.forEach(u => { scene.remove(u.mesh); });
    unitMeshes = [];
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
        const cell = grid[r][c];
        if (!cell.unit) continue;
        const u = cell.unit;
        const ut = UNIT_TYPES[u.type];
        const {x, z} = hexToWorld(r, c);
        const th = TERRAIN[cell.terrain].height;

        // Unit mesh — cylinder body + colored top
        const group = new THREE.Group();
        const body = new THREE.Mesh(
            new THREE.CylinderGeometry(0.3, 0.35, ut.height, 8),
            new THREE.MeshStandardMaterial({ color: OWNER_COLOR[u.owner], roughness: 0.4, metalness: 0.2 })
        );
        body.position.y = ut.height / 2;
        body.castShadow = true;
        group.add(body);

        // Top piece — different shape per unit type
        let top;
        if (u.type === 'general') {
            top = new THREE.Mesh(new THREE.OctahedronGeometry(0.25), new THREE.MeshStandardMaterial({ color: 0xFFD700, emissive: 0xFFD700, emissiveIntensity: 0.3 }));
        } else if (u.type === 'cannon') {
            top = new THREE.Mesh(new THREE.SphereGeometry(0.2, 6, 6), new THREE.MeshStandardMaterial({ color: ut.color }));
        } else if (u.type === 'cavalry') {
            top = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.4, 4), new THREE.MeshStandardMaterial({ color: ut.color }));
        } else if (u.type === 'archer') {
            top = new THREE.Mesh(new THREE.TetrahedronGeometry(0.2), new THREE.MeshStandardMaterial({ color: ut.color }));
        } else {
            top = new THREE.Mesh(new THREE.SphereGeometry(0.18, 6, 6), new THREE.MeshStandardMaterial({ color: ut.color }));
        }
        top.position.y = ut.height + 0.15;
        top.castShadow = true;
        group.add(top);

        // HP indicator — ring
        const hpRing = new THREE.Mesh(
            new THREE.RingGeometry(0.35, 0.42, 16),
            new THREE.MeshBasicMaterial({ color: u.hp > ut.hp/2 ? 0x22c55e : u.hp > ut.hp/4 ? 0xf59e0b : 0xef4444, side: THREE.DoubleSide })
        );
        hpRing.rotation.x = -Math.PI/2;
        hpRing.position.y = 0.02;
        group.add(hpRing);

        // Ready indicator
        if (u.owner === PLAYER && !u.moved) {
            const ready = new THREE.Mesh(
                new THREE.SphereGeometry(0.08),
                new THREE.MeshBasicMaterial({ color: 0x22c55e, emissive: 0x22c55e })
            );
            ready.position.set(0.35, ut.height + 0.3, 0);
            group.add(ready);
        }

        group.position.set(x, th, z);
        group.userData = { r, c, isUnit: true };
        scene.add(group);
        unitMeshes.push({ mesh: group, r, c, owner: u.owner, type: u.type });
    }
}

// === HIGHLIGHTS ===
function clearHighlights() {
    highlightMeshes.forEach(m => scene.remove(m));
    highlightMeshes = [];
}

function showHighlights() {
    clearHighlights();
    const makeDisk = (r, c, color) => {
        const {x, z} = hexToWorld(r, c);
        const h = TERRAIN[grid[r][c].terrain].height;
        const geo = new THREE.RingGeometry(0.5, 0.85, 6);
        geo.rotateX(-Math.PI/2);
        const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.5, side: THREE.DoubleSide });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(x, h + 0.02, z);
        scene.add(mesh);
        highlightMeshes.push(mesh);
    };

    if (selected) {
        const {x,z} = hexToWorld(selected.r, selected.c);
        const selRing = new THREE.Mesh(
            new THREE.RingGeometry(0.7, 0.9, 6),
            new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.7, side: THREE.DoubleSide })
        );
        selRing.rotateX(-Math.PI/2);
        selRing.position.set(x, TERRAIN[grid[selected.r][selected.c].terrain].height+0.03, z);
        scene.add(selRing);
        highlightMeshes.push(selRing);
    }

    if (mode === 'move') validMoves.forEach(m => makeDisk(m.r, m.c, 0x22c55e));
    if (mode === 'attack') validAttacks.forEach(m => makeDisk(m.r, m.c, 0xef4444));
    if (mode === 'recruit') {
        for(let r=0;r<ROWS;r++) for(let c=0;c<COLS;c++) {
            if(grid[r][c].owner===PLAYER&&!grid[r][c].unit&&grid[r][c].terrain!=='water') makeDisk(r,c,0xf59e0b);
        }
    }
}

// === 3D INPUT ===
function onClick3D(e) {
    if (!G.started || G.turn !== PLAYER || animating) return;
    mouseVec.x = (e.clientX / innerWidth) * 2 - 1;
    mouseVec.y = -(e.clientY / innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouseVec, camera);

    // Check hex hits
    const allMeshes = hexMeshes.map(h => h.mesh).concat(unitMeshes.map(u => u.mesh));
    const hits = raycaster.intersectObjects(allMeshes, true);
    if (!hits.length) return;

    // Find which hex was clicked
    let hitObj = hits[0].object;
    while (hitObj.parent && !hitObj.userData.r && hitObj.userData.r !== 0) hitObj = hitObj.parent;
    if (hitObj.userData.r === undefined) return;
    const { r, c } = hitObj.userData;

    handleClick(r, c);
}

function onMove3D(e) {
    const tip = document.getElementById('tooltip');
    if (!G.started) { tip.style.display = 'none'; return; }
    mouseVec.x = (e.clientX / innerWidth) * 2 - 1;
    mouseVec.y = -(e.clientY / innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouseVec, camera);
    const hits = raycaster.intersectObjects(hexMeshes.map(h => h.mesh), true);
    if (!hits.length) { tip.style.display = 'none'; return; }
    let hitObj = hits[0].object;
    while (hitObj.parent && hitObj.userData.r === undefined) hitObj = hitObj.parent;
    if (hitObj.userData.r === undefined) { tip.style.display = 'none'; return; }
    const { r, c } = hitObj.userData;
    const cell = grid[r][c];
    const t = TERRAIN[cell.terrain];
    let text = `${t.name} (Def +${t.def})`;
    if (cell.unit) { const ut = UNIT_TYPES[cell.unit.type]; text += ` | ${ut.name} HP:${cell.unit.hp}/${cell.unit.maxHp} ATK:${ut.atk}`; }
    if (cell.owner === PLAYER) text += ' | Your territory';
    else if (cell.owner === ENEMY) text += ' | Enemy territory';
    tip.style.display = 'block';
    tip.style.left = (e.clientX + 14) + 'px';
    tip.style.top = (e.clientY - 8) + 'px';
    tip.textContent = text;
}

// === CLICK LOGIC (same as 2D) ===
function handleClick(r, c) {
    const cell = grid[r][c];

    if (mode === 'recruit' && recruitType) {
        const cost = UNIT_TYPES[recruitType].cost;
        if (cell.owner === PLAYER && !cell.unit && cell.terrain !== 'water' && G.gold[PLAYER] >= cost) {
            G.gold[PLAYER] -= cost;
            addUnit(r, c, PLAYER, recruitType);
            log(`Recruited ${UNIT_TYPES[recruitType].name}!`, 'good');
            playSound('recruit');
            const {x:rx,z:rz}=hexToWorld(r,c); spawnExplosion(rx,rz,0x3b82f6,10);
            addKillFeed(`🛡️ ${UNIT_TYPES[recruitType].name} recruited`, '#3b82f6');
            mode = null; recruitType = null;
            rebuildUnits(); clearHighlights(); updateActions(); updateHUD();
            return;
        }
    }

    if (mode === 'move' && selected && validMoves.find(m => m.r===r && m.c===c)) {
        const u = grid[selected.r][selected.c].unit;
        grid[r][c].unit = u; grid[selected.r][selected.c].unit = null;
        u.moved = true;
        playSound('move');
        if (cell.owner !== PLAYER) { cell.owner = PLAYER; log('Captured territory!', 'good'); flashScreen('rgba(59,130,246,.1)'); }
        selected = {r, c}; mode = null; validMoves = [];
        calcAttacks(r, c, u);
        rebuildUnits(); showHighlights(); updateActions(); updateHUD();
        return;
    }

    if (mode === 'attack' && selected && validAttacks.find(m => m.r===r && m.c===c)) {
        if (cell.unit && cell.unit.owner === ENEMY) {
            doBattle(selected.r, selected.c, r, c);
            return;
        }
    }

    if (cell.unit && cell.unit.owner === PLAYER) {
        selected = {r, c}; mode = null; validMoves = []; validAttacks = [];
        if (!cell.unit.moved) calcMoves(r, c, cell.unit);
        if (!cell.unit.attacked) calcAttacks(r, c, cell.unit);
        showHighlights(); updateActions();
        return;
    }

    selected = null; mode = null; validMoves = []; validAttacks = [];
    clearHighlights(); updateActions();
}

function calcMoves(r, c, unit) {
    validMoves = [];
    const type = UNIT_TYPES[unit.type];
    const visited = new Set(); const queue = [{r, c, cost: 0}]; visited.add(`${r},${c}`);
    while (queue.length) {
        const cur = queue.shift();
        if (cur.cost > 0) validMoves.push({r: cur.r, c: cur.c});
        if (cur.cost >= type.move) continue;
        hexNeighbors(cur.r, cur.c).forEach(n => {
            const key = `${n.r},${n.c}`;
            if (visited.has(key)) return;
            const cell = grid[n.r][n.c];
            if (TERRAIN[cell.terrain].moveCost >= 99 || cell.unit) return;
            visited.add(key);
            queue.push({r: n.r, c: n.c, cost: cur.cost + TERRAIN[cell.terrain].moveCost});
        });
    }
}

function calcAttacks(r, c, unit) {
    validAttacks = [];
    const range = UNIT_TYPES[unit.type].range;
    for (let dr = 0; dr < ROWS; dr++) for (let dc = 0; dc < COLS; dc++) {
        if (hexDist(r, c, dr, dc) <= range && hexDist(r, c, dr, dc) > 0 && grid[dr][dc].unit && grid[dr][dc].unit.owner === ENEMY)
            validAttacks.push({r: dr, c: dc});
    }
}

function doBattle(ar, ac, dr, dc) {
    animating = true;
    const attacker = grid[ar][ac].unit, defender = grid[dr][dc].unit;
    const atkT = UNIT_TYPES[attacker.type], defT = UNIT_TYPES[defender.type];
    const dmg = Math.max(1, atkT.atk - TERRAIN[grid[dr][dc].terrain].def);
    const counter = hexDist(ar, ac, dr, dc) <= defT.range ? Math.max(1, defT.atk - TERRAIN[grid[ar][ac].terrain].def) : 0;

    const {x:dx2,z:dz2} = hexToWorld(dr,dc);
    const {x:ax2,z:az2} = hexToWorld(ar,ac);
    playSound('hit');
    spawnExplosion(dx2, dz2, 0xff4444, 15);
    screenShake(0.8);
    flashScreen('rgba(239,68,68,.15)');

    setTimeout(() => {
        defender.hp -= dmg;
        addKillFeed(`${atkT.name} → ${defT.name} (-${dmg} HP)`, '#f59e0b');
        log(`${atkT.name} hits ${defT.name} for ${dmg}!`, 'info');
        if (defender.hp <= 0) {
            grid[dr][dc].unit = null;
            playSound('kill');
            spawnExplosion(dx2, dz2, 0xffaa00, 25);
            screenShake(1.2);
            flashScreen('rgba(239,68,68,.25)');
            addKillFeed(`💀 ${defT.name} DESTROYED`, '#ef4444');
            log(`${defT.name} destroyed!`, 'good');
        } else if (counter > 0) {
            attacker.hp -= counter;
            spawnExplosion(ax2, az2, 0x4488ff, 10);
            addKillFeed(`${defT.name} counters (-${counter} HP)`, '#3b82f6');
            log(`${defT.name} counters for ${counter}!`, 'bad');
            if (attacker.hp <= 0) {
                grid[ar][ac].unit = null;
                playSound('kill');
                spawnExplosion(ax2, az2, 0xffaa00, 25);
                addKillFeed(`💀 ${atkT.name} DESTROYED`, '#ef4444');
                log(`${atkT.name} destroyed!`, 'bad');
            }
        }
        if (attacker.hp > 0) { attacker.attacked = true; attacker.moved = true; }
        selected = null; mode = null; validMoves = []; validAttacks = [];
        animating = false;
        rebuildUnits(); clearHighlights(); updateActions(); updateHUD(); checkWin();
    }, 400);
}

// === TURNS ===
function endTurn() {
    forEachUnit(PLAYER, u => { u.moved = false; u.attacked = false; });
    G.turn = ENEMY;
    showBanner("Enemy Turn");
    selected = null; mode = null; validMoves = []; validAttacks = [];
    clearHighlights(); updateActions();
    setTimeout(doEnemyTurn, 800);
}

function doEnemyTurn() {
    let cities = 0;
    for (let r=0;r<ROWS;r++) for (let c=0;c<COLS;c++) if (grid[r][c].owner===ENEMY && (grid[r][c].terrain==='city'||grid[r][c].terrain==='fort')) cities++;
    G.gold[ENEMY] += G.income[ENEMY] + cities * 3;

    const units = [];
    for (let r=0;r<ROWS;r++) for (let c=0;c<COLS;c++) { const u=grid[r][c].unit; if (u&&u.owner===ENEMY) units.push({r,c,unit:u}); }

    let delay = 0;
    units.forEach(({r,c,unit}) => {
        setTimeout(() => {
            if (!unit || unit.hp <= 0) return;
            let bestT = null, bestD = Infinity;
            for (let dr=0;dr<ROWS;dr++) for (let dc=0;dc<COLS;dc++) {
                const t = grid[dr][dc].unit;
                if (t && t.owner === PLAYER && hexDist(r,c,dr,dc) < bestD) { bestD = hexDist(r,c,dr,dc); bestT = {r:dr,c:dc}; }
            }
            if (!bestT) return;
            if (bestD <= UNIT_TYPES[unit.type].range) {
                const def = grid[bestT.r][bestT.c].unit;
                const dmg = Math.max(1, UNIT_TYPES[unit.type].atk - TERRAIN[grid[bestT.r][bestT.c].terrain].def);
                def.hp -= dmg; log(`Enemy ${UNIT_TYPES[unit.type].name} attacks for ${dmg}!`, 'bad');
                if (def.hp <= 0) { grid[bestT.r][bestT.c].unit = null; log(`Your ${UNIT_TYPES[def.type].name} destroyed!`, 'bad'); }
                return;
            }
            calcMoves(r, c, unit);
            if (!validMoves.length) return;
            let best = validMoves[0], bd = Infinity;
            validMoves.forEach(m => { const d = hexDist(m.r,m.c,bestT.r,bestT.c); if (d < bd) { bd = d; best = m; } });
            grid[best.r][best.c].unit = unit; grid[r][c].unit = null;
            if (grid[best.r][best.c].owner !== ENEMY) grid[best.r][best.c].owner = ENEMY;
            validMoves = [];
        }, delay);
        delay += 250;
    });

    setTimeout(() => {
        if (G.gold[ENEMY] >= 10) {
            for (let r=0;r<ROWS;r++) for (let c=0;c<COLS;c++) {
                if (grid[r][c].owner===ENEMY && !grid[r][c].unit && grid[r][c].terrain!=='water') {
                    const type = G.gold[ENEMY]>=25&&Math.random()<.3?'cavalry':G.gold[ENEMY]>=15&&Math.random()<.4?'archer':'infantry';
                    if (G.gold[ENEMY]>=UNIT_TYPES[type].cost) {
                        addUnit(r,c,ENEMY,type); G.gold[ENEMY]-=UNIT_TYPES[type].cost;
                        log(`Enemy recruited ${UNIT_TYPES[type].name}`, 'bad'); return;
                    }
                }
            }
        }
    }, delay + 200);

    setTimeout(() => {
        forEachUnit(ENEMY, u => { u.moved = false; u.attacked = false; });
        G.turn = PLAYER; G.turnNum++;
        let pCities = 0;
        for (let r=0;r<ROWS;r++) for (let c=0;c<COLS;c++) if (grid[r][c].owner===PLAYER && (grid[r][c].terrain==='city'||grid[r][c].terrain==='fort')) pCities++;
        G.gold[PLAYER] += G.income[PLAYER] + pCities * 3;
        rebuildUnits(); showBanner(`Turn ${G.turnNum}`); updateHUD(); updateActions(); checkWin();
    }, delay + 500);
}

function forEachUnit(owner, fn) { for(let r=0;r<ROWS;r++) for(let c=0;c<COLS;c++) { const u=grid[r][c].unit; if(u&&u.owner===owner) fn(u); } }

function checkWin() {
    let pGen=false,eGen=false,pU=0,eU=0;
    for(let r=0;r<ROWS;r++) for(let c=0;c<COLS;c++) { const u=grid[r][c].unit; if(!u)continue; if(u.owner===PLAYER){pU++;if(u.type==='general')pGen=true;} if(u.owner===ENEMY){eU++;if(u.type==='general')eGen=true;} }
    if(!eGen||eU===0){G.started=false;showBanner('🏆 VICTORY!');log('You won!','good');playSound('victory');flashScreen('rgba(34,197,94,.3)');
        for(let i=0;i<5;i++) setTimeout(()=>{spawnExplosion(Math.random()*COLS*1.7,Math.random()*ROWS*1.5,0xffd700,20);},i*300);
    }
    if(!pGen||pU===0){G.started=false;showBanner('💀 DEFEAT');log('Defeated.','bad');flashScreen('rgba(239,68,68,.4)');screenShake(2);}
}

function showBanner(t){const el=document.getElementById('turnbanner');el.textContent=t;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),1500);}

// === UI ===
function updateHUD() {
    let pT=0,eT=0,pU=0,eU=0;
    for(let r=0;r<ROWS;r++) for(let c=0;c<COLS;c++){if(grid[r][c].owner===PLAYER)pT++;if(grid[r][c].owner===ENEMY)eT++;const u=grid[r][c].unit;if(u){if(u.owner===PLAYER)pU++;if(u.owner===ENEMY)eU++;}}
    document.getElementById('hud').innerHTML=`
        <div class="hb"><b class="gold">💰${G.gold[PLAYER]}</b></div>
        <div class="hb"><b class="blue">🏳️${pT}</b></div>
        <div class="hb"><b class="blue">⚔️${pU}</b></div>
        <div class="hb"><b>Turn ${G.turnNum}</b></div>
        <div class="hb"><b class="red">👹${eU}</b></div>
        <div class="hb"><b class="red">🏴${eT}</b></div>`;
}

function updateActions() {
    const sel = selected ? grid[selected.r][selected.c] : null;
    const unit = sel?.unit;
    let html = '';
    if (unit && unit.owner === PLAYER) {
        if (!unit.moved) html += `<button class="act-btn ${mode==='move'?'active':''}" onclick="window.setMode('move')">🚶 Move</button>`;
        if (!unit.attacked && validAttacks.length) html += `<button class="act-btn ${mode==='attack'?'active':''}" onclick="window.setMode('attack')">⚔️ Attack</button>`;
    }
    Object.entries(UNIT_TYPES).forEach(([id, t]) => {
        if (id === 'general') return;
        html += `<button class="act-btn" onclick="window.startRecruit('${id}')" style="opacity:${G.gold[PLAYER]>=t.cost?1:.4}">${t.name} <span class="cost">💰${t.cost}</span></button>`;
    });
    html += `<button class="act-btn" onclick="window.endTurn()">⏭️ End Turn</button>`;
    document.getElementById('actions').innerHTML = html;

    const si = document.getElementById('selinfo');
    if (unit) {
        const t = UNIT_TYPES[unit.type];
        si.style.display = 'block';
        si.innerHTML = `<h4>${t.name}</h4><div>HP: ${unit.hp}/${unit.maxHp}</div><div>ATK: ${t.atk} | Range: ${t.range} | Move: ${t.move}</div>`;
    } else si.style.display = 'none';
}

window.setMode = function(m) { mode = m; showHighlights(); updateActions(); };
window.startRecruit = function(t) { mode = 'recruit'; recruitType = t; showHighlights(); log(`Click your territory to place ${UNIT_TYPES[t].name}`, 'info'); };
window.endTurn = endTurn;

function log(t, type) {
    const el = document.getElementById('log'), m = document.createElement('div');
    m.className = `log-msg ${type||''}`; m.textContent = t;
    el.appendChild(m); while (el.children.length > 8) el.removeChild(el.firstChild);
    setTimeout(() => { m.style.opacity = '0'; m.style.transition = 'opacity .5s'; setTimeout(() => m.remove(), 500); }, 5000);
}

// === ANIMATE ===
function animate() {
    requestAnimationFrame(animate);
    const time = Date.now() * 0.001;
    // Rotate unit top pieces
    unitMeshes.forEach(u => {
        if (u.mesh.children[1]) u.mesh.children[1].rotation.y += 0.01;
        // Gentle bob
        u.mesh.position.y = u.mesh.position.y + Math.sin(time*2 + u.r + u.c) * 0.0005;
    });
    // Animate water hexes
    hexMeshes.forEach(h => {
        if (h.mesh.userData.isWater) {
            h.mesh.position.y = Math.sin(time * 1.5 + h.r + h.c * 0.7) * 0.04;
            h.mesh.material.color.setHSL(0.58, 0.6, 0.25 + Math.sin(time + h.c) * 0.03);
        }
    });

    // Combat particles
    combatParticles = combatParticles.filter(p => p.life > 0);
    combatParticles.forEach(p => {
        if (!p.mesh) {
            p.mesh = new THREE.Mesh(
                new THREE.SphereGeometry(p.size, 4, 4),
                new THREE.MeshBasicMaterial({ color: p.color })
            );
            scene.add(p.mesh);
        }
        p.x += p.vx * 0.016; p.y += p.vy * 0.016; p.z += p.vz * 0.016;
        p.vy -= 5 * 0.016; // gravity
        p.life--;
        p.mesh.position.set(p.x, Math.max(0, p.y), p.z);
        p.mesh.material.opacity = p.life / 50;
        p.mesh.scale.setScalar(p.life / 50);
        if (p.life <= 0) { scene.remove(p.mesh); }
    });

    // Screen shake
    if (shakeAmount > 0) {
        shakeAmount *= 0.9;
        camera.position.x += (Math.random()-.5) * shakeAmount * 0.3;
        camera.position.z += (Math.random()-.5) * shakeAmount * 0.3;
        if (shakeAmount < 0.01) shakeAmount = 0;
    }

    renderer.render(scene, camera);
}

// === START ===
window.startGame = function(diff) {
    G = { started: true, turn: PLAYER, turnNum: 1, gold: [50, 50], income: [10, 5], difficulty: diff };
    if (!renderer) init3D();
    buildMap();
    // Adjust scene bg per map
    const bgColors = {continents:0x1a1a2e, islands:0x0a1a3a, river:0x1a2a1a, fortress:0x1a1a1a, desert:0x2a1a0a};
    scene.background = new THREE.Color(bgColors[chosenMap]||0x1a1a2e);
    scene.fog = new THREE.FogExp2(bgColors[chosenMap]||0x1a1a2e, 0.02);
    document.getElementById('title').classList.add('hidden');
    updateHUD(); updateActions();
    showBanner('Turn 1 — Deploy your forces!');
    log('Click units to select. Move, attack, recruit.', 'info');
    log('Capture cities for +3 gold/turn. Kill the enemy General to win.', 'info');
};

window.pickMap = function(m) {
    chosenMap = m;
    document.querySelectorAll('#map-picks button').forEach(b => b.style.borderColor = 'rgba(255,255,255,.15)');
    document.getElementById('map-' + m).style.borderColor = 'rgba(239,68,68,.6)';
};

init3D();
