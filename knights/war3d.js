// ===== WAR OF THE KNIGHTS — 3D Web Battle =====
let scene, camera, renderer, clock;
let player = { x:-35, z:0, y:1.5, yaw:0, pitch:0, hp:100, maxHp:100, kills:0, speed:10, sprintSpeed:18, atkCd:0, blocking:false };
let enemies = [], allies = [], trees = [], allMeshes = [];
let wave = 1, gameOver = false, started = false;
let keys = {}, mouseLocked = false;
let handGroup, swordSwing = 0;
let camShake = 0;

// Init
function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x6BAADB);
    scene.fog = new THREE.FogExp2(0x6BAADB, 0.006);

    camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 500);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    document.body.appendChild(renderer.domElement);
    clock = new THREE.Clock();

    // Lights
    const sun = new THREE.DirectionalLight(0xffeedd, 1.5);
    sun.position.set(30, 50, 20);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    const sc = sun.shadow.camera;
    sc.left=-60;sc.right=60;sc.top=60;sc.bottom=-60;
    scene.add(sun);
    scene.add(new THREE.AmbientLight(0x556677, 0.5));
    scene.add(new THREE.HemisphereLight(0x87CEEB, 0x3a5a1e, 0.3));

    // Ground
    const gnd = new THREE.Mesh(
        new THREE.PlaneGeometry(200, 200, 30, 30),
        new THREE.MeshStandardMaterial({ color: 0x3a7a2e, roughness: 0.92 })
    );
    gnd.rotation.x = -Math.PI/2;
    gnd.receiveShadow = true;
    scene.add(gnd);

    // Castle walls
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x6a5a4a, roughness: 0.9 });
    [[0,2.5,-18, 30,5,1.2],[0,2.5,18, 30,5,1.2],[-15,2.5,0, 1.2,5,36],[15,2.5,0, 1.2,5,36]].forEach(([x,y,z,sx,sy,sz]) => {
        const w = new THREE.Mesh(new THREE.BoxGeometry(sx,sy,sz), wallMat);
        w.position.set(x,y,z); w.castShadow=true; w.receiveShadow=true; scene.add(w);
    });

    // Towers
    const tMat = new THREE.MeshStandardMaterial({ color: 0x5a4a3a, roughness: 0.88 });
    [[-15,-18],[15,-18],[-15,18],[15,18]].forEach(([x,z]) => {
        const t = new THREE.Mesh(new THREE.CylinderGeometry(2,2.3,8,8), tMat);
        t.position.set(x,4,z); t.castShadow=true; scene.add(t);
        const top = new THREE.Mesh(new THREE.CylinderGeometry(2.5,2.5,0.5,8), tMat);
        top.position.set(x,8.3,z); scene.add(top);
    });

    // Keep
    const keep = new THREE.Mesh(new THREE.BoxGeometry(6,7,6), new THREE.MeshStandardMaterial({ color: 0x5a4a3a }));
    keep.position.set(0,3.5,0); keep.castShadow=true; scene.add(keep);

    // Trees
    for (let i=0;i<70;i++) {
        const x=(Math.random()-.5)*180, z=(Math.random()-.5)*180;
        if(Math.abs(x)<20&&Math.abs(z)<22) continue;
        const s=0.6+Math.random()*0.7;
        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.15*s,0.25*s,3*s,6), new THREE.MeshStandardMaterial({color:0x5c3a1e}));
        trunk.position.set(x,1.5*s,z); trunk.castShadow=true; scene.add(trunk);
        const leafMat = new THREE.MeshStandardMaterial({color:0x1a5a1a+Math.floor(Math.random()*0x0a0a0a)});
        if(Math.random()<.5){
            for(let j=0;j<3;j++){const c=new THREE.Mesh(new THREE.CylinderGeometry(0.05*s,(1.8-j*.4)*s,(2-j*.3)*s,6),leafMat);c.position.set(x,(3.5+j*1.2)*s,z);c.castShadow=true;scene.add(c);}
        } else {
            const l=new THREE.Mesh(new THREE.SphereGeometry(1.8*s,7,5),leafMat);l.position.set(x,4*s,z);l.scale.y=0.7;l.castShadow=true;scene.add(l);
        }
    }

    // Rocks
    for(let i=0;i<15;i++){
        const x=(Math.random()-.5)*160,z=(Math.random()-.5)*160;
        if(Math.abs(x)<20&&Math.abs(z)<22)continue;
        const r=new THREE.Mesh(new THREE.DodecahedronGeometry(0.5+Math.random()*1,0),new THREE.MeshStandardMaterial({color:0x7a7a72,roughness:.95}));
        r.position.set(x,0.3,z);r.scale.y=0.5;r.castShadow=true;scene.add(r);
    }

    // Campfires
    [[-40,0],[40,0]].forEach(([x,z])=>{
        const light=new THREE.PointLight(0xff6622,2,12);light.position.set(x,1.5,z);scene.add(light);
        const glow=new THREE.Mesh(new THREE.SphereGeometry(0.3),new THREE.MeshBasicMaterial({color:0xff8833}));glow.position.set(x,0.5,z);scene.add(glow);
    });

    // Flags
    [[-45,0x3b82f6],[45,0xef4444]].forEach(([x,col])=>{
        const pole=new THREE.Mesh(new THREE.CylinderGeometry(0.04,0.05,5),new THREE.MeshStandardMaterial({color:0x8a7a6a}));pole.position.set(x,2.5,0);scene.add(pole);
        const flag=new THREE.Mesh(new THREE.BoxGeometry(1.2,0.7,0.02),new THREE.MeshBasicMaterial({color:col}));flag.position.set(x+0.6,4.5,0);scene.add(flag);
    });

    // First person hands + sword
    handGroup = new THREE.Group();
    const handMat = new THREE.MeshStandardMaterial({color:0xDEB887,roughness:.6});
    const armMat = new THREE.MeshStandardMaterial({color:0x2a4a2a,roughness:.8});
    const rArm = new THREE.Mesh(new THREE.CylinderGeometry(.05,.06,.45,6),armMat);
    rArm.position.set(.32,-.22,-.35);rArm.rotation.x=-.3;handGroup.add(rArm);
    const rHand = new THREE.Mesh(new THREE.BoxGeometry(.1,.05,.12),handMat);
    rHand.position.set(.32,-.32,-.5);handGroup.add(rHand);
    // Sword blade
    const blade = new THREE.Mesh(new THREE.BoxGeometry(.04,.8,.04),new THREE.MeshStandardMaterial({color:0xbbbbcc,metalness:.9,roughness:.1}));
    blade.position.set(.32,.05,-.65);handGroup.add(blade);
    // Guard
    const guard = new THREE.Mesh(new THREE.BoxGeometry(.18,.03,.04),new THREE.MeshStandardMaterial({color:0xccaa44,metalness:.7}));
    guard.position.set(.32,-.32,-.55);handGroup.add(guard);
    camera.add(handGroup);
    scene.add(camera);

    // Input
    renderer.domElement.addEventListener('click', ()=>{ if(started&&!mouseLocked) renderer.domElement.requestPointerLock(); });
    document.addEventListener('pointerlockchange', ()=>{ mouseLocked=!!document.pointerLockElement; document.getElementById('crosshair').style.display=mouseLocked?'block':'none'; });
    addEventListener('mousemove', e=>{ if(mouseLocked){player.yaw-=e.movementX*.002;player.pitch=Math.max(-1.2,Math.min(1.2,player.pitch-e.movementY*.002));} });
    addEventListener('keydown', e=>keys[e.code]=true);
    addEventListener('keyup', e=>keys[e.code]=false);
    addEventListener('mousedown', e=>{ if(e.button===0)keys.attack=true; if(e.button===2)keys.block=true; });
    addEventListener('mouseup', e=>{ if(e.button===0)keys.attack=false; if(e.button===2)keys.block=false; });
    renderer.domElement.addEventListener('contextmenu', e=>e.preventDefault());
    addEventListener('resize', ()=>{ camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight); });

    animate();
}

