import { Vector2 } from "angry-pixel-math";
import { IRigidBody, RigidBodyType } from "./IRigidBody";
export interface IRigidBodyDto {
    type: RigidBodyType;
    colliderIds: number[];
    position?: Vector2;
    gravity?: number;
    velocity?: Vector2;
    onResolve?: (rigidBody: IRigidBody) => void;
}
export interface IRigidBodyFactory {
    create(dto: IRigidBodyDto): IRigidBody;
}
export declare class RigidBodyFactory implements IRigidBodyFactory {
    private lastId;
    create({ colliderIds, type, gravity, position, velocity, onResolve }: IRigidBodyDto): IRigidBody;
}
