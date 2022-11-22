import { Rectangle } from "angry-pixel-math";
import { CollisionManager, CollisionMatrix } from "./collision/CollisionManager";
import { AABBMethod } from "./collision/method/AABBMethod";
import { CollisionMethods } from "./collision/method/ICollisionMethod";
import { SatMethod } from "./collision/method/SatMethod";
import { AABBResolver } from "./collision/resolver/AABBResolver";
import { CircumferenceAABBResolver } from "./collision/resolver/CircumferenceAABBResolver";
import { CircumferenceResolver } from "./collision/resolver/CircumferenceResolver";
import { SatResolver } from "./collision/resolver/SatResolver";
import { IPhysicsManager, PhysicsManager } from "./PhysicsManager";

export { IPhysicsManager } from "./PhysicsManager";
export { ICollider } from "./collision/ICollider";
export { ICollision } from "./collision/ICollision";
export { ICollisionResolution } from "./collision/ICollisionResolution";
export { Circumference } from "./collision/shape/Circumference";
export { Line } from "./collision/shape/Line";
export { Polygon } from "./collision/shape/Polygon";
export { Rectangle } from "./collision/shape/Rectangle";

export interface PhysicsManagerOptions {
    collisionMethod?: CollisionMethods;
    collisionMatrix?: CollisionMatrix;
    collisionArea?: Rectangle;
}

export const physicsManagerFactory = ({
    collisionArea,
    collisionMatrix,
    collisionMethod,
}: PhysicsManagerOptions = {}): IPhysicsManager => {
    const circumferenceResolver = new CircumferenceResolver();

    const selectedMethod =
        collisionMethod === CollisionMethods.AABB
            ? new AABBMethod(new AABBResolver(), new CircumferenceAABBResolver(), circumferenceResolver)
            : new SatMethod(circumferenceResolver, new SatResolver());

    const collisionManager = new CollisionManager(selectedMethod, collisionArea, collisionMatrix);

    return new PhysicsManager(collisionManager);
};
