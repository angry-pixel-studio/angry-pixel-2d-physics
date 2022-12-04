import { Vector2 } from "angry-pixel-math";
import { ICollisionResolution } from "./ICollisionResolution";
import { IShape } from "./shape/IShape";

export interface ICollider {
    id: number;
    active: boolean;
    shape: IShape;
    position: Vector2;
    rotation: number;
    layer: string;
    updateCollisions: boolean;
    physics: boolean;
    group?: string;
    onCollision?: (resolution: ICollisionResolution) => void;
}
