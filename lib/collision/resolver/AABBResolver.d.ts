import { ICollisionResolution } from "../ICollisionResolution";
import { IShape } from "../shape/IShape";
import { ICollisionResolver } from "./ICollisionResolver";
export declare class AABBResolver implements ICollisionResolver {
    private overlapX;
    private overlapY;
    private minOverlap;
    private direction;
    private displacementDirection;
    resolve({ boundingBox: boxA }: IShape, { boundingBox: boxB }: IShape): ICollisionResolution | null;
    private preventContainment;
}
