import { Circumference } from "../shape/Circumference";
import { Rectangle } from "../shape/Rectangle";
import { ICollisionResolution } from "../ICollisionResolution";
import { ICollisionResolver } from "./ICollisionResolver";
export declare class CircumferenceAABBResolver implements ICollisionResolver {
    private closestPoint;
    private distance;
    private direction;
    resolve(shapeA: Circumference, shapeB: Rectangle, invert?: boolean): ICollisionResolution;
}
