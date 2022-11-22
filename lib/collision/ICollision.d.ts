import { ICollider } from "./ICollider";
import { ICollisionResolution } from "./ICollisionResolution";
export interface ICollision {
    localCollider: ICollider;
    remoteCollider: ICollider;
    resolution: ICollisionResolution;
}
