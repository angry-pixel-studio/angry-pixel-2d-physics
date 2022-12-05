import { Rectangle, Vector2 } from "angry-pixel-math";
import { ICollisionResolution } from "../ICollisionResolution";
import { IShape } from "../shape/IShape";
import { ICollisionResolver } from "./ICollisionResolver";

export class AABBResolver implements ICollisionResolver {
    private overlapX: number;
    private overlapY: number;
    private minOverlap: number;
    private direction: Vector2 = new Vector2();
    private displacementDirection: Vector2 = new Vector2();

    public resolve({ boundingBox: boxA }: IShape, { boundingBox: boxB }: IShape): ICollisionResolution | null {
        this.overlapX = Math.min(boxA.x1, boxB.x1) - Math.max(boxA.x, boxB.x);
        this.overlapY = Math.min(boxA.y1, boxB.y1) - Math.max(boxA.y, boxB.y);

        if (this.overlapX < 0 || this.overlapY < 0) {
            return null;
        }

        this.direction.set(Math.sign(boxB.x1 - boxA.x1), Math.sign(boxB.y1 - boxA.y1));

        this.preventContainment(boxA, boxB);

        if (this.overlapY < this.overlapX) {
            this.minOverlap = this.overlapY;
            this.displacementDirection.set(0, -this.direction.y);
        } else {
            this.minOverlap = this.overlapX;
            this.displacementDirection.set(-this.direction.x, this.overlapY === this.overlapX ? -this.direction.y : 0);
        }

        Vector2.unit(this.displacementDirection, this.displacementDirection);

        return {
            direction: Vector2.scale(new Vector2(), this.displacementDirection, -1),
            displacementDirection: this.displacementDirection.clone(),
            penetration: this.minOverlap,
        };
    }

    private preventContainment(boxA: Rectangle, boxB: Rectangle): void {
        if (this.overlapY > 0) {
            if ((boxA.y1 > boxB.y1 && boxA.y < boxB.y) || (boxA.y1 < boxB.y1 && boxA.y > boxB.y)) {
                const minSep = Math.abs(boxA.y - boxB.y);
                const maxSep = Math.abs(boxA.y1 - boxB.y1);

                this.overlapY += minSep < maxSep ? minSep : maxSep;
                this.direction.y *= minSep < maxSep ? 1 : -1;
            }
        }

        if (this.overlapX > 0) {
            if ((boxA.x1 > boxB.x1 && boxA.x < boxB.x) || (boxA.x1 < boxB.x1 && boxA.x > boxB.x)) {
                const minSep = Math.abs(boxA.x - boxB.x);
                const maxSep = Math.abs(boxA.x1 - boxB.x1);

                this.overlapX += minSep < maxSep ? minSep : maxSep;
                this.direction.x *= minSep < maxSep ? 1 : -1;
            }
        }
    }
}
