import { Polygon } from "./Polygon";
export declare class Rectangle extends Polygon {
    width: number;
    height: number;
    constructor(width: number, height: number);
    updateSize(width: number, height: number): void;
    protected updateProjectionAxes(): void;
}
