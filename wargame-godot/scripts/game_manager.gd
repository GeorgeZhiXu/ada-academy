extends Node3D

func _ready():
	build_world()
	spawn_armies()

func build_world():
	# === FOREST (lots of trees) ===
	var tree_positions = []
	for i in 80:
		var x = randf_range(-55, 55)
		var z = randf_range(-35, 35)
		# Keep clear of center battlefield
		if abs(x) < 8 and abs(z) < 12:
			continue
		# Don't overlap
		var too_close = false
		for tp in tree_positions:
			if Vector2(x, z).distance_to(Vector2(tp.x, tp.z)) < 3:
				too_close = true
				break
		if too_close:
			continue
		tree_positions.append(Vector3(x, 0, z))
		make_tree(Vector3(x, 0, z), randf_range(0.6, 1.4))

	# === ROCKS ===
	for i in 25:
		var x = randf_range(-50, 50)
		var z = randf_range(-30, 30)
		if abs(x) < 5 and abs(z) < 5:
			continue
		make_rock(Vector3(x, 0, z), randf_range(0.5, 1.5))

	# === CASTLE (center of map) ===
	# Main walls
	make_wall(Vector3(0, 0, -10), Vector3(20, 4.5, 1.2), Color(0.38, 0.32, 0.26))
	make_wall(Vector3(0, 0, 10), Vector3(20, 4.5, 1.2), Color(0.38, 0.32, 0.26))
	make_wall(Vector3(-10, 0, 0), Vector3(1.2, 4.5, 20), Color(0.38, 0.32, 0.26))
	make_wall(Vector3(10, 0, 0), Vector3(1.2, 4.5, 20), Color(0.38, 0.32, 0.26))
	# Gate openings (shorter walls with gaps)
	make_wall(Vector3(-10, 0, -13), Vector3(1.2, 3, 5), Color(0.35, 0.3, 0.24))
	make_wall(Vector3(10, 0, 13), Vector3(1.2, 3, 5), Color(0.35, 0.3, 0.24))

	# Corner towers
	for pos in [Vector3(-10, 0, -10), Vector3(10, 0, -10), Vector3(-10, 0, 10), Vector3(10, 0, 10)]:
		make_tower(pos)

	# Gate towers
	make_tower(Vector3(-10, 0, -15.5))
	make_tower(Vector3(10, 0, 15.5))

	# === INNER CASTLE KEEP ===
	make_wall(Vector3(0, 0, 0), Vector3(4, 6, 4), Color(0.42, 0.36, 0.28))
	# Keep tower on top
	var keep_top = MeshInstance3D.new()
	var kt = CylinderMesh.new()
	kt.top_radius = 1.8
	kt.bottom_radius = 2.0
	kt.height = 2.0
	keep_top.mesh = kt
	keep_top.position = Vector3(0, 7, 0)
	var ktmat = StandardMaterial3D.new()
	ktmat.albedo_color = Color(0.4, 0.34, 0.27)
	ktmat.roughness = 0.9
	keep_top.set_surface_override_material(0, ktmat)
	keep_top.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_ON
	add_child(keep_top)

	# === BATTLEFIELD DETAILS ===
	# Hay bales
	for pos in [Vector3(-15, 0.4, -5), Vector3(-18, 0.4, 3), Vector3(16, 0.4, -2), Vector3(20, 0.4, 7)]:
		make_hay(pos)

	# Barricades / fences
	for i in 6:
		var x = randf_range(-30, 30)
		var z = randf_range(-20, 20)
		if abs(x) < 12 and abs(z) < 12:
			continue
		make_fence(Vector3(x, 0, z), randf_range(0, PI))

	# Campfires
	make_campfire(Vector3(-25, 0, 0))
	make_campfire(Vector3(25, 0, 0))

	# Flags / banners
	make_flag(Vector3(-30, 0, 0), Color(0.2, 0.4, 0.85))  # Blue camp
	make_flag(Vector3(30, 0, 0), Color(0.85, 0.2, 0.2))    # Red camp

	# === GROUND DETAILS (patches of dirt) ===
	for i in 15:
		var dirt = MeshInstance3D.new()
		var dm = PlaneMesh.new()
		dm.size = Vector2(randf_range(3, 8), randf_range(3, 8))
		dirt.mesh = dm
		dirt.position = Vector3(randf_range(-40, 40), 0.01, randf_range(-25, 25))
		dirt.rotation.y = randf_range(0, PI)
		var dmat = StandardMaterial3D.new()
		dmat.albedo_color = Color(0.3 + randf()*0.08, 0.25 + randf()*0.06, 0.18 + randf()*0.04)
		dmat.roughness = 0.98
		dirt.set_surface_override_material(0, dmat)
		add_child(dirt)

