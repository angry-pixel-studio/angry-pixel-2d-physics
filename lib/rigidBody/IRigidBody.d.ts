import { Vector2 } from "angry-pixel-math";
export declare enum RigidBodyType {
    Static = 0,
    Dynamic = 1,
    Kinematic = 2
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