// Spawn
function spawnWave() {
    const eCnt = 5 + wave * 3;
    const aCnt = 3 + wave;
    for(let i=0;i<eCnt;i++) spawnSoldier(1, rng(30,60), rng(-30,30));
    for(let i=0;i<aCnt;i++) spawnSoldier(0, rng(-60,-30), rng(-25,25));
}

function spawnSoldier(team, x, z) {
    const col = team===0 ? 0x3b82f6 : 0xef4444;
    const g = new THREE.Group();
    const body = new THREE.Mesh(new THREE.CylinderGeometry(.22,.28,.9,7),new THREE.MeshStandardMaterial({color:col}));
    body.position.y=.55;body.castShadow=true;g.add(body);
    const head = new THREE.Mesh(new THREE.SphereGeometry(.18,6,6),new THREE.MeshStandardMaterial({color:0xDEB887}));
    head.position.y=1.15;g.add(head);
    const helm = new THREE.Mesh(new THREE.SphereGeometry(.2,6,4),new THREE.MeshStandardMaterial({color:0x888890,metalness:.6}));
    helm.position.y=1.25;helm.scale.y=.5;g.add(helm);
    const sw = new THREE.Mesh(new THREE.BoxGeometry(.04,.55,.04),new THREE.MeshStandardMaterial({color:0xaaaabb,metalness:.8}));
    sw.position.set(.3,.7,-.1);g.add(sw); g.userData.sword=sw;
    if(Math.random()<.5){
        const sh = new THREE.Mesh(new THREE.BoxGeometry(.4,.5,.05),new THREE.MeshStandardMaterial({color:team===0?0x1a3a7a:0x7a1a1a}));
        sh.position.set(-.3,.7,-.1);g.add(sh);
    }
    g.position.set(x,0,z);
    const hp = 40 + wave*8 + rng(0,20);
    const s = {mesh:g, team, hp, maxHp:hp, atk:6+wave*2+rng(0,3), speed:2.5+Math.random(), atkCd:0, dead:false, tx:x, tz:z, wt:0};
    scene.add(g);
    if(team===0) allies.push(s); else enemies.push(s);
}

