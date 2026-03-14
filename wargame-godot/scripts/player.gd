extends CharacterBody3D

var speed := 7.0
var sprint_speed := 12.0
var mouse_sens := 0.003
var hp := 100
var kills := 0
var can_attack := true
var attack_cd := 0.0
var swing := 0.0

func _ready():
	Input.mouse_mode = Input.MOUSE_MODE_CAPTURED

func _input(event):
	if event is InputEventMouseMotion and Input.mouse_mode == Input.MOUSE_MODE_CAPTURED:
		rotate_y(-event.relative.x * mouse_sens)
		$CameraPivot.rotate_x(-event.relative.y * mouse_sens)
		$CameraPivot.rotation.x = clamp($CameraPivot.rotation.x, -1.2, 1.0)
	if event is InputEventKey and event.keycode == KEY_ESCAPE:
		Input.mouse_mode = Input.MOUSE_MODE_VISIBLE

func _physics_process(delta):
	if not is_on_floor():
		velocity.y -= 18.0 * delta

	var dir := Vector2.ZERO
	if Input.is_key_pressed(KEY_W): dir.y -= 1
	if Input.is_key_pressed(KEY_S): dir.y += 1
	if Input.is_key_pressed(KEY_A): dir.x -= 1
	if Input.is_key_pressed(KEY_D): dir.x += 1
	dir = dir.normalized()

	var spd = sprint_speed if Input.is_key_pressed(KEY_SPACE) else speed
	var move = (transform.basis * Vector3(dir.x, 0, dir.y)).normalized()
	velocity.x = move.x * spd if move else move_toward(velocity.x, 0, spd * delta * 8)
	velocity.z = move.z * spd if move else move_toward(velocity.z, 0, spd * delta * 8)
	move_and_slide()

	# Attack
	if Input.is_mouse_button_pressed(MOUSE_BUTTON_LEFT) and can_attack:
		can_attack = false
		attack_cd = 0.5
		swing = 1.0
		# Hit enemies in front
		for body in get_tree().get_nodes_in_group("enemies"):
			if global_position.distance_to(body.global_position) < 2.5:
				var to_enemy = (body.global_position - global_position).normalized()
				if to_enemy.dot(-global_transform.basis.z) > 0.3:
					if body.has_method("take_hit"):
						body.take_hit(25)
						kills += 1
					break

	if not can_attack:
		attack_cd -= delta
		if attack_cd <= 0:
			can_attack = true

	# Sword swing anim
	if swing > 0:
		swing -= delta * 4
		$SwordPivot.rotation.x = -swing * 1.5
	else:
		$SwordPivot.rotation.x = lerp($SwordPivot.rotation.x, 0.0, delta * 5)

func take_hit(dmg):
	if Input.is_mouse_button_pressed(MOUSE_BUTTON_RIGHT):
		dmg = int(dmg * 0.2)
	hp -= dmg
	if hp <= 0:
		hp = 0
