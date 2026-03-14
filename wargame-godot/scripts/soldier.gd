extends CharacterBody3D

var team := 0
var hp := 50
var move_speed := 3.0
var attack_range := 2.2
var attack_dmg := 10
var can_attack := true
var cd := 0.0
var target: Node3D = null
var wander_pos := Vector3.ZERO
var wander_cd := 0.0
var dead := false

func _ready():
	wander_pos = global_position + Vector3(randf_range(-10,10), 0, randf_range(-10,10))

func _physics_process(delta):
	if dead:
		return
	if not is_on_floor():
		velocity.y -= 18.0 * delta

	# Find target
	target = null
	var best_dist := 18.0
	var search_group = "allies" if team == 1 else "enemies"
	for n in get_tree().get_nodes_in_group(search_group):
		if n == self:
			continue
		var d = global_position.distance_to(n.global_position)
		if d < best_dist:
			best_dist = d
			target = n
	# Enemy also targets player
	if team == 1:
		for p in get_tree().get_nodes_in_group("player"):
			var d = global_position.distance_to(p.global_position)
			if d < best_dist:
				best_dist = d
				target = p

	# Attack cooldown
	if not can_attack:
		cd -= delta
		if cd <= 0:
			can_attack = true

	if target and is_instance_valid(target):
		var dist = global_position.distance_to(target.global_position)
		if dist < attack_range and can_attack:
			can_attack = false
			cd = 0.8 + randf() * 0.4
			if target.has_method("take_hit"):
				target.take_hit(attack_dmg)
		elif dist < 18.0:
			var dir = (target.global_position - global_position).normalized()
			dir.y = 0
			velocity.x = dir.x * move_speed
			velocity.z = dir.z * move_speed
			look_at(Vector3(target.global_position.x, global_position.y, target.global_position.z), Vector3.UP)
		else:
			wander(delta)
	else:
		wander(delta)

	move_and_slide()

func wander(delta):
	wander_cd -= delta
	if wander_cd <= 0:
		wander_cd = randf_range(2, 5)
		wander_pos = global_position + Vector3(randf_range(-8,8), 0, randf_range(-8,8))
	var dir = (wander_pos - global_position).normalized()
	dir.y = 0
	velocity.x = dir.x * move_speed * 0.4
	velocity.z = dir.z * move_speed * 0.4

func take_hit(dmg):
	hp -= dmg
	# Flash
	if has_node("Body"):
		var mat = $Body.get_surface_override_material(0)
		if mat:
			var orig = mat.albedo_color
			mat.albedo_color = Color(1, 0.3, 0.3)
			get_tree().create_timer(0.1).timeout.connect(func(): if is_instance_valid(self) and mat: mat.albedo_color = orig)
	if hp <= 0:
		die()

func die():
	dead = true
	remove_from_group("allies")
	remove_from_group("enemies")
	# Fall over
	var tw = create_tween()
	tw.tween_property(self, "rotation:x", -PI/2, 0.4)
	get_tree().create_timer(2.0).timeout.connect(func(): if is_instance_valid(self): queue_free())
