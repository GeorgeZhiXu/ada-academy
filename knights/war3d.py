#!/usr/bin/env python3
"""
War of the Knights - 3D Battle Game
Built with Ursina Engine
WASD to move | Mouse to look | Left click to attack | Right click to block
"""

from ursina import *
from ursina.prefabs.first_person_controller import FirstPersonController
import random
import math

app = Ursina(title='War of the Knights', borderless=False, size=(1280, 720))

# ============= GAME STATE =============
game_state = {
    'score': 0,
    'kills': 0,
    'wave': 1,
    'game_over': False,
    'victory': False,
    'attacking': False,
    'attack_cooldown': 0,
    'block': False,
}

enemies = []
ally_knights = []

# ============= COLORS =============
GROUND_COLOR = color.rgb(60, 100, 40)
STONE_COLOR = color.rgb(100, 90, 80)
WOOD_COLOR = color.rgb(90, 55, 30)
PLAYER_COLOR = color.rgb(40, 80, 180)
ENEMY_COLOR = color.rgb(180, 40, 40)
ALLY_COLOR = color.rgb(40, 120, 200)
GOLD_COLOR = color.rgb(200, 170, 50)
METAL_COLOR = color.rgb(160, 160, 170)

# ============= TERRAIN =============
# Ground
ground = Entity(
    model='plane',
    scale=(200, 1, 200),
    color=GROUND_COLOR,
    texture='grass',
    collider='box',
)

# Dirt patches
for i in range(20):
    Entity(
        model='plane',
        scale=(random.uniform(5, 15), 1, random.uniform(5, 15)),
        position=(random.uniform(-80, 80), 0.01, random.uniform(-80, 80)),
        color=color.rgb(80 + random.randint(0, 20), 65 + random.randint(0, 15), 40 + random.randint(0, 10)),
        rotation_y=random.uniform(0, 360),
    )

# ============= CASTLE =============
# Walls
wall_positions = [
    (0, 2.5, -20, 40, 5, 1.5),   # North wall
    (0, 2.5, 20, 40, 5, 1.5),    # South wall
    (-20, 2.5, 0, 1.5, 5, 40),   # West wall
    (20, 2.5, 0, 1.5, 5, 40),    # East wall
]
for wx, wy, wz, sx, sy, sz in wall_positions:
    Entity(model='cube', position=(wx, wy, wz), scale=(sx, sy, sz), color=STONE_COLOR, collider='box')

# Towers at corners
for tx, tz in [(-20, -20), (20, -20), (-20, 20), (20, 20)]:
    Entity(model='cylinder', position=(tx, 4, tz), scale=(3, 8, 3), color=color.rgb(90, 80, 70), collider='box')
    # Battlement top
    Entity(model='cylinder', position=(tx, 8.5, tz), scale=(3.5, 0.5, 3.5), color=color.rgb(80, 70, 60))

# Castle keep (center)
Entity(model='cube', position=(0, 4, 0), scale=(8, 8, 8), color=color.rgb(95, 85, 75), collider='box')
Entity(model='cylinder', position=(0, 9, 0), scale=(4, 2, 4), color=color.rgb(85, 75, 65))

# Gate openings (visible archways)
Entity(model='cube', position=(-20, 1.5, -25), scale=(1.5, 3, 4), color=STONE_COLOR, collider='box')
Entity(model='cube', position=(20, 1.5, 25), scale=(1.5, 3, 4), color=STONE_COLOR, collider='box')

