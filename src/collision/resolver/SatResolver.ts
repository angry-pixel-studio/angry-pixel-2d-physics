import { Vector2 } from "angry-pixel-math";
import { ICollisionResolution } from "../ICollisionResolution";
import { Circumference } from "../shape/Circumference";
import { IShape, ShapeType } from "../shape/IShape";
import { ICollisionResolver } from "./ICollisionResolver";

type AxisProjection = {
    min: number;
    max: number;
};

export class SatResolver implements ICollisionResolver {
    private axes: Vector2[];
    private projA: AxisProjection = { min: 0, max: 0 };
    private projB: AxisProjection = { min: 0, max: 0 };
    private currentOverlap: number;
    private minOverlap: number;

    private containment: boolean = false;
    private invert: boolean = false;

    private direction: Vector2 = new Vector2();
    private displacementDirection: Vector2 = new Vector2();

    private distance: Vector2 = new Vector2(Infinity, Infinity);
    private cache: Vector2 = new Vector2();

    public resolve(shapeA: IShape, shapeB: IShape): ICollisionResolution | null {
        this.currentOverlap = null;
        this.minOverlap = null;

        if (shapeA.type === ShapeType.Circumference) {
            this.setCircumferenceAxis(shapeA as Circumference, shapeB);
        } else if (shapeB.type === ShapeType.Circumference) {
            this.setCircumferenceAxis(shapeB as Circumference, shapeA);
        }

        this.axes = [...shapeA.projectionAxes];
        shapeB.projectionAxes.forEach((pa) => (this.axes.some((a) => a.equals(pa)) ? null : this.axes.push(pa)));

        for (let i = 0; i < this.axes.length; i++) {
            if (shapeA.type === ShapeType.Circumference) {
                this.setCircumferenceVertices(shapeA as Circumference, this.axes[i]);
            } else if (shapeB.type === ShapeType.Circumference) {
                this.setCircumferenceVertices(shapeB as Circumference, this.axes[i]);
            }

            this.projectShapeOntoAxis(this.projA, shapeA, this.axes[i]);
            this.projectShapeOntoAxis(this.projB, shapeB, this.axes[i]);

            this.currentOverlap = Math.min(this.projA.max, this.projB.max) - Math.max(this.projA.min, this.projB.min);
            if (this.currentOverlap < 0) {
                return null;
            }

            this.preventContainment();

            if (this.minOverlap === null || this.currentOverlap < this.minOverlap) {
                this.minOverlap = this.currentOverlap;

                if ((!this.containment && this.projA.max < this.projB.max) || (this.containment && this.invert)) {
                    this.direction.copy(this.axes[i]);
                    Vector2.scale(this.displacementDirection, this.axes[i], -1);
                } else {
                    Vector2.scale(this.direction, this.axes[i], -1);
                    this.displacementDirection.copy(this.axes[i]);
                }
            }
        }

        return {
            direction: this.direction.clone(),
            displacementDirection: this.displacementDirection.clone(),
            penetration: this.minOverlap,
        };
    }

    private projectShapeOntoAxis(projection: AxisProjection, shape: IShape, axis: Vector2): AxisProjection {
        projection.min = Vector2.dot(axis, shape.vertices[0]);
        projection.max = projection.min;

        shape.vertices.forEach((vertex: Vector2) => {
            projection.min = Math.min(Vector2.dot(axis, vertex), projection.min);
            projection.max = Math.max(Vector2.dot(axis, vertex), projection.max);
        });

        return projection;
    }

    private preventContainment(): void {
        this.containment =
            (this.projA.max > this.projB.max && this.projA.min < this.projB.min) ||
            (this.projA.max < this.projB.max && this.projA.min > this.projB.min);

        if (this.containment) {
            const minSep = Math.abs(this.projA.min - this.projB.min);
            const maxSep = Math.abs(this.projA.max - this.projB.max);

            this.invert = minSep < maxSep;
            this.currentOverlap += this.invert ? minSep : maxSep;
        }
    }

    private setCircumferenceAxis(c: Circumference, s: IShape): void {
        this.distance.set(Infinity, Infinity);

        s.vertices.forEach((vertex) => {
            Vector2.subtract(this.cache, vertex, c.position);

            if (this.cache.magnitude < this.distance.magnitude) {
                this.distance.copy(this.cache);
            }
        });

        Vector2.unit(c.projectionAxes[0], this.distance);
    }

    private setCircumferenceVertices(c: Circumference, axis: Vector2): void {
        Vector2.add(c.vertices[0], c.position, Vector2.scale(this.cache, Vector2.unit(this.cache, axis), -c.radius));
        Vector2.add(c.vertices[1], c.position, Vector2.scale(this.cache, Vector2.unit(this.cache, axis), c.radius));
    }
}
