import { Appearance } from "../../modules/appearance";
import { Shape } from "../../modules/shape";
import { Vector } from "../../modules/vector";

export class Sphere extends Shape {
  center: Vector;
  radius: number;

  constructor(center: Vector, radius: number, appearance: Appearance) {
    super(appearance);
    this.center = center;
    this.radius = radius;
  }

  intersect = (ray: any): number[] => {
    let os = Vector.from(this.center).to(ray.start);

    let b = 2 * os.dot(ray.direction);
    let c = os.squid - this.radius * this.radius;

    let discriminant = b * b - 4 * c;

    if (discriminant < 0) return [];

    if (discriminant === 0) return [-b / 2];

    let root = Math.sqrt(discriminant);
    return [(-b - root) / 2, (-b + root) / 2];
  };

  getNormalAt = (point: Vector): Vector => point.subtract(this.center).unit();
}
