import { Rectangle } from "angry-pixel-math";
import { ICollisionMethod } from "./method/ICollisionMethod";
import { ICollider } from "./ICollider";
import { ICollision } from "./ICollision";
export interface ICollisionManager {
    addCollider(collider: ICollider): void;
    removeCollider(collider: ICollider): void;
    clearColliders(): void;
    resolve(): void;
    getCollisionsForCollider(collider: ICollider): ICollision[];
    refreshCollisionsForCollider(collider: ICollider): void;
}
export declare type CollisionMatrix = [string, string][];
export declare class CollisionManager implements ICollisionManager {
    private colliders;
    private quadTree;
    private quadTreeArea;
    private fixedQuadTree;
    private method;
    private collisions;
    private collisionMatrix;
    private minArea;
    private maxArea;
    private newArea;
    constructor(method: ICollisionMethod, quadTreeArea?: Rectangle, collisionMatrix?: CollisionMatrix);
    private setupQuadTree;
    addCollider(collider: ICollider): void;
    removeCollider(collider: ICollider): void;
    clearColliders(): void;
    getCollisionsForCollider(collider: ICollider): ICollision[];
    refreshCollisionsForCollider(collider: ICollider): void;
    resolve(): void;
    private updateShapes;
    private updateNewArea;
    private updateCollisions;
    private broadPhase;
    private narrowPhase;
    private isResolved;
}
