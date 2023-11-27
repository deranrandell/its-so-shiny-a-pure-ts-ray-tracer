import { Shape } from "../../modules/shape";
import { THRESHOLD } from "../../settings";
import { Vector } from "../../modules/vector";
import { Appearance } from "../../modules/appearance";

type Axis = "x" | "y" | "z";

const axes: Axis[] = ["x", "y", "z"];

export class Box extends Shape {
  lowerCorner: Vector;
  upperCorner: Vector;
  vertices: Vector[];

  constructor(corner1: Vector, corner2: Vector, appearance: Appearance) {
    super(appearance);
    this.lowerCorner = new Vector(Math.min(corner1.x, corner2.x), Math.min(corner1.y, corner2.y), Math.min(corner1.z, corner2.z));
    this.upperCorner = new Vector(Math.max(corner1.x, corner2.x), Math.max(corner1.y, corner2.y), Math.max(corner1.z, corner2.z));
    this.vertices = [this.lowerCorner, this.upperCorner];
  }

  contains = (point: Vector, axis: Axis): boolean => this.lowerCorner[axis] < point[axis] && point[axis] < this.upperCorner[axis];

  intersectOnAxis = (axis: Axis, ray: any): number[] => {
    let [o1, o2] = axes.filter((a) => a !== axis);
    let intersections: number[] = [];

    if (ray.direction[axis] === 0) return [];

    this.vertices.forEach((vertex) => {
      let intersect = (vertex[axis] - ray.start[axis]) / ray.direction[axis];
      let point = ray.start.add(ray.direction.scale(intersect));

      if (this.contains(point, o1) && this.contains(point, o2)) {
        intersections.push(intersect);
      }
    });

    return intersections;
  };

  intersect = (ray: any): number[] => {
    return this.intersectOnAxis("x", ray).concat(this.intersectOnAxis("y", ray)).concat(this.intersectOnAxis("z", ray));
  };

  getNormalAt = (pos: Vector): Vector => {
    if (Math.abs(this.lowerCorner.x - pos.x) < THRESHOLD) return Vector.X.invert();
    if (Math.abs(this.upperCorner.x - pos.x) < THRESHOLD) return Vector.X;
    if (Math.abs(this.lowerCorner.y - pos.y) < THRESHOLD) return Vector.Y.invert();
    if (Math.abs(this.upperCorner.y - pos.y) < THRESHOLD) return Vector.Y;
    if (Math.abs(this.lowerCorner.z - pos.z) < THRESHOLD) return Vector.Z.invert();
    if (Math.abs(this.upperCorner.z - pos.z) < THRESHOLD) return Vector.Z;

    throw new Error(`The point ${pos.toString()} is not on the surface of ${this.toString()}`);
  };

  toString = (): string => `box(${this.lowerCorner.toString()}, ${this.upperCorner.toString()})`;
}
