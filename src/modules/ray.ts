import { MAX_DEPTH } from "../settings";
import { Vector } from "./vector";
export class Ray {
  start: Vector; // Replace 'Vector' with the actual type of your Vector class
  direction: Vector; // Replace 'Vector' with the actual type of your Vector class

  constructor(start: Vector, direction: Vector) {
    this.start = start;
    this.direction = direction.unit();
  }

  trace = (scene: any, depth: number = 0): any => {
    if (depth > MAX_DEPTH) return scene.background;
    let distances = scene.shapes.map((s: any) => s.closestDistanceAlongRay(this));
    let shortestDistance = Math.min(...distances);
    if (shortestDistance === Infinity) return scene.background;
    let nearestShape = scene.shapes[distances.indexOf(shortestDistance)];
    let point = this.start.add(this.direction.scale(shortestDistance));
    return nearestShape.getColorAt(point, this, scene, depth + 1);
  };

  reflect = (normal: Vector): Vector => {
    let inverse = this.direction.invert();
    return inverse.add(normal.scale(normal.dot(inverse)).add(this.direction).scale(2));
  };

  toString = (): string => `${this.start.toString()} => ${this.direction.toString()}`;
}