# ============= TREES =============
for i in range(60):
    tx = random.uniform(-90, 90)
    tz = random.uniform(-90, 90)
    if abs(tx) < 25 and abs(tz) < 25:
        continue  # Skip castle area
    tree_scale = random.uniform(0.8, 1.5)
    # Trunk
    Entity(
        model='cylinder',
        position=(tx, 2 * tree_scale, tz),
        scale=(0.4 * tree_scale, 4 * tree_scale, 0.4 * tree_scale),
        color=color.rgb(70 + random.randint(0, 20), 40 + random.randint(0, 10), 20),
    )
    # Leaves
    if random.random() < 0.5:
        # Pine (cone)
        for j in range(3):
            Entity(
                model='cone',
                position=(tx, (5 + j * 1.5) * tree_scale, tz),
                scale=((3 - j * 0.7) * tree_scale, 2.5 * tree_scale, (3 - j * 0.7) * tree_scale),
                color=color.rgb(25 + random.randint(0, 20), 90 + random.randint(0, 30), 25 + random.randint(0, 15)),
            )
    else:
        # Oak (sphere)
        Entity(
            model='sphere',
            position=(tx, 5.5 * tree_scale, tz),
            scale=(3.5 * tree_scale, 2.5 * tree_scale, 3.5 * tree_scale),
            color=color.rgb(30 + random.randint(0, 15), 85 + random.randint(0, 25), 25 + random.randint(0, 10)),
        )

# ============= ROCKS =============
for i in range(20):
    rx, rz = random.uniform(-80, 80), random.uniform(-80, 80)
    if abs(rx) < 25 and abs(rz) < 25:
        continue
    Entity(
        model='sphere',
        position=(rx, 0.4, rz),
        scale=(random.uniform(1, 3), random.uniform(0.5, 1.5), random.uniform(1, 3)),
        color=color.rgb(90 + random.randint(0, 20), 85 + random.randint(0, 15), 80 + random.randint(0, 10)),
        collider='box',
        rotation_y=random.uniform(0, 360),
    )

# ============= HAY BALES =============
for pos in [(-30, 0.5, -10), (-35, 0.5, 5), (30, 0.5, -5), (35, 0.5, 10)]:
    Entity(model='cylinder', position=pos, scale=(1.2, 1, 1.2), color=color.rgb(190, 170, 80), rotation_z=90)

# ============= CAMPFIRES =============
for pos in [(-40, 0, 0), (40, 0, 0)]:
    # Stone ring
    for j in range(6):
        angle = (j / 6) * math.pi * 2
        Entity(model='sphere', position=(pos[0] + math.cos(angle) * 1, 0.15, pos[2] + math.sin(angle) * 1), scale=0.3, color=color.rgb(80, 75, 70))
    # Fire glow
    fire_light = PointLight(position=(pos[0], 1.5, pos[2]), color=color.rgb(255, 150, 50))
    fire_light.intensity = 2
    Entity(model='sphere', position=(pos[0], 0.5, pos[2]), scale=0.5, color=color.rgb(255, 120, 30), unlit=True)

# ============= FLAGS =============
for fpos, fcol in [((-45, 0, 0), color.rgb(50, 100, 200)), ((45, 0, 0), color.rgb(200, 50, 50))]:
    Entity(model='cylinder', position=(fpos[0], 3, fpos[2]), scale=(0.08, 6, 0.08), color=color.rgb(120, 100, 80))
    Entity(model='cube', position=(fpos[0] + 0.8, 5.5, fpos[2]), scale=(1.5, 0.8, 0.03), color=fcol, unlit=True)

# ============= LIGHTING =============
sun = DirectionalLight(shadow_map_resolution=(2048, 2048))
sun.look_at(Vec3(1, -1, -1))
sun.color = color.rgb(255, 245, 220)
ambient = AmbientLight(color=color.rgb(80, 85, 95))

# Sky
sky = Sky(color=color.rgb(135, 180, 230))

# ============= PLAYER =============
player = FirstPersonController(
    position=(-35, 2, 0),
    speed=8,
    mouse_sensitivity=Vec2(80, 80),
)
player.cursor.visible = False
player.health = 100
player.max_health = 100
player.gravity = 1

