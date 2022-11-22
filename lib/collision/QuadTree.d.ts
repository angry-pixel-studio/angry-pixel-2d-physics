import { Rectangle } from "angry-pixel-math";
export declare class QuadTree {
    private depth;
    private area;
    private childrenArea;
    private children;
    private items;
    constructor(area: Rectangle, depth?: number);
    resize(area: Rectangle): void;
    clear(): void;
    insert(item: unknown, area: Rectangle): void;
    retrieve<T>(area: Rectangle, items?: T[]): T[];
}
