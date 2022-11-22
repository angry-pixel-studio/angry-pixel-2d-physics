import { ICollisionResolution } from "../ICollisionResolution";
import { IShape } from "../shape/IShape";
import { ICollisionMethod } from "./ICollisionMethod";
import { CircumferenceResolver } from "../resolver/CircumferenceResolver";
import { SatResolver } from "../resolver/SatResolver";
export declare class SatMethod implements ICollisionMethod {
    private readonly circumferenceResolver;
    private readonly satResolver;
    constructor(circumferenceResolver: CircumferenceResolver, satResolver: SatResolver);
    getCollisionResolution(shapeA: IShape, shapeB: IShape): ICollisionResolution | null;
}
