import { Vector } from "./vector";
import { Color } from "./color";
import { Light } from "./light";

export class Finish {
  static Default = new Finish();

  ambient: number;
  diffuse: number;
  shine: number;
  reflection: number;

  constructor(options: { ambient?: number; diffuse?: number; shine?: number; reflection?: number } = {}) {
    this.ambient = options.ambient ?? 0.1;
    this.diffuse = options.diffuse ?? 0.7;
    this.shine = options.shine ?? 0;
    this.reflection = options.reflection ?? 0;
  }

  addHighlight = (reflex: Vector, light: Light, lightVector: Vector): Color => {
    if (!this.shine) return Color.Black;
    let intensity = reflex.dot(lightVector.unit());
    if (intensity <= 0) return Color.Black;
    let exponent = 32 * this.shine * this.shine;
    intensity = Math.pow(intensity, exponent);
    return light.color.scale(this.shine * intensity);
  };
}
