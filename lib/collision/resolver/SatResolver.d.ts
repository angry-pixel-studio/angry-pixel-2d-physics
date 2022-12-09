import { ICollisionResolution } from "../ICollisionResolution";
import { IShape } from "../shape/IShape";
import { ICollisionResolver } from "./ICollisionResolver";
export declare class SatResolver implements ICollisionResolver {
    private axes;
    private projA;
    private projB;
    private currentOverlap;
    private minOverlap;
    private smallestAxis;
    private invertAxis;
    private distance;
    private cache;
    resolve(shapeA: IShape, shapeB: IShape): ICollisionResolution | null;
    private projectShapeOntoAxis;
    private setCircumferenceAxis;
    private setCircumferenceVertices;
}
