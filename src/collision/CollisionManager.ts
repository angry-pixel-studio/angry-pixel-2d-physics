import { Rectangle, Vector2 } from "angry-pixel-math";
import { ICollisionMethod } from "./method/ICollisionMethod";
import { QuadTree } from "./QuadTree";
import { ICollider } from "./ICollider";
import { ICollision } from "./ICollision";

export interface ICollisionManager {
    addCollider(collider: ICollider): void;
    getCollider(id: number): ICollider;
    removeCollider(collider: ICollider): void;
    clearColliders(): void;
    resolve(): void;
    getCollisionsForCollider(collider: ICollider): ICollision[];
    refreshCollisionsForCollider(collider: ICollider): void;
}

export type CollisionMatrix = [string, string][];

export class CollisionManager implements ICollisionManager {
    private colliders: ICollider[];
    private activeColliders: ICollider[];
    private quadTree: QuadTree;
    private quadTreeArea: Rectangle;
    private fixedQuadTree: boolean;
    private method: ICollisionMethod;
    private collisions: ICollision[] = [];
    private collisionMatrix: CollisionMatrix;

    // cache
    private minArea: Vector2 = new Vector2();
    private maxArea: Vector2 = new Vector2();
    private newArea: Rectangle = new Rectangle(0, 0, 0, 0);

    constructor(method: ICollisionMethod, quadTreeArea?: Rectangle, collisionMatrix?: CollisionMatrix) {
        this.method = method;
        this.colliders = [];
        this.activeColliders = [];
        this.collisionMatrix = collisionMatrix;

        this.setupQuadTree(quadTreeArea);
    }

    private setupQuadTree(quadTreeArea?: Rectangle): void {
        this.quadTreeArea = quadTreeArea ?? new Rectangle(0, 0, 0, 0);
        this.fixedQuadTree = quadTreeArea ? true : false;

        this.quadTree = new QuadTree(this.quadTreeArea);
    }

    public addCollider(collider: ICollider): void {
        this.colliders[collider.id] = collider;
    }

    public getCollider(id: number): ICollider {
        return this.colliders[id];
    }

    public removeCollider(collider: ICollider): void {
        delete this.colliders[collider.id];
    }

    public clearColliders(): void {
        this.colliders = [];
    }

    public getCollisionsForCollider(collider: ICollider): ICollision[] {
        return collider.active ? this.collisions.filter((collision) => collision.localCollider.id === collider.id) : [];
    }

    public refreshCollisionsForCollider(collider: ICollider): void {
        if (!this.colliders[collider.id] || !collider.active) return;

        this.collisions = this.collisions.filter(
            (collision) => collision.localCollider.id !== collider.id && collision.remoteCollider.id !== collider.id
        );

        this.updateShape(collider);
        this.narrowPhase(collider, this.broadPhase(collider));
    }

    public resolve(): void {
        this.collisions = [];

        if (this.colliders.length === 0) {
            return;
        }

        this.activeColliders = this.colliders.filter((c) => c.active);

        this.quadTree.clear();

        this.activeColliders.forEach((collider) => {
            this.updateShape(collider);
        });

        if (this.fixedQuadTree === false) {
            this.updateNewArea();

            if (this.newArea.equals(this.quadTreeArea) === false) {
                this.quadTreeArea.copy(this.newArea);
                this.quadTree.resize(this.quadTreeArea);
            }
        }

        this.activeColliders.forEach(({ id, shape: { boundingBox } }) => this.quadTree.insert(id, boundingBox));

        this.updateCollisions();

        /*this.collisions.forEach((c) =>
            console.log(
                c.localCollider.shape.constructor.name,
                c.localCollider.position,
                c.remoteCollider.shape.constructor.name,
                c.remoteCollider.position,
                c.resolution
            )
        );*/
    }

    private updateShape(collider: ICollider): void {
        collider.shape.position = collider.position;
        collider.shape.rotation = collider.rotation;

        collider.shape.update();
    }

    private updateNewArea(): void {
        this.activeColliders.forEach(({ shape: { boundingBox: box } }: ICollider) => {
            this.minArea.set(Math.min(box.x, this.minArea.x), Math.min(box.y, this.minArea.y));
            this.maxArea.set(Math.max(box.x1, this.maxArea.x), Math.max(box.y1, this.maxArea.y));
        });

        this.newArea.set(
            this.minArea.x,
            this.minArea.y,
            this.maxArea.x - this.minArea.x,
            this.maxArea.y - this.minArea.y
        );
    }

    private updateCollisions(): void {
        this.activeColliders
            .filter((collider) => collider.updateCollisions)
            .forEach((collider) => this.narrowPhase(collider, this.broadPhase(collider)));
    }

    // broadPhase takes care of looking for possible collisions
    private broadPhase(collider: ICollider): ICollider[] {
        if (this.collisionMatrix) {
            return this.quadTree
                .retrieve<number>(collider.shape.boundingBox)
                .map<ICollider>((id) => this.colliders[id])
                .filter((remoteCollider) =>
                    this.collisionMatrix.some(
                        (row) =>
                            (row[0] === collider.layer && row[1] === remoteCollider.layer) ||
                            (row[1] === collider.layer && row[0] === remoteCollider.layer)
                    )
                );
        }

        return this.quadTree.retrieve<number>(collider.shape.boundingBox).map<ICollider>((id) => this.colliders[id]);
    }

    // narrowPhase takes care of checking for actual collision
    private narrowPhase(collider: ICollider, colliders: ICollider[]): void {
        colliders
            .filter(
                (remoteCollider: ICollider) =>
                    (!collider.group || !remoteCollider.group || remoteCollider.group !== collider.group) &&
                    collider.id !== remoteCollider.id
            )
            .forEach((remoteCollider: ICollider) => {
                if (this.isResolved(collider, remoteCollider)) return;

                const resolution = this.method.getCollisionResolution(collider.shape, remoteCollider.shape);
                if (resolution !== null) {
                    this.collisions.push(
                        {
                            localCollider: collider,
                            remoteCollider: remoteCollider,
                            resolution: resolution,
                        },
                        {
                            localCollider: remoteCollider,
                            remoteCollider: collider,
                            resolution: {
                                direction: resolution.displacementDirection,
                                displacementDirection: resolution.direction,
                                penetration: resolution.penetration,
                            },
                        }
                    );

                    if (collider.onCollision) collider.onCollision(resolution);
                }
            });
    }

    private isResolved(localCollider: ICollider, remoteCollider: ICollider): boolean {
        for (const collision of this.collisions) {
            if (collision.localCollider.id === localCollider.id && collision.remoteCollider.id === remoteCollider.id) {
                return true;
            }
        }

        return false;
    }
}
