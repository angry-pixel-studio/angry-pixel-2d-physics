import { ICollisionResolution } from "../ICollisionResolution";
import { IShape, ShapeType } from "../shape/IShape";
import { ICollisionMethod } from "./ICollisionMethod";
import { CircumferenceResolver } from "../resolver/CircumferenceResolver";
import { Circumference } from "../shape/Circumference";
import { SatResolver } from "../resolver/SatResolver";

export class SatMethod implements ICollisionMethod {
    constructor(
        private readonly circumferenceResolver: CircumferenceResolver,
        private readonly satResolver: SatResolver
    ) {}

    public getCollisionResolution(shapeA: IShape, shapeB: IShape): ICollisionResolution | null {
        if (shapeA.type === ShapeType.Circumference && shapeB.type === ShapeType.Circumference) {
            return this.circumferenceResolver.resolve(shapeA as Circumference, shapeB as Circumference);
        } else {
            return this.satResolver.resolve(shapeA, shapeB);
        }
    }
}