func spawn_armies():
	# Blue army (west side)
	for i in 18:
		var pos = Vector3(randf_range(-35, -14), 1, randf_range(-18, 18))
		make_soldier(0, pos)

	# Red army (east side)
	for i in 20:
		var pos = Vector3(randf_range(14, 35), 1, randf_range(-18, 18))
		make_soldier(1, pos)

# === BUILDER FUNCTIONS ===

func make_tree(pos: Vector3, scale: float):
	var tree = Node3D.new()
	tree.position = pos

	# Trunk
	var trunk = MeshInstance3D.new()
	var tm = CylinderMesh.new()
	tm.top_radius = 0.12 * scale
	tm.bottom_radius = 0.2 * scale
	tm.height = 3.0 * scale
	trunk.mesh = tm
	trunk.position.y = 1.5 * scale
	var tmat = StandardMaterial3D.new()
	tmat.albedo_color = Color(0.3 + randf()*0.1, 0.18 + randf()*0.06, 0.08 + randf()*0.04)
	tmat.roughness = 0.95
	trunk.set_surface_override_material(0, tmat)
	trunk.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_ON
	tree.add_child(trunk)

	# Leaves (2-3 clusters)
	var leaf_color = Color(0.12 + randf()*0.1, 0.35 + randf()*0.15, 0.1 + randf()*0.08)
	var lmat = StandardMaterial3D.new()
	lmat.albedo_color = leaf_color
	lmat.roughness = 0.85

	if randf() < 0.5:
		# Pine style (cone shape using cylinder with top_radius=0)
		for j in 3:
			var cone = MeshInstance3D.new()
			var cm = CylinderMesh.new()
			cm.top_radius = 0.05 * scale
			cm.bottom_radius = (1.8 - j * 0.4) * scale
			cm.height = (2.0 - j * 0.3) * scale
			cone.mesh = cm
			cone.position.y = (3.5 + j * 1.2) * scale
			cone.set_surface_override_material(0, lmat)
			cone.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_ON
			tree.add_child(cone)
	else:
		# Oak style (spheres)
		var main = MeshInstance3D.new()
		var sm = SphereMesh.new()
		sm.radius = 1.8 * scale
		main.mesh = sm
		main.position.y = 4.0 * scale
		main.scale = Vector3(1, 0.75, 1)
		main.set_surface_override_material(0, lmat)
		main.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_ON
		tree.add_child(main)
		# Side clusters
		for j in 2:
			var cl = MeshInstance3D.new()
			var clm = SphereMesh.new()
			clm.radius = (0.8 + randf()*0.5) * scale
			cl.mesh = clm
			var angle = j * PI + randf() * 0.5
			cl.position = Vector3(cos(angle) * 1.2 * scale, (3.5 + randf()) * scale, sin(angle) * 1.2 * scale)
			cl.set_surface_override_material(0, lmat)
			cl.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_ON
			tree.add_child(cl)

	add_child(tree)

func make_rock(pos: Vector3, scale: float):
	var rock = MeshInstance3D.new()
	var rm = SphereMesh.new()
	rm.radius = 0.8 * scale
	rock.mesh = rm
	rock.position = pos + Vector3(0, 0.3 * scale, 0)
	rock.scale = Vector3(1 + randf()*0.3, 0.4 + randf()*0.3, 1 + randf()*0.3)
	rock.rotation.y = randf() * PI * 2
	var rmat = StandardMaterial3D.new()
	rmat.albedo_color = Color(0.38 + randf()*0.1, 0.36 + randf()*0.08, 0.32 + randf()*0.06)
	rmat.roughness = 0.95
	rock.set_surface_override_material(0, rmat)
	rock.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_ON
	add_child(rock)

