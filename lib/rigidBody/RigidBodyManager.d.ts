import { ICollisionManager } from "../collision/CollisionManager";
import { IRigidBody } from "./IRigidBody";
export interface IRigidBodyManager {
    addRigidBody(rigidBody: IRigidBody): void;
    removeRigidBody(rigidBody: IRigidBody): void;
    resolve(time: number): void;
    clearRigidBodies(): void;
}
export declare class RigidBodyManager implements IRigidBodyManager {
    private readonly collisionManager;
    private rigidBodies;
    private activeRigidBodies;
    private colliders;
    private velocity;
    private displacement;
    private cacheDisplacement;
    constructor(collisionManager: ICollisionManager);
    addRigidBody(rigidBody: IRigidBody): void;
    removeRigidBody(rigidBody: IRigidBody): void;
    clearRigidBodies(): void;
    resolve(time: number): void;
    private dynamicUpdate;
    private kinematicUpdate;
    private applyGravity;
    private applyVelocity;
    private obtainDisplacement;
    private applyReposition;
    private getCollisions;
}