# Sword (attached to camera)
sword = Entity(
    parent=camera,
    model='cube',
    scale=(0.08, 1.0, 0.08),
    position=(0.5, -0.3, 0.8),
    color=METAL_COLOR,
    unlit=True,
)
# Sword guard
Entity(parent=sword, model='cube', scale=(3, 0.15, 1), position=(0, -0.45, 0), color=GOLD_COLOR, unlit=True)
# Sword handle
Entity(parent=sword, model='cube', scale=(0.5, 0.2, 0.5), position=(0, -0.55, 0), color=WOOD_COLOR, unlit=True)

sword_default_pos = Vec3(0.5, -0.3, 0.8)
sword_default_rot = Vec3(0, 0, 0)

# ============= ENEMY CLASS =============
class EnemyKnight(Entity):
    def __init__(self, pos, team='enemy', **kwargs):
        body_color = ENEMY_COLOR if team == 'enemy' else ALLY_COLOR
        super().__init__(
            model='cube',
            scale=(0.8, 1.8, 0.6),
            position=pos,
            color=body_color,
            collider='box',
        )
        self.team = team
        self.health = 50 + random.randint(0, 30)
        self.max_health = self.health
        self.damage = 8 + random.randint(0, 5)
        self.speed = 3 + random.uniform(-0.5, 1)
        self.attack_range = 2.5
        self.detect_range = 25
        self.attack_cooldown = 0
        self.dead = False
        self.target = None
        self.wander_timer = 0
        self.wander_dir = Vec3(0, 0, 0)

        # Head
        Entity(parent=self, model='sphere', scale=(0.8, 0.5, 0.7), position=(0, 0.7, 0), color=color.rgb(200, 170, 130))
        # Helmet
        Entity(parent=self, model='sphere', scale=(0.85, 0.35, 0.75), position=(0, 0.85, 0), color=METAL_COLOR)
        # Sword
        self.sword_entity = Entity(parent=self, model='cube', scale=(0.12, 1, 0.12), position=(0.5, 0.3, -0.2), color=METAL_COLOR)
        # Shield (some have them)
        if random.random() < 0.5:
            shield_color = color.rgb(30, 50, 120) if team == 'ally' else color.rgb(120, 30, 20)
            Entity(parent=self, model='cube', scale=(0.7, 0.9, 0.1), position=(-0.5, 0.2, -0.15), color=shield_color)

    def update(self):
        if self.dead or game_state['game_over']:
            return

        dt = time.dt
        self.attack_cooldown = max(0, self.attack_cooldown - dt)

        # Find target
        self.find_target()

        if self.target and hasattr(self.target, 'position'):
            target_pos = self.target.position if not hasattr(self.target, 'world_position') else self.target.position
            dist = distance(self.position, target_pos)

            if dist < self.attack_range:
                # Attack
                if self.attack_cooldown <= 0:
                    self.attack_cooldown = 0.8 + random.uniform(0, 0.4)
                    self.do_attack()
            elif dist < self.detect_range:
                # Chase
                direction = (target_pos - self.position).normalized()
                direction.y = 0
                self.position += direction * self.speed * dt
                self.look_at(Vec3(target_pos.x, self.position.y, target_pos.z))
            else:
                self.wander(dt)
        else:
            self.wander(dt)

    def find_target(self):
        self.target = None
        best_dist = self.detect_range

        if self.team == 'enemy':
            # Target player
            d = distance(self.position, player.position)
            if d < best_dist:
                best_dist = d
                self.target = player
            # Target allies
            for a in ally_knights:
                if a.dead:
                    continue
                d = distance(self.position, a.position)
                if d < best_dist:
                    best_dist = d
                    self.target = a
        else:
            # Ally targets enemies
            for e in enemies:
                if e.dead:
                    continue
                d = distance(self.position, e.position)
                if d < best_dist:
                    best_dist = d
                    self.target = e

    def wander(self, dt):
        self.wander_timer -= dt
        if self.wander_timer <= 0:
            self.wander_timer = random.uniform(2, 5)
            angle = random.uniform(0, math.pi * 2)
            self.wander_dir = Vec3(math.cos(angle), 0, math.sin(angle))
        self.position += self.wander_dir * self.speed * 0.3 * dt
        # Keep in bounds
        self.position = Vec3(
            max(-90, min(90, self.position.x)),
            self.position.y,
            max(-90, min(90, self.position.z))
        )

    def do_attack(self):
        if not self.target:
            return
        # Sword swing
        self.sword_entity.animate('rotation_x', -90, duration=0.15)
        invoke(lambda: self.sword_entity.animate('rotation_x', 0, duration=0.2), delay=0.2)

        if self.target == player:
            dmg = self.damage
            if game_state['block']:
                dmg = max(1, dmg // 3)
            player.health -= dmg
            # Red flash
            camera.overlay.color = color.rgb(200, 0, 0, 80)
            invoke(lambda: setattr(camera.overlay, 'color', color.clear), delay=0.15)
        elif hasattr(self.target, 'take_hit'):
            self.target.take_hit(self.damage)

    def take_hit(self, dmg):
        self.health -= dmg
        # Flash white
        self.color = color.white
        invoke(lambda: setattr(self, 'color', ENEMY_COLOR if self.team == 'enemy' else ALLY_COLOR), delay=0.1)

        if self.health <= 0:
            self.die()

    def die(self):
        self.dead = True
        self.collider = None
        self.animate('rotation_x', -90, duration=0.4)
        self.animate('position', self.position + Vec3(0, -0.5, 0), duration=0.4)
        destroy(self, delay=3)


# ============= SPAWN ARMIES =============
def spawn_wave():
    global enemies, ally_knights

    # Clear dead
    enemies = [e for e in enemies if not e.dead]
    ally_knights = [a for a in ally_knights if not a.dead]

    w = game_state['wave']

    # Spawn enemies (east side)
    for i in range(5 + w * 2):
        pos = Vec3(random.uniform(28, 60), 1, random.uniform(-30, 30))
        e = EnemyKnight(pos, team='enemy')
        e.health = 40 + w * 10 + random.randint(0, 20)
        e.max_health = e.health
        e.damage = 6 + w * 2 + random.randint(0, 3)
        enemies.append(e)

    # Spawn allies (west side)
    for i in range(3 + w):
        pos = Vec3(random.uniform(-60, -28), 1, random.uniform(-25, 25))
        a = EnemyKnight(pos, team='ally')
        a.health = 40 + w * 8
        a.max_health = a.health
        a.damage = 8 + w * 2
        ally_knights.append(a)

spawn_wave()

# ============= UI =============
# Health bar
hp_bg = Entity(parent=camera.ui, model='quad', scale=(0.4, 0.03), position=(-0.0, -0.45), color=color.rgb(40, 40, 40))
hp_bar = Entity(parent=camera.ui, model='quad', scale=(0.4, 0.025), position=(0, -0.45), color=color.rgb(220, 50, 50), origin=(-0.5, 0))
hp_text = Text(parent=camera.ui, text='100/100', position=(-0.06, -0.43), scale=1.2, color=color.white)

# Score / info
info_text = Text(parent=camera.ui, text='Wave 1 | Kills: 0', position=(-0.85, 0.47), scale=1.2, color=GOLD_COLOR)
enemy_count_text = Text(parent=camera.ui, text='Enemies: 0', position=(0.55, 0.47), scale=1.2, color=ENEMY_COLOR)

# Crosshair
Entity(parent=camera.ui, model='quad', scale=(0.002, 0.02), color=color.white33)
Entity(parent=camera.ui, model='quad', scale=(0.02, 0.002), color=color.white33)

# Wave banner
wave_banner = Text(parent=camera.ui, text='', position=(0, 0.1), scale=3, color=GOLD_COLOR, origin=(0, 0))
wave_banner.visible = False

# Game over text
gameover_text = Text(parent=camera.ui, text='', position=(0, 0), scale=4, color=color.red, origin=(0, 0))
gameover_text.visible = False

# ============= GAME LOGIC =============
def update():
    global enemies, ally_knights

    if game_state['game_over']:
        return

    dt = time.dt

    # Attack cooldown
    game_state['attack_cooldown'] = max(0, game_state['attack_cooldown'] - dt)

    # Block (right mouse)
    game_state['block'] = held_keys['right mouse']
    if game_state['block']:
        sword.position = Vec3(0.3, 0, 0.5)
        sword.rotation = Vec3(0, 0, 45)
    elif not game_state['attacking']:
        sword.position = lerp(sword.position, sword_default_pos, dt * 10)
        sword.rotation = lerp(sword.rotation, Vec3(0, 0, 0), dt * 10)

    # Attack (left mouse)
    if held_keys['left mouse'] and game_state['attack_cooldown'] <= 0 and not game_state['block']:
        do_player_attack()

    # Update UI
    pct = max(0, player.health / player.max_health)
    hp_bar.scale_x = 0.4 * pct
    hp_bar.color = color.rgb(220, 50, 50) if pct > 0.5 else color.rgb(220, 180, 50) if pct > 0.25 else color.rgb(220, 50, 50)
    hp_text.text = f'{max(0, int(player.health))}/{player.max_health}'

    alive_enemies = len([e for e in enemies if not e.dead])
    info_text.text = f'Wave {game_state["wave"]} | Kills: {game_state["kills"]} | Score: {game_state["score"]}'
    enemy_count_text.text = f'Enemies: {alive_enemies}'

    # Check player death
    if player.health <= 0:
        game_state['game_over'] = True
        gameover_text.text = 'DEFEATED'
        gameover_text.visible = True
        player.enabled = False
        mouse.locked = False
        return

    # Check wave clear
    if alive_enemies == 0:
        game_state['wave'] += 1
        wave_banner.text = f'WAVE {game_state["wave"]}'
        wave_banner.visible = True
        invoke(lambda: setattr(wave_banner, 'visible', False), delay=2)
        # Heal between waves
        player.health = min(player.max_health, player.health + 20)
        spawn_wave()


def do_player_attack():
    game_state['attack_cooldown'] = 0.4
    game_state['attacking'] = True

    # Sword swing animation
    sword.animate('rotation_x', -60, duration=0.1)
    sword.animate('position', Vec3(0.4, 0, 1.2), duration=0.1)
    invoke(reset_sword, delay=0.25)

    # Hit detection
    for e in enemies:
        if e.dead:
            continue
        d = distance(player.position, e.position)
        if d < 3.5:
            # Check if facing enemy
            to_enemy = (e.position - player.position).normalized()
            facing = camera.forward
            if to_enemy.x * facing.x + to_enemy.z * facing.z > 0.3:
                crit = random.random() < 0.15
                dmg = 20 + random.randint(-3, 5)
                if crit:
                    dmg = int(dmg * 2)
                e.take_hit(dmg)

                # Camera punch
                camera.shake(duration=0.1, magnitude=0.5)

                if e.health <= 0:
                    game_state['kills'] += 1
                    game_state['score'] += 100
                break


def reset_sword():
    game_state['attacking'] = False


def input(key):
    if key == 'escape':
        if mouse.locked:
            mouse.locked = False
        else:
            application.quit()
    if key == 'left mouse down' and not mouse.locked:
        mouse.locked = True


# ============= RUN =============
print("=" * 50)
print("WAR OF THE KNIGHTS - 3D BATTLE")
print("=" * 50)
print("WASD - Move")
print("Mouse - Look")
print("Left Click - Attack")
print("Right Click - Block")
print("ESC - Unlock mouse / Quit")
print("=" * 50)

app.run()