// Game loop
function animate() {
    requestAnimationFrame(animate);
    if(!started||gameOver){renderer.render(scene,camera);return;}
    const dt=Math.min(clock.getDelta(),.05);

    // Player movement
    const fwd=new THREE.Vector3(-Math.sin(player.yaw),0,-Math.cos(player.yaw));
    const right=new THREE.Vector3(Math.cos(player.yaw),0,-Math.sin(player.yaw));
    const move=new THREE.Vector3();
    if(keys.KeyW)move.add(fwd);if(keys.KeyS)move.sub(fwd);if(keys.KeyA)move.sub(right);if(keys.KeyD)move.add(right);
    const spd=keys.Space?player.sprintSpeed:player.speed;
    if(move.length()>0)move.normalize();
    player.x=Math.max(-95,Math.min(95,player.x+move.x*spd*dt));
    player.z=Math.max(-95,Math.min(95,player.z+move.z*spd*dt));

    camera.position.set(player.x,player.y,player.z);
    camera.rotation.order='YXZ';camera.rotation.y=player.yaw;camera.rotation.x=player.pitch;

    // Block
    player.blocking=!!keys.block;
    if(player.blocking){handGroup.position.set(.1,0,.2);handGroup.rotation.z=.7;}
    else if(swordSwing<=0){handGroup.position.lerp(new THREE.Vector3(0,0,0),dt*8);handGroup.rotation.z*=.9;}

    // Attack
    player.atkCd=Math.max(0,player.atkCd-dt);
    if(keys.attack&&player.atkCd<=0&&!player.blocking){
        player.atkCd=.4;swordSwing=1;keys.attack=false;
        handGroup.rotation.x=-1;handGroup.position.set(.1,.1,.3);
        enemies.forEach(e=>{
            if(e.dead)return;
            const dx=e.mesh.position.x-player.x,dz=e.mesh.position.z-player.z;
            const dist=Math.sqrt(dx*dx+dz*dz);
            if(dist<3.5){
                const dot=(-Math.sin(player.yaw)*dx-Math.cos(player.yaw)*dz)/dist;
                if(dot>.3){
                    let dmg=18+rng(-3,5);
                    if(Math.random()<.15){dmg*=2;kfeed('💥 CRIT!');}
                    e.hp-=dmg;camShake=.3;flash('rgba(255,200,50,.1)');
                    if(e.hp<=0)killEnemy(e);
                }
            }
        });
    }
    if(swordSwing>0){swordSwing-=dt*4;handGroup.rotation.x=-swordSwing*1.2;}

    // Soldiers AI
    updateSoldiers(enemies, allies, dt);
    updateSoldiers(allies, enemies, dt);

    // Check player death
    if(player.hp<=0&&!gameOver){
        gameOver=true;
        banner(`DEFEATED — Wave ${wave} | ${player.kills} Kills`);
        document.exitPointerLock();
        flash('rgba(200,0,0,.3)');
        // Show restart after delay
        setTimeout(()=>{
            document.getElementById('title').classList.remove('hidden');
            document.getElementById('title').querySelector('button').textContent='RETRY';
        }, 2000);
    }

    // Check wave clear
    const aliveEnemies = enemies.filter(e=>!e.dead).length;
    if(aliveEnemies===0 && !gameOver && started){
        // Clean up dead from arrays
        enemies = enemies.filter(e=>!e.dead);
        allies = allies.filter(a=>!a.dead);
        wave++;
        banner('WAVE '+wave);
        player.hp=Math.min(player.maxHp,player.hp+25);
        // Heal surviving allies
        allies.forEach(a=>{ a.hp=Math.min(a.maxHp, a.hp+15); });
        setTimeout(spawnWave, 2000);
    }

    // Camera shake
    if(camShake>0){camShake*=.9;camera.position.x+=(.5-Math.random())*camShake;camera.position.z+=(.5-Math.random())*camShake;}

    updateHUD();
    renderer.render(scene,camera);
}

