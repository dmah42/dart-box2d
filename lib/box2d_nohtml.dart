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
#library('box2d_nohtml');

#import('dart:math', prefix: 'Math');

#source('src/callbacks/PairCallback.dart');
#source('src/callbacks/TreeCallback.dart');
#source('src/callbacks/ContactListener.dart');
#source('src/callbacks/ContactFilter.dart');
#source('src/callbacks/ContactImpulse.dart');
#source('src/callbacks/QueryCallback.dart');
#source('src/callbacks/DebugDraw.dart');
#source('src/callbacks/DestructionListener.dart');
#source('src/collision/AxisAlignedBox.dart');
#source('src/collision/Collision.dart');
#source('src/collision/ContactID.dart');
#source('src/collision/Distance.dart');
#source('src/collision/DistanceInput.dart');
#source('src/collision/DistanceOutput.dart');
#source('src/collision/DistanceProxy.dart');
#source('src/collision/Features.dart');
#source('src/collision/Manifold.dart');
#source('src/collision/ManifoldPoint.dart');
#source('src/collision/ManifoldType.dart');
#source('src/collision/PointState.dart');
#source('src/collision/Simplex.dart');
#source('src/collision/SimplexCache.dart');
#source('src/collision/SimplexVertex.dart');
#source('src/collision/TimeOfImpact.dart');
#source('src/collision/WorldManifold.dart');
#source('src/collision/broadphase/BroadPhase.dart');
#source('src/collision/broadphase/DynamicTree.dart');
#source('src/collision/broadphase/DynamicTreeNode.dart');
#source('src/collision/broadphase/Pair.dart');
#source('src/collision/shapes/CircleShape.dart');
#source('src/collision/shapes/MassData.dart');
#source('src/collision/shapes/PolygonShape.dart');
#source('src/collision/shapes/Shape.dart');
#source('src/collision/shapes/ShapeType.dart');
#source('src/common/Color3.dart');
#source('src/common/IViewportTransform.dart');
#source('src/common/MathBox.dart');
#source('src/common/Matrix22.dart');
#source('src/common/Matrix33.dart');
#source('src/common/Settings.dart');
#source('src/common/Sweep.dart');
#source('src/common/Transform.dart');
#source('src/common/Vector.dart');
#source('src/common/Vector3.dart');
#source('src/dynamics/Body.dart');
#source('src/dynamics/BodyDef.dart');
#source('src/dynamics/BodyType.dart');
#source('src/dynamics/ContactManager.dart');
#source('src/dynamics/Filter.dart');
#source('src/dynamics/Fixture.dart');
#source('src/dynamics/FixtureDef.dart');
#source('src/dynamics/Island.dart');
#source('src/dynamics/TimeStep.dart');
#source('src/dynamics/World.dart');
#source('src/dynamics/contacts/Contact.dart');
#source('src/dynamics/contacts/ContactConstraint.dart');
#source('src/dynamics/contacts/ContactConstraintPoint.dart');
#source('src/dynamics/contacts/ContactEdge.dart');
#source('src/dynamics/contacts/ContactCreator.dart');
#source('src/dynamics/contacts/CircleContact.dart');
#source('src/dynamics/contacts/ContactRegister.dart');
#source('src/dynamics/contacts/ContactSolver.dart');
#source('src/dynamics/contacts/PolygonAndCircleContact.dart');
#source('src/dynamics/contacts/PolygonContact.dart');
#source('src/dynamics/contacts/TimeOfImpactSolver.dart');
#source('src/dynamics/contacts/TimeOfImpactConstraint.dart');
#source('src/dynamics/joints/Joint.dart');
#source('src/dynamics/joints/JointEdge.dart');
#source('src/dynamics/joints/JointDef.dart');
#source('src/dynamics/joints/JointType.dart');
#source('src/dynamics/joints/LimitState.dart');
#source('src/dynamics/joints/ConstantVolumeJoint.dart');
#source('src/dynamics/joints/ConstantVolumeJointDef.dart');
#source('src/dynamics/joints/DistanceJoint.dart');
#source('src/dynamics/joints/DistanceJointDef.dart');
#source('src/dynamics/joints/FrictionJoint.dart');
#source('src/dynamics/joints/FrictionJointDef.dart');
#source('src/dynamics/joints/RevoluteJoint.dart');
#source('src/dynamics/joints/RevoluteJointDef.dart');
#source('src/pooling/DefaultWorldPool.dart');
