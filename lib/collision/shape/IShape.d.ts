import { Rectangle, Vector2 } from "angry-pixel-math";
export declare enum ShapeType {
    Polygon = 0,
    Circumference = 1,
    Line = 2
}
export interface IShape {
    type: ShapeType;
    position: Vector2;
    rotation: number;
    boundingBox: Rectangle;
    vertices: Vector2[];
    projectionAxes: Vector2[];
    update(): void;
}
