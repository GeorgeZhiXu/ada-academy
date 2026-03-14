@tool
extends EditorScript

## Run this in Godot Editor: Script > Run (Ctrl+Shift+X)
## It creates the full game scene with terrain, player, lights, flags, etc.

func _run():
	var root = Node3D.new()
	root.name = "Main"
	root.set_script(load("res://scripts/game_manager.gd"))

	# === ENVIRONMENT ===
	var env_res = Environment.new()
	env_res.background_mode = Environment.BG_COLOR
	env_res.background_color = Color(0.45, 0.55, 0.7)
	env_res.ambient_light_source = Environment.AMBIENT_SOURCE_COLOR
	env_res.ambient_light_color = Color(0.3, 0.35, 0.4)
	env_res.ambient_light_energy = 0.5
	env_res.tonemap_mode = Environment.TONE_MAP_ACES
	env_res.fog_enabled = true
	env_res.fog_light_color = Color(0.5, 0.55, 0.65)
	env_res.fog_density = 0.005
	env_res.volumetric_fog_enabled = false
	env_res.glow_enabled = true
	env_res.glow_intensity = 0.3

	var world_env = WorldEnvironment.new()
	world_env.name = "WorldEnvironment"
	world_env.environment = env_res
	root.add_child(world_env)
	world_env.owner = root

	# === SUN ===
	var sun = DirectionalLight3D.new()
	sun.name = "Sun"
	sun.light_color = Color(1, 0.95, 0.85)
	sun.light_energy = 1.4
	sun.shadow_enabled = true
	sun.transform = Transform3D.IDENTITY.rotated(Vector3.RIGHT, -PI/3).rotated(Vector3.UP, PI/5)
	sun.position = Vector3(10, 20, 10)
	root.add_child(sun)
	sun.owner = root

	# Fill light
	var fill = DirectionalLight3D.new()
	fill.name = "FillLight"
	fill.light_color = Color(0.6, 0.7, 0.9)
	fill.light_energy = 0.3
	fill.shadow_enabled = false
	fill.transform = Transform3D.IDENTITY.rotated(Vector3.RIGHT, -PI/4).rotated(Vector3.UP, PI + PI/4)
	root.add_child(fill)
	fill.owner = root

	# === GROUND ===
	var ground = MeshInstance3D.new()
	ground.name = "Ground"
	var plane = PlaneMesh.new()
	plane.size = Vector2(100, 100)
	ground.mesh = plane
	var gmat = StandardMaterial3D.new()
	gmat.albedo_color = Color(0.25, 0.4, 0.2)
	gmat.roughness = 0.95
	ground.set_surface_override_material(0, gmat)
	ground.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_OFF
	root.add_child(ground)
	ground.owner = root

	# Ground collision
	var ground_body = StaticBody3D.new()
	ground_body.name = "GroundBody"
	var ground_col = CollisionShape3D.new()
	var ground_shape = BoxShape3D.new()
	ground_shape.size = Vector3(100, 0.1, 100)
	ground_col.shape = ground_shape
	ground_col.position.y = -0.05
	ground_body.add_child(ground_col)
	ground_col.owner = root
	root.add_child(ground_body)
	ground_body.owner = root

	# === PLAYER ===
	var player = CharacterBody3D.new()
	player.name = "Player"
	player.set_script(load("res://scripts/player.gd"))
	player.position = Vector3(-15, 1, 0)
	player.add_to_group("player")

	# Player body
	var pbody = MeshInstance3D.new()
	pbody.name = "PlayerBody"
	var pcap = CapsuleMesh.new()
	pcap.radius = 0.3
	pcap.height = 1.4
	pbody.mesh = pcap
	pbody.position.y = 0.7
	var pmat = StandardMaterial3D.new()
	pmat.albedo_color = Color(0.1, 0.3, 0.15)
	pbody.set_surface_override_material(0, pmat)
	pbody.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_ON
	player.add_child(pbody)
	pbody.owner = root

	# Player collision
	var pcol = CollisionShape3D.new()
	var pshape = CapsuleShape3D.new()
	pshape.radius = 0.35
	pshape.height = 1.6
	pcol.shape = pshape
	pcol.position.y = 0.8
	player.add_child(pcol)
	pcol.owner = root

	# Camera pivot
	var cam_pivot = Node3D.new()
	cam_pivot.name = "CameraPivot"
	cam_pivot.position.y = 1.6
	player.add_child(cam_pivot)
	cam_pivot.owner = root

	var cam = Camera3D.new()
	cam.name = "Camera3D"
	cam.fov = 75
	cam_pivot.add_child(cam)
	cam.owner = root

	# Sword pivot
	var sword_pivot = Node3D.new()
	sword_pivot.name = "SwordPivot"
	sword_pivot.position = Vector3(0.4, 1.0, -0.3)
	player.add_child(sword_pivot)
	sword_pivot.owner = root

	var sword = MeshInstance3D.new()
	var blade = BoxMesh.new()
	blade.size = Vector3(0.06, 0.9, 0.06)
	sword.mesh = blade
	sword.position.y = 0.45
	var smat = StandardMaterial3D.new()
	smat.albedo_color = Color(0.75, 0.75, 0.8)
	smat.metallic = 0.9
	smat.roughness = 0.2
	sword.set_surface_override_material(0, smat)
	sword_pivot.add_child(sword)
	sword.owner = root

	# Sword handle
	var handle = MeshInstance3D.new()
	var hm = CylinderMesh.new()
	hm.top_radius = 0.025
	hm.bottom_radius = 0.025
	hm.height = 0.15
	handle.mesh = hm
	handle.position.y = -0.02
	var hmat = StandardMaterial3D.new()
	hmat.albedo_color = Color(0.3, 0.15, 0.05)
	handle.set_surface_override_material(0, hmat)
	sword_pivot.add_child(handle)
	handle.owner = root

	# Crossguard
	var guard = MeshInstance3D.new()
	var gm = BoxMesh.new()
	gm.size = Vector3(0.2, 0.03, 0.05)
	guard.mesh = gm
	guard.position.y = 0.02
	guard.set_surface_override_material(0, smat)
	sword_pivot.add_child(guard)
	guard.owner = root

	root.add_child(player)
	player.owner = root

	# === FLAGS (3 capture points) ===
	var flag_positions = [Vector3(0, 0, 0), Vector3(15, 0, -12), Vector3(-5, 0, 15)]
	for i in flag_positions.size():
		var flag_node = Node3D.new()
		flag_node.name = "Flag%d" % i
		flag_node.set_script(load("res://scripts/flag.gd"))
		flag_node.position = flag_positions[i]
		flag_node.add_to_group("flags")

		# Pole
		var pole = MeshInstance3D.new()
		pole.name = "Pole"
		var pm = CylinderMesh.new()
		pm.top_radius = 0.03
		pm.bottom_radius = 0.04
		pm.height = 4.0
		pole.mesh = pm
		pole.position.y = 2.0
		var polmat = StandardMaterial3D.new()
		polmat.albedo_color = Color(0.4, 0.3, 0.2)
		pole.set_surface_override_material(0, polmat)
		flag_node.add_child(pole)
		pole.owner = root

		# Flag cloth
		var cloth = MeshInstance3D.new()
		cloth.name = "FlagCloth"
		var cm = BoxMesh.new()
		cm.size = Vector3(0.8, 0.5, 0.02)
		cloth.mesh = cm
		cloth.position = Vector3(0.4, 3.5, 0)
		var fmat = StandardMaterial3D.new()
		fmat.albedo_color = Color(0.5, 0.5, 0.5)
		cloth.set_surface_override_material(0, fmat)
		pole.add_child(cloth)
		cloth.owner = root

		# Capture zone visual (ring on ground)
		var ring = MeshInstance3D.new()
		var torus = TorusMesh.new()
		torus.inner_radius = 4.5
		torus.outer_radius = 5.0
		ring.mesh = torus
		ring.position.y = 0.05
		var rmat = StandardMaterial3D.new()
		rmat.albedo_color = Color(1, 1, 0, 0.3)
		rmat.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
		ring.set_surface_override_material(0, rmat)
		flag_node.add_child(ring)
		ring.owner = root

		root.add_child(flag_node)
		flag_node.owner = root

	# === OBSTACLES — Rocks, walls, trees ===
	var obstacles = [
		{"pos": Vector3(5, 0, -5), "type": "rock"},
		{"pos": Vector3(-8, 0, 8), "type": "rock"},
		{"pos": Vector3(12, 0, 5), "type": "wall"},
		{"pos": Vector3(-3, 0, -10), "type": "tree"},
		{"pos": Vector3(20, 0, -8), "type": "tree"},
		{"pos": Vector3(-12, 0, -5), "type": "tree"},
		{"pos": Vector3(8, 0, 12), "type": "rock"},
		{"pos": Vector3(25, 0, 0), "type": "wall"},
		{"pos": Vector3(-20, 0, 10), "type": "tree"},
		{"pos": Vector3(0, 0, -18), "type": "rock"},
	]

	for obs in obstacles:
		var body = StaticBody3D.new()
		body.position = obs.pos
		var mesh = MeshInstance3D.new()
		var col = CollisionShape3D.new()

		if obs.type == "rock":
			var rm = SphereMesh.new()
			rm.radius = 1.0 + randf() * 0.5
			mesh.mesh = rm
			mesh.scale = Vector3(1, 0.6, 1)
			mesh.position.y = 0.5
			var mat = StandardMaterial3D.new()
			mat.albedo_color = Color(0.45, 0.42, 0.38)
			mat.roughness = 0.95
			mesh.set_surface_override_material(0, mat)
			var cs = SphereShape3D.new()
			cs.radius = 1.2
			col.shape = cs
			col.position.y = 0.5

		elif obs.type == "wall":
			var bm = BoxMesh.new()
			bm.size = Vector3(6, 2, 0.5)
			mesh.mesh = bm
			mesh.position.y = 1
			var mat = StandardMaterial3D.new()
			mat.albedo_color = Color(0.4, 0.35, 0.28)
			mat.roughness = 0.9
			mesh.set_surface_override_material(0, mat)
			var cs = BoxShape3D.new()
			cs.size = Vector3(6, 2, 0.5)
			col.shape = cs
			col.position.y = 1

		elif obs.type == "tree":
			# Trunk
			var trunk = MeshInstance3D.new()
			var tm = CylinderMesh.new()
			tm.top_radius = 0.15
			tm.bottom_radius = 0.2
			tm.height = 3.0
			trunk.mesh = tm
			trunk.position.y = 1.5
			var tmat = StandardMaterial3D.new()
			tmat.albedo_color = Color(0.35, 0.2, 0.1)
			trunk.set_surface_override_material(0, tmat)
			trunk.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_ON
			body.add_child(trunk)
			trunk.owner = root
			# Leaves
			var leaves = MeshInstance3D.new()
			var lm = SphereMesh.new()
			lm.radius = 1.5
			leaves.mesh = lm
			leaves.position.y = 3.5
			leaves.scale = Vector3(1, 0.8, 1)
			var lmat = StandardMaterial3D.new()
			lmat.albedo_color = Color(0.15, 0.4, 0.15)
			leaves.set_surface_override_material(0, lmat)
			leaves.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_ON
			body.add_child(leaves)
			leaves.owner = root

			mesh.queue_free() # No separate mesh
			var cs = CylinderShape3D.new()
			cs.radius = 0.3
			cs.height = 3.0
			col.shape = cs
			col.position.y = 1.5

		body.add_child(mesh)
		mesh.owner = root
		body.add_child(col)
		col.owner = root
		mesh.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_ON
		root.add_child(body)
		body.owner = root

	# Save scene
	var packed = PackedScene.new()
	packed.pack(root)
	ResourceSaver.save(packed, "res://scenes/main.tscn")
	print("✅ Scene created! Go to Scene > Reload Current Scene to see it.")
