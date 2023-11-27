import { Shape } from "../../modules/shape";
import { Vector } from "../../modules/vector";

export class Plane extends Shape {
  normal: Vector;
  distance: number;

  constructor(normal: Vector, distance: number, appearance: any) {
    super(appearance);
    this.normal = normal;
    this.distance = distance;
  }

  intersect = (ray: any): number[] => {
    let angle = ray.direction.dot(this.normal);

    if (angle === 0) return [];

    let b = this.normal.dot(ray.start.subtract(this.normal.scale(this.distance)));
    return [-b / angle];
  };

  getNormalAt = (_: Vector): Vector => this.normal;
}
