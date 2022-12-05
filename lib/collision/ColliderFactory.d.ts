import { Vector2 } from "angry-pixel-math";
import { ICollider } from "./ICollider";
import { ICollisionResolution } from "./ICollisionResolution";
import { IShape } from "./shape/IShape";
export interface IColliderDto {
    shape: IShape;
    layer: string;
    updateCollisions: boolean;
    physics: boolean;
    position?: Vector2;
    rotation?: number;
    group?: string;
    onCollision?: (resolution: ICollisionResolution) => void;
}
export interface IColliderFactory {
    create(dto: IColliderDto): ICollider;
}
export declare class ColliderFactory implements IColliderFactory {
    private lastId;
    create({ shape, layer, updateCollisions, physics, position, rotation, group, onCollision, }: IColliderDto): ICollider;
}
