import { Rectangle, Vector2 } from "angry-pixel-math";
import { IShape, ShapeType } from "./IShape";
export declare class Line implements IShape {
    vertexModel: [Vector2, Vector2];
    readonly type: ShapeType;
    readonly vertices: Vector2[];
    readonly projectionAxes: Vector2[];
    readonly boundingBox: Rectangle;
    rotation: number;
    private _position;
    constructor(vertexModel: [Vector2, Vector2]);
    update(): void;
    set position(value: Vector2);
    get position(): Vector2;
    private updateVertices;
    private updateBoundingBox;
    private updateProjectionAxes;
}
