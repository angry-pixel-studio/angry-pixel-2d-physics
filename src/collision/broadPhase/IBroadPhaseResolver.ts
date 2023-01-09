import { Rectangle } from "angry-pixel-math";

export enum BroadPhaseMethods {
    QuadTree,
    SpartialGrid,
}

export interface IBroadPhaseResolver {
    resize(area: Rectangle): void;
    clear(): void;
    insert(item: unknown, area: Rectangle): void;
    retrieve<T extends unknown>(area: Rectangle): T[];
}