function updateSoldiers(team, opponents, dt) {
    team.forEach(s=>{
        if(s.dead)return;
        s.atkCd=Math.max(0,s.atkCd-dt);
        // Find target
        let target=null,bestD=20;
        opponents.forEach(o=>{
            if(o.dead)return;
            const d=dist3(s.mesh.position,o.mesh.position);
            if(d<bestD){bestD=d;target=o;}
        });
        // Enemy also targets player
        if(s.team===1){
            const dp=Math.sqrt((s.mesh.position.x-player.x)**2+(s.mesh.position.z-player.z)**2);
            if(dp<bestD){bestD=dp;target='player';}
        }
        const tp=target==='player'?{x:player.x,z:player.z}:target?{x:target.mesh.position.x,z:target.mesh.position.z}:null;
        if(tp&&bestD<2.5&&s.atkCd<=0){
            s.atkCd=.8+Math.random()*.4;
            if(target==='player'){
                let dmg=s.atk;
                if(player.blocking)dmg=Math.max(1,Math.floor(dmg/3));
                player.hp-=dmg;flash('rgba(200,0,0,.12)');camShake=.2;
            } else if(target){target.hp-=s.atk;if(target.hp<=0)killSoldier(target);}
        } else if(tp&&bestD<20){
            const dx=tp.x-s.mesh.position.x,dz=tp.z-s.mesh.position.z;
            const len=Math.sqrt(dx*dx+dz*dz)||1;
            s.mesh.position.x+=dx/len*s.speed*dt;
            s.mesh.position.z+=dz/len*s.speed*dt;
            s.mesh.rotation.y=Math.atan2(dx,dz);
        } else {
            s.wt-=dt;if(s.wt<=0){s.wt=rng(2,5);s.tx=s.mesh.position.x+rng(-8,8);s.tz=s.mesh.position.z+rng(-8,8);}
            const dx=s.tx-s.mesh.position.x,dz=s.tz-s.mesh.position.z;
            const len=Math.sqrt(dx*dx+dz*dz)||1;
            s.mesh.position.x+=dx/len*s.speed*.3*dt;
            s.mesh.position.z+=dz/len*s.speed*.3*dt;
        }
        // Bob
        s.mesh.position.y=Math.sin(Date.now()*.004+s.mesh.position.x)*.02;
    });
}

