import { ICollisionResolution } from "../ICollisionResolution";
import { IShape } from "../shape/IShape";

export enum CollisionMethods {
    AABB,
    SAT,
}

export interface ICollisionMethod {
    getCollisionResolution(shapeA: IShape, shapeB: IShape): ICollisionResolution | null;
}
