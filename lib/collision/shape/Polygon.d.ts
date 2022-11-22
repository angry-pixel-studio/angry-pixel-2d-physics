import { Rectangle, Vector2 } from "angry-pixel-math";
import { IShape, ShapeType } from "./IShape";
export declare class Polygon implements IShape {
    vertexModel: Vector2[];
    readonly type: ShapeType;
    readonly vertices: Vector2[];
    readonly boundingBox: Rectangle;
    rotation: number;
    protected _projectionAxes: Vector2[];
    protected _position: Vector2;
    private boxMinX;
    private boxMinY;
    private boxMaxX;
    private boxMaxY;
    constructor(vertexModel: Vector2[]);
    set position(value: Vector2);
    get position(): Vector2;
    get projectionAxes(): Vector2[];
    update(): void;
    private updateVertices;
    private updateBoundingBox;
    protected updateProjectionAxes(): void;
}