function killEnemy(e){
    e.dead=true;player.kills++;
    // Death animation — fall over
    const tween = ()=>{
        let t=0;
        const fall=setInterval(()=>{
            t+=0.05;
            e.mesh.rotation.x=t*-1.5;
            e.mesh.position.y-=0.02;
            if(t>=1){clearInterval(fall);scene.remove(e.mesh);}
        },16);
    };
    tween();
    kfeed(`💀 Enemy killed! (${player.kills})`);
    flash('rgba(255,200,50,.1)');
}
function killSoldier(s){
    s.dead=true;
    const tween = ()=>{
        let t=0;
        const fall=setInterval(()=>{
            t+=0.05;
            s.mesh.rotation.x=t*-1.5;
            s.mesh.position.y-=0.02;
            if(t>=1){clearInterval(fall);scene.remove(s.mesh);}
        },16);
    };
    tween();
}

// UI
function updateHUD(){
    const pct=Math.max(0,player.hp/player.maxHp*100);
    document.getElementById('hp-fill').style.width=pct+'%';
    document.getElementById('hp-fill').style.background=pct>50?'#ef4444':pct>25?'#f59e0b':'#ef4444';
    document.getElementById('hp-txt').textContent=`${Math.max(0,Math.round(player.hp))}/${player.maxHp}`;
    document.getElementById('h-wave').textContent=wave;
    document.getElementById('h-kills').textContent=player.kills;
    document.getElementById('h-enemies').textContent=enemies.filter(e=>!e.dead).length;
    document.getElementById('h-allies').textContent=allies.filter(a=>!a.dead).length;
}
function kfeed(t){const el=document.getElementById('kf'),m=document.createElement('div');m.className='kfe';m.textContent=t;el.appendChild(m);while(el.children.length>6)el.removeChild(el.firstChild);setTimeout(()=>{m.style.opacity='0';m.style.transition='opacity .5s';setTimeout(()=>m.remove(),500);},3000);}
function banner(t){const b=document.getElementById('banner');b.textContent=t;b.classList.add('show');setTimeout(()=>b.classList.remove('show'),2000);}
function flash(c){const f=document.getElementById('flash');f.style.background=c;f.style.opacity='1';setTimeout(()=>f.style.opacity='0',100);}
function dist3(a,b){return Math.sqrt((a.x-b.x)**2+(a.z-b.z)**2);}
function rng(a,b){return Math.floor(Math.random()*(b-a+1))+a;}

function startGame(){
    // Clear old soldiers
    enemies.forEach(e=>scene.remove(e.mesh));
    allies.forEach(a=>scene.remove(a.mesh));
    enemies=[];allies=[];

    // Reset player
    player.hp=100;player.maxHp=100;player.kills=0;player.atkCd=0;player.x=-35;player.z=0;player.yaw=0;player.pitch=0;
    wave=1;gameOver=false;started=true;swordSwing=0;camShake=0;

    document.getElementById('title').classList.add('hidden');
    document.getElementById('title').querySelector('button').textContent='FIGHT';
    renderer.domElement.requestPointerLock();
    banner('WAVE 1');
    setTimeout(spawnWave, 500);
}

init();
