import { physicsManagerFactory, Rectangle, IPhysicsManager, Line } from ".";
import { Vector2 } from "angry-pixel-math";
import { CollisionMethods } from "./collision/method/ICollisionMethod";

const physicsManager: IPhysicsManager = physicsManagerFactory({ collisionMethod: CollisionMethods.AABB });

const box1 = {
    layer: "default",
    position: new Vector2(20, 20),
    rotation: 0,
    shape: new Rectangle(40, 40),
    updateCollisions: true,
};

const box2 = {
    layer: "default",
    position: new Vector2(40, 20),
    rotation: 0,
    shape: new Rectangle(40, 40),
    updateCollisions: true,
};

const box3 = {
    layer: "default",
    position: new Vector2(500, 20),
    rotation: 0,
    shape: new Rectangle(40, 40),
    updateCollisions: true,
};

const box4 = {
    layer: "default",
    position: new Vector2(540, 100),
    rotation: 0,
    shape: new Rectangle(40, 40),
    updateCollisions: true,
};

const box5 = {
    layer: "default",
    position: new Vector2(5000, 2000),
    rotation: 0,
    shape: new Rectangle(40, 40),
    updateCollisions: true,
};

const line1 = {
    layer: "default",
    position: new Vector2(20, 20),
    rotation: 0,
    shape: new Line([new Vector2(0, 0), new Vector2(50, 20)]),
    updateCollisions: true,
};

physicsManager.addCollider(box1);
physicsManager.addCollider(box2);
physicsManager.addCollider(box3);
physicsManager.addCollider(box4);
physicsManager.addCollider(box5);
physicsManager.addCollider(line1);

const run = () => {
    physicsManager.resolve();

    box1.position.set(578, 100);

    physicsManager.resolve();

    // console.log(physicsManager.getCollisionsForCollider(box1));
};

run();
