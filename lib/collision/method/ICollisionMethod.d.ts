import { ICollisionResolution } from "../ICollisionResolution";
import { IShape } from "../shape/IShape";
export declare enum CollisionMethods {
    AABB = 0,
    SAT = 1
}
export interface ICollisionMethod {
    getCollisionResolution(shapeA: IShape, shapeB: IShape): ICollisionResolution | null;
}
