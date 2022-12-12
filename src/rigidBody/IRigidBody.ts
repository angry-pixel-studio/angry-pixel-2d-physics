import { Vector2 } from "angry-pixel-math";
import { ICollider } from "../collision/ICollider";

export enum RigidBodyType {
    Static,
    Dynamic,
    Kinematic,
}

export interface IRigidBody {
    id: number;
    active: boolean;
    type: RigidBodyType;
    colliderIds: number[];
    position: Vector2;
    gravity: number;
    velocity: Vector2;
    onResolve?: (rigidBody: IRigidBody) => void;
}
