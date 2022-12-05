import { Rectangle } from "angry-pixel-math";
import { CollisionMatrix } from "./collision/CollisionManager";
import { CollisionMethods } from "./collision/method/ICollisionMethod";
import { IPhysicsManager } from "./PhysicsManager";
export { IPhysicsManager } from "./PhysicsManager";
export { IColliderDto } from "./collision/ColliderFactory";
export { ICollider } from "./collision/ICollider";
export { ICollision } from "./collision/ICollision";
export { ICollisionResolution } from "./collision/ICollisionResolution";
export { CollisionMethods } from "./collision/method/ICollisionMethod";
export { Circumference } from "./collision/shape/Circumference";
export { Line } from "./collision/shape/Line";
export { Polygon } from "./collision/shape/Polygon";
export { Rectangle } from "./collision/shape/Rectangle";
export { IRigidBodyDto } from "./rigidBody/RigidBodyFactory";
export { IRigidBody, RigidBodyType } from "./rigidBody/IRigidBody";
export interface PhysicsManagerOptions {
    collisionMethod?: CollisionMethods;
    collisionMatrix?: CollisionMatrix;
    collisionArea?: Rectangle;
}
export declare const physicsManagerFactory: ({ collisionArea, collisionMatrix, collisionMethod, }?: PhysicsManagerOptions) => IPhysicsManager;
