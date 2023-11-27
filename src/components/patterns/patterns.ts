import { Material, Color } from "../../modules/color";

export class SolidColorPattern extends Material {
  color: any;

  constructor(color: any) {
    super();
    this.color = color;
  }

  getColorAt = (): any => this.color;
}

export class StripedPattern extends Material {
  color1: any;
  color2: any;
  frequency: number;

  constructor(color1: any, color2: any, frequency: number = 1) {
    super();
    this.color1 = color1;
    this.color2 = color2;
    this.frequency = frequency;
  }

  getColorAt = (point: { x: number; z: number }): any => {
    // Calculate the sine of the x-coordinate to create a wavy pattern
    let wave = Math.sin(point.x * this.frequency);

    // Use the sine value to interpolate between color1 and color2
    let t = (wave + 1) / 2;

    // Linear interpolation
    let r = this.color1.r + t * (this.color2.r - this.color1.r);
    let g = this.color1.g + t * (this.color2.g - this.color1.g);
    let b = this.color1.b + t * (this.color2.b - this.color1.b);

    return new Color(r, g, b);
  };
}

export class GradientPattern extends Material {
  color1: any;
  color2: any;

  constructor(color1: any, color2: any) {
    super();
    this.color1 = color1;
    this.color2 = color2;
  }

  getColorAt = (point: { x: number; z: number }): Color => {
    let t = (point.x + point.z) / 2;
    // Linear interpolation
    let r = this.color1.r + t * (this.color2.r - this.color1.r);
    let g = this.color1.g + t * (this.color2.g - this.color1.g);
    let b = this.color1.b + t * (this.color2.b - this.color1.b);
    return new Color(r, g, b);
  };
}

export class CheckeredPattern extends Material {
  color1: any;
  color2: any;
  size: number;

  constructor(color1: any, color2: any, size: number = 1) {
    super();
    this.color1 = color1;
    this.color2 = color2;
    this.size = size;
  }

  getColorAt = (point: { x: number; z: number }): any => {
    let rank = Math.floor(point.x / this.size);
    let file = Math.floor(point.z / this.size);
    let light = ((rank ^ file) & 1) == 1;
    return light ? this.color1 : this.color2;
  };
}
