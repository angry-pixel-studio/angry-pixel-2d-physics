import { ICollisionResolution } from "../ICollisionResolution";
import { IShape } from "../shape/IShape";
import { ICollisionMethod } from "./ICollisionMethod";
import { AABBResolver } from "../resolver/AABBResolver";
import { CircumferenceAABBResolver } from "../resolver/CircumferenceAABBResolver";
import { CircumferenceResolver } from "../resolver/CircumferenceResolver";
export declare class AABBMethod implements ICollisionMethod {
    private readonly AABBResolver;
    private readonly circumferenceAABBResolver;
    private readonly circumferenceResolver;
    constructor(AABBResolver: AABBResolver, circumferenceAABBResolver: CircumferenceAABBResolver, circumferenceResolver: CircumferenceResolver);
    getCollisionResolution(shapeA: IShape, shapeB: IShape): ICollisionResolution | null;
}
