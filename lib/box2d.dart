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

import 'args';
import 'dart:collection';
import 'dart:math' as Math;

part 'src/callbacks/PairCallback.dart';
part 'src/callbacks/TreeCallback.dart';
part 'src/callbacks/ContactListener.dart';
part 'src/callbacks/ContactFilter.dart';
part 'src/callbacks/ContactImpulse.dart';
part 'src/callbacks/QueryCallback.dart';
part 'src/callbacks/DebugDraw.dart';
part 'src/callbacks/DestructionListener.dart';
part 'src/collision/AxisAlignedBox.dart';
part 'src/collision/Collision.dart';
part 'src/collision/ContactID.dart';
part 'src/collision/Distance.dart';
part 'src/collision/DistanceInput.dart';
part 'src/collision/DistanceOutput.dart';
part 'src/collision/DistanceProxy.dart';
part 'src/collision/Features.dart';
part 'src/collision/Manifold.dart';
part 'src/collision/ManifoldPoint.dart';
part 'src/collision/ManifoldType.dart';
part 'src/collision/PointState.dart';
part 'src/collision/Simplex.dart';
part 'src/collision/SimplexCache.dart';
part 'src/collision/SimplexVertex.dart';
part 'src/collision/TimeOfImpact.dart';
part 'src/collision/WorldManifold.dart';
part 'src/collision/broadphase/BroadPhase.dart';
part 'src/collision/broadphase/DynamicTree.dart';
part 'src/collision/broadphase/DynamicTreeNode.dart';
part 'src/collision/broadphase/Pair.dart';
part 'src/collision/shapes/CircleShape.dart';
part 'src/collision/shapes/MassData.dart';
part 'src/collision/shapes/PolygonShape.dart';
part 'src/collision/shapes/Shape.dart';
part 'src/collision/shapes/ShapeType.dart';
part 'src/common/Color3.dart';
part 'src/common/IViewportTransform.dart';
part 'src/common/MathBox.dart';
part 'src/common/Matrix22.dart';
part 'src/common/Matrix33.dart';
part 'src/common/Settings.dart';
part 'src/common/Sweep.dart';
part 'src/common/Transform.dart';
part 'src/common/Vector.dart';
part 'src/common/Vector3.dart';
part 'src/dynamics/Body.dart';
part 'src/dynamics/BodyDef.dart';
part 'src/dynamics/BodyType.dart';
part 'src/dynamics/ContactManager.dart';
part 'src/dynamics/Filter.dart';
part 'src/dynamics/Fixture.dart';
part 'src/dynamics/FixtureDef.dart';
part 'src/dynamics/Island.dart';
part 'src/dynamics/TimeStep.dart';
part 'src/dynamics/World.dart';
part 'src/dynamics/contacts/Contact.dart';
part 'src/dynamics/contacts/ContactConstraint.dart';
part 'src/dynamics/contacts/ContactConstraintPoint.dart';
part 'src/dynamics/contacts/ContactEdge.dart';
part 'src/dynamics/contacts/ContactCreator.dart';
part 'src/dynamics/contacts/CircleContact.dart';
part 'src/dynamics/contacts/ContactRegister.dart';
part 'src/dynamics/contacts/ContactSolver.dart';
part 'src/dynamics/contacts/PolygonAndCircleContact.dart';
part 'src/dynamics/contacts/PolygonContact.dart';
part 'src/dynamics/contacts/TimeOfImpactSolver.dart';
part 'src/dynamics/contacts/TimeOfImpactConstraint.dart';
part 'src/dynamics/joints/Joint.dart';
part 'src/dynamics/joints/JointEdge.dart';
part 'src/dynamics/joints/JointDef.dart';
part 'src/dynamics/joints/JointType.dart';
part 'src/dynamics/joints/LimitState.dart';
part 'src/dynamics/joints/ConstantVolumeJoint.dart';
part 'src/dynamics/joints/ConstantVolumeJointDef.dart';
part 'src/dynamics/joints/DistanceJoint.dart';
part 'src/dynamics/joints/DistanceJointDef.dart';
part 'src/dynamics/joints/FrictionJoint.dart';
part 'src/dynamics/joints/FrictionJointDef.dart';
part 'src/dynamics/joints/RevoluteJoint.dart';
part 'src/dynamics/joints/RevoluteJointDef.dart';
part 'src/pooling/DefaultWorldPool.dart';
