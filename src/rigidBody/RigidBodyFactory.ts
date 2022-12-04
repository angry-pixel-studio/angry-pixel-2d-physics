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

export class RigidBodyFactory implements IRigidBodyFactory {
    private lastId: number = 0;

    public create({ colliderIds, type, gravity, position, velocity }: IRigidBodyDto): IRigidBody {
        if (colliderIds.length === 0) throw new Error("RigidBody needs at least one collider");

        return {
            id: ++this.lastId,
            colliderIds,
            type,
            gravity: gravity ?? 0,
            position: position ?? new Vector2(),
            velocity: velocity ?? new Vector2(),
        };
    }
}
