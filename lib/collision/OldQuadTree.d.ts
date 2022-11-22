import { Rectangle } from "angry-pixel-math";
export declare const DEFAULT_MAX_ITEMS: number;
export declare const DEFAULT_MAX_LEVELS: number;
export interface QuadItem {
    x: number;
    y: number;
    x1: number;
    y1: number;
}
export declare class QuadTree {
    private _bounds;
    private _items;
    private _quadrants;
    private readonly maxLevels;
    private readonly maxItems;
    private readonly level;
    private readonly sw;
    private readonly se;
    private readonly nw;
    private readonly ne;
    private center;
    private childrenWidth;
    private childrenHeight;
    private quadsForItem;
    constructor(level: number, bounds: Rectangle, maxLevels?: number, maxItems?: number);
    get bounds(): Rectangle;
    get quadrants(): QuadTree[];
    updateBounds(bounds: Rectangle): void;
    clearItems(): void;
    clearQuadrants(): void;
    addItem(item: QuadItem): void;
    retrieve<T extends QuadItem>(item: QuadItem): T[];
    private splitQuad;
    private getChildrenQuadrantForItem;
    private insertItemIntoChildrenQuads;
    private updateCache;
}
