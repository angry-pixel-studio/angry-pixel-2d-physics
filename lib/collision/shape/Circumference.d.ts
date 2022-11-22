import { Vector2, Rectangle } from "angry-pixel-math";
import { IShape, ShapeType } from "./IShape";
export declare class Circumference implements IShape {
    radius: number;
    readonly type: ShapeType;
    readonly boundingBox: Rectangle;
    readonly vertices: Vector2[];
    readonly projectionAxes: Vector2[];
    rotation: number;
    protected _position: Vector2;
    set position(value: Vector2);
    get position(): Vector2;
    constructor(radius: number);
    update(): void;
    private updateBoundingBox;
}
