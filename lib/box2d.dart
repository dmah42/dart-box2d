// Copyright 2012 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

library box2d;

import 'dart:collection';
import 'dart:math' as Math;
import 'package:vector_math/vector_math.dart';

export 'package:vector_math/vector_math.dart';


part 'src/callbacks/debug_draw.dart';
part 'src/callbacks/destruction_listener.dart';
part 'src/callbacks/contact_filter.dart';
part 'src/callbacks/contact_impulse.dart';
part 'src/callbacks/contact_listener.dart';
part 'src/callbacks/query_callback.dart';
part 'src/callbacks/tree_callback.dart';
part 'src/collision/collision.dart';
part 'src/collision/contact_id.dart';
part 'src/collision/distance.dart';
part 'src/collision/distance_input.dart';
part 'src/collision/distance_output.dart';
part 'src/collision/distance_proxy.dart';
part 'src/collision/features.dart';
part 'src/collision/manifold.dart';
part 'src/collision/manifold_point.dart';
part 'src/collision/manifold_type.dart';
part 'src/collision/point_state.dart';
part 'src/collision/simplex.dart';
part 'src/collision/simplex_cache.dart';
part 'src/collision/simplex_vertex.dart';
part 'src/collision/time_of_impact.dart';
part 'src/collision/world_manifold.dart';
part 'src/collision/broadphase/broadphase.dart';
part 'src/collision/broadphase/dynamic_tree.dart';
part 'src/collision/broadphase/dynamic_tree_node.dart';
part 'src/collision/broadphase/pair.dart';
part 'src/collision/shapes/circle_shape.dart';
part 'src/collision/shapes/mass_data.dart';
part 'src/collision/shapes/polygon_shape.dart';
part 'src/collision/shapes/shape.dart';
part 'src/collision/shapes/shape_type.dart';
part 'src/common/color3.dart';
part 'src/common/math_box.dart';
part 'src/common/settings.dart';
part 'src/common/sweep.dart';
part 'src/common/transform.dart';
part 'src/common/viewport_transform.dart';
part 'src/dynamics/body.dart';
part 'src/dynamics/body_def.dart';
part 'src/dynamics/body_type.dart';
part 'src/dynamics/contact_manager.dart';
part 'src/dynamics/filter.dart';
part 'src/dynamics/fixture.dart';
part 'src/dynamics/fixture_def.dart';
part 'src/dynamics/island.dart';
part 'src/dynamics/timestep.dart';
part 'src/dynamics/world.dart';
part 'src/dynamics/contacts/contact.dart';
part 'src/dynamics/contacts/contact_constraint.dart';
part 'src/dynamics/contacts/contact_constraint_point.dart';
part 'src/dynamics/contacts/contact_edge.dart';
part 'src/dynamics/contacts/contact_creator.dart';
part 'src/dynamics/contacts/circle_contact.dart';
part 'src/dynamics/contacts/contact_register.dart';
part 'src/dynamics/contacts/contact_solver.dart';
part 'src/dynamics/contacts/polygon_and_circle_contact.dart';
part 'src/dynamics/contacts/polygon_contact.dart';
part 'src/dynamics/contacts/time_of_impact_solver.dart';
part 'src/dynamics/contacts/time_of_impact_constraint.dart';
part 'src/dynamics/joints/joint.dart';
part 'src/dynamics/joints/joint_edge.dart';
part 'src/dynamics/joints/joint_def.dart';
part 'src/dynamics/joints/joint_type.dart';
part 'src/dynamics/joints/limit_state.dart';
part 'src/dynamics/joints/constant_volume_joint.dart';
part 'src/dynamics/joints/constant_volume_joint_def.dart';
part 'src/dynamics/joints/distance_joint.dart';
part 'src/dynamics/joints/distance_joint_def.dart';
part 'src/dynamics/joints/friction_joint.dart';
part 'src/dynamics/joints/friction_joint_def.dart';
part 'src/dynamics/joints/revolute_joint.dart';
part 'src/dynamics/joints/revolute_joint_def.dart';
part 'src/pooling/default_world_pool.dart';