func make_wall(pos: Vector3, size: Vector3, color: Color):
	var body = StaticBody3D.new()
	body.position = pos + Vector3(0, size.y / 2, 0)
	var mesh = MeshInstance3D.new()
	var bm = BoxMesh.new()
	bm.size = size
	mesh.mesh = bm
	var mat = StandardMaterial3D.new()
	mat.albedo_color = color
	mat.roughness = 0.92
	mesh.set_surface_override_material(0, mat)
	mesh.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_ON
	body.add_child(mesh)
	var col = CollisionShape3D.new()
	var shape = BoxShape3D.new()
	shape.size = size
	col.shape = shape
	body.add_child(col)
	add_child(body)

func make_tower(pos: Vector3):
	var tower = MeshInstance3D.new()
	var tm = CylinderMesh.new()
	tm.top_radius = 1.3
	tm.bottom_radius = 1.5
	tm.height = 7.0
	tower.mesh = tm
	tower.position = pos + Vector3(0, 3.5, 0)
	var tmat = StandardMaterial3D.new()
	tmat.albedo_color = Color(0.4, 0.34, 0.27)
	tmat.roughness = 0.9
	tower.set_surface_override_material(0, tmat)
	tower.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_ON
	add_child(tower)
	# Battlement ring
	var ring = MeshInstance3D.new()
	var rm = CylinderMesh.new()
	rm.top_radius = 1.5
	rm.bottom_radius = 1.5
	rm.height = 0.4
	ring.mesh = rm
	ring.position = pos + Vector3(0, 7.2, 0)
	ring.set_surface_override_material(0, tmat)
	add_child(ring)

func make_hay(pos: Vector3):
	var hay = MeshInstance3D.new()
	var hm = CylinderMesh.new()
	hm.top_radius = 0.6
	hm.bottom_radius = 0.6
	hm.height = 0.8
	hay.mesh = hm
	hay.position = pos
	hay.rotation.z = PI / 2
	var hmat = StandardMaterial3D.new()
	hmat.albedo_color = Color(0.75, 0.65, 0.3)
	hmat.roughness = 0.95
	hay.set_surface_override_material(0, hmat)
	hay.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_ON
	add_child(hay)

func make_fence(pos: Vector3, rot: float):
	var fence = Node3D.new()
	fence.position = pos
	fence.rotation.y = rot
	var fmat = StandardMaterial3D.new()
	fmat.albedo_color = Color(0.4, 0.28, 0.15)
	fmat.roughness = 0.95
	for i in 4:
		var post = MeshInstance3D.new()
		var pm = CylinderMesh.new()
		pm.top_radius = 0.04
		pm.bottom_radius = 0.05
		pm.height = 1.2
		post.mesh = pm
		post.position = Vector3(i * 0.8 - 1.2, 0.6, 0)
		post.set_surface_override_material(0, fmat)
		post.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_ON
		fence.add_child(post)
	# Cross beams
	for j in 2:
		var beam = MeshInstance3D.new()
		var bm = BoxMesh.new()
		bm.size = Vector3(3.2, 0.06, 0.06)
		beam.mesh = bm
		beam.position = Vector3(0, 0.35 + j * 0.4, 0)
		beam.set_surface_override_material(0, fmat)
		fence.add_child(beam)
	add_child(fence)

func make_campfire(pos: Vector3):
	var fire = Node3D.new()
	fire.position = pos
	# Stone ring
	for i in 6:
		var stone = MeshInstance3D.new()
		var sm = SphereMesh.new()
		sm.radius = 0.2
		stone.mesh = sm
		var angle = (float(i) / 6) * PI * 2
		stone.position = Vector3(cos(angle) * 0.7, 0.1, sin(angle) * 0.7)
		var smat = StandardMaterial3D.new()
		smat.albedo_color = Color(0.4, 0.38, 0.35)
		stone.set_surface_override_material(0, smat)
		fire.add_child(stone)
	# Fire light
	var light = OmniLight3D.new()
	light.light_color = Color(1, 0.6, 0.2)
	light.light_energy = 3.0
	light.omni_range = 8.0
	light.position.y = 1.0
	fire.add_child(light)
	# Glow ball
	var glow = MeshInstance3D.new()
	var gm = SphereMesh.new()
	gm.radius = 0.3
	glow.mesh = gm
	glow.position.y = 0.4
	var glmat = StandardMaterial3D.new()
	glmat.albedo_color = Color(1, 0.5, 0.1)
	glmat.emission_enabled = true
	glmat.emission = Color(1, 0.5, 0.1)
	glmat.emission_energy_multiplier = 3.0
	glow.set_surface_override_material(0, glmat)
	fire.add_child(glow)
	add_child(fire)

