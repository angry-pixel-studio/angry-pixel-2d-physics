import { ICollisionManager } from "./collision/CollisionManager";
import { ICollider } from "./collision/ICollider";
import { ICollision } from "./collision/ICollision";
export interface IPhysicsManager {
    addCollider(collider: ICollider): void;
    removeCollider(collider: ICollider): void;
    clearColliders(): void;
    resolve(): void;
    getCollisionsForCollider(collider: ICollider): ICollision[];
}
export declare class PhysicsManager implements IPhysicsManager {
    private readonly collisionManager;
    constructor(collisionManager: ICollisionManager);
    addCollider(collider: ICollider): void;
    removeCollider(collider: ICollider): void;
    clearColliders(): void;
    resolve(): void;
    getCollisionsForCollider(collider: ICollider): ICollision[];
}
