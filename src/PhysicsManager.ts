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

export class PhysicsManager implements IPhysicsManager {
    constructor(private readonly collisionManager: ICollisionManager) {}

    public addCollider(collider: ICollider): void {
        this.collisionManager.addCollider(collider);
    }

    public removeCollider(collider: ICollider): void {
        this.collisionManager.removeCollider(collider);
    }

    public clearColliders(): void {
        this.collisionManager.clearColliders();
    }

    public resolve(): void {
        this.collisionManager.resolve();
    }

    public getCollisionsForCollider(collider: ICollider): ICollision[] {
        return this.collisionManager.getCollisionsForCollider(collider);
    }
}
