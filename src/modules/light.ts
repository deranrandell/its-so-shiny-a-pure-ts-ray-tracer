import { Vector } from "./vector";
import { Color } from "./color";

export class Light {
  position: Vector;
  color: Color;

  constructor(position: Vector, color: Color) {
    this.position = position;
    this.color = color;
  }

  illuminate = (appearance: any, point: Vector, brightness: number): Vector => appearance.getDiffuseColorAt(point).multiply(this.color).scale(brightness);
}
