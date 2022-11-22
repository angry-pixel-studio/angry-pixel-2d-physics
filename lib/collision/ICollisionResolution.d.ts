import { Vector2 } from "angry-pixel-math";
export interface ICollisionResolution {
    penetration: number;
    direction: Vector2;
    displacementDirection: Vector2;
}
