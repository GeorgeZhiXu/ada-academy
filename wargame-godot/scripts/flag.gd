extends Node3D

@export var capture_radius := 5.0
@export var capture_time := 3.0

var owner_team := -1 # -1 = neutral, 0 = blue, 1 = red
var capture_progress := 0.0
var capturing_team := -1

signal flag_captured(flag, team)

func _process(delta):
	# Count nearby soldiers for each team
	var blue_count := 0
	var red_count := 0

	for body in get_tree().get_nodes_in_group("allies"):
		if body.global_position.distance_to(global_position) < capture_radius:
			blue_count += 1

	for body in get_tree().get_nodes_in_group("enemies"):
		if body.global_position.distance_to(global_position) < capture_radius:
			red_count += 1

	# Player counts for blue
	var player = get_tree().get_first_node_in_group("player")
	if player and player.global_position.distance_to(global_position) < capture_radius:
		blue_count += 2 # Player counts double

	# Determine capturing team
	if blue_count > red_count and owner_team != 0:
		capturing_team = 0
		capture_progress += delta / capture_time
	elif red_count > blue_count and owner_team != 1:
		capturing_team = 1
		capture_progress += delta / capture_time
	else:
		capture_progress = move_toward(capture_progress, 0, delta / capture_time)
		capturing_team = -1

	if capture_progress >= 1.0:
		owner_team = capturing_team
		capture_progress = 0.0
		emit_signal("flag_captured", self, owner_team)
		update_visuals()

	# Rotate flag
	if has_node("FlagMesh"):
		$FlagMesh.rotation.y += delta * 0.5

func update_visuals():
	if has_node("Pole/FlagCloth"):
		var mat = $Pole/FlagCloth.get_surface_override_material(0)
		if mat:
			match owner_team:
				0: mat.albedo_color = Color(0.2, 0.4, 0.9)
				1: mat.albedo_color = Color(0.9, 0.2, 0.2)
				_: mat.albedo_color = Color(0.5, 0.5, 0.5)
