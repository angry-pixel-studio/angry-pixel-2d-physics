import { IColliderDto, IColliderFactory } from "./collision/ColliderFactory";
import { ICollisionManager } from "./collision/CollisionManager";
import { ICollider } from "./collision/ICollider";
import { ICollision } from "./collision/ICollision";
import { IRigidBody } from "./rigidBody/IRigidBody";
import { IRigidBodyDto, IRigidBodyFactory } from "./rigidBody/RigidBodyFactory";
import { IRigidBodyManager } from "./rigidBody/RigidBodyManager";
export interface IPhysicsManager {
    addCollider(colliderDto: IColliderDto): ICollider;
    removeCollider(collider: ICollider): void;
    getCollisionsForCollider(collider: ICollider): ICollision[];
    addRigidBody(rigidBodyDto: IRigidBodyDto): IRigidBody;
    removeRigidBody(rigidBody: IRigidBody): void;
    resolve(time: number): void;
    clear(): void;
}
export declare class PhysicsManager implements IPhysicsManager {
    private readonly collisionManager;
    private readonly colliderFactory;
    private readonly rigidBodyManager;
    private readonly rigidBodyFactory;
    constructor(collisionManager: ICollisionManager, colliderFactory: IColliderFactory, rigidBodyManager: IRigidBodyManager, rigidBodyFactory: IRigidBodyFactory);
    addCollider(colliderDto: IColliderDto): ICollider;
    removeCollider(collider: ICollider): void;
    getCollisionsForCollider(collider: ICollider): ICollision[];
    addRigidBody(rigidBodyDto: IRigidBodyDto): IRigidBody;
    removeRigidBody(rigidBody: IRigidBody): void;
    resolve(time: number): void;
    clear(): void;
}
