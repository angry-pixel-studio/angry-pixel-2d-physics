import { Circumference } from "../shape/Circumference";
import { ICollisionResolution } from "../ICollisionResolution";
import { ICollisionResolver } from "./ICollisionResolver";
export declare class CircumferenceResolver implements ICollisionResolver {
    private distance;
    private direction;
    resolve(shapeA: Circumference, shapeB: Circumference): ICollisionResolution;
}
