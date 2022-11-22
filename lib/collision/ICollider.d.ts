import { Vector2 } from "angry-pixel-math";
import { ICollisionResolution } from "./ICollisionResolution";
import { IShape } from "./shape/IShape";
export interface ICollider {
    shape: IShape;
    position: Vector2;
    rotation: number;
    layer: string;
    updateCollisions: boolean;
    group?: string;
    rigidBody?: boolean;
    onCollision?: (resolution: ICollisionResolution) => void;
}