func make_flag(pos: Vector3, color: Color):
	var flag = Node3D.new()
	flag.position = pos
	# Pole
	var pole = MeshInstance3D.new()
	var pm = CylinderMesh.new()
	pm.top_radius = 0.04
	pm.bottom_radius = 0.05
	pm.height = 5.0
	pole.mesh = pm
	pole.position.y = 2.5
	var pmat = StandardMaterial3D.new()
	pmat.albedo_color = Color(0.5, 0.4, 0.3)
	pole.set_surface_override_material(0, pmat)
	pole.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_ON
	flag.add_child(pole)
	# Cloth
	var cloth = MeshInstance3D.new()
	var cm = BoxMesh.new()
	cm.size = Vector3(1.2, 0.7, 0.02)
	cloth.mesh = cm
	cloth.position = Vector3(0.6, 4.5, 0)
	var cmat = StandardMaterial3D.new()
	cmat.albedo_color = color
	cloth.set_surface_override_material(0, cmat)
	cloth.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_ON
	flag.add_child(cloth)
	add_child(flag)

func make_soldier(team: int, pos: Vector3):
	var s = CharacterBody3D.new()
	var script = load("res://scripts/soldier.gd")
	s.set_script(script)
	s.set("team", team)

	# Body
	var body = MeshInstance3D.new()
	body.name = "Body"
	var cap = CapsuleMesh.new()
	cap.radius = 0.22
	cap.height = 1.2
	body.mesh = cap
	body.position.y = 0.6
	var mat = StandardMaterial3D.new()
	mat.albedo_color = Color(0.2, 0.4, 0.85) if team == 0 else Color(0.85, 0.2, 0.2)
	body.set_surface_override_material(0, mat)
	body.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_ON
	s.add_child(body)

	# Head
	var head = MeshInstance3D.new()
	var sph = SphereMesh.new()
	sph.radius = 0.16
	head.mesh = sph
	head.position.y = 1.35
	var hmat = StandardMaterial3D.new()
	hmat.albedo_color = Color(0.82, 0.68, 0.52)
	head.set_surface_override_material(0, hmat)
	s.add_child(head)

	# Helmet
	var helm = MeshInstance3D.new()
	var hm = SphereMesh.new()
	hm.radius = 0.18
	helm.mesh = hm
	helm.position.y = 1.42
	helm.scale = Vector3(1, 0.5, 1)
	var hmmat = StandardMaterial3D.new()
	hmmat.albedo_color = Color(0.45, 0.43, 0.4)
	hmmat.metallic = 0.7
	hmmat.roughness = 0.3
	helm.set_surface_override_material(0, hmmat)
	s.add_child(helm)

	# Sword
	var sw = MeshInstance3D.new()
	var blade = BoxMesh.new()
	blade.size = Vector3(0.04, 0.65, 0.04)
	sw.mesh = blade
	sw.position = Vector3(0.3, 0.9, -0.15)
	var swmat = StandardMaterial3D.new()
	swmat.albedo_color = Color(0.7, 0.7, 0.75)
	swmat.metallic = 0.85
	swmat.roughness = 0.15
	sw.set_surface_override_material(0, swmat)
	s.add_child(sw)

	# Shield (half the soldiers)
	if randf() < 0.5:
		var sh = MeshInstance3D.new()
		var shm = BoxMesh.new()
		shm.size = Vector3(0.45, 0.55, 0.06)
		sh.mesh = shm
		sh.position = Vector3(-0.3, 0.85, -0.1)
		var shmat = StandardMaterial3D.new()
		shmat.albedo_color = Color(0.15, 0.25, 0.5) if team == 0 else Color(0.5, 0.15, 0.1)
		shmat.roughness = 0.7
		sh.set_surface_override_material(0, shmat)
		s.add_child(sh)

	# Collision
	var col = CollisionShape3D.new()
	var shape = CapsuleShape3D.new()
	shape.radius = 0.28
	shape.height = 1.4
	col.shape = shape
	col.position.y = 0.7
	s.add_child(col)

	s.position = pos
	if team == 0:
		s.add_to_group("allies")
	else:
		s.add_to_group("enemies")
	add_child(s)
