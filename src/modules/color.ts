import { Vector } from "./vector";

export abstract class Material {
  abstract getColorAt(point: Vector): Color;
}

export class Color extends Material {
  private readonly r: number;
  private readonly g: number;
  private readonly b: number;

  constructor(r: number, g: number, b: number) {
    super();
    this.r = r;
    this.g = g;
    this.b = b;
  }

  getColorAt(_point: any): Color {
    return this; // Placeholder implementation, update as needed
  }

  get red(): number {
    return this.r;
  }

  get green(): number {
    return this.g;
  }

  get blue(): number {
    return this.b;
  }

  get rgba(): number[] {
    return [this.red, this.green, this.blue, 0xff];
  }

  get html(): string {
    return `rgb(${this.red},${this.green},${this.blue})`;
  }

  static White = new Color(255, 255, 255);
  static Black = new Color(0, 0, 0);
  static Grey = new Color(127, 127, 127);
  static Red = new Color(255, 0, 0);
  static Green = new Color(0, 255, 0);
  static Blue = new Color(0, 0, 255);
  static Yellow = new Color(255, 255, 0);
  static Magenta = new Color(255, 0, 255);
  static Cyan = new Color(0, 255, 255);
  static Orange = new Color(255, 165, 0);
  static Purple = new Color(128, 0, 128);
  static Brown = new Color(139, 69, 19);
  static Pink = new Color(255, 192, 203);
  static Lavender = new Color(230, 230, 250);
  static Teal = new Color(0, 128, 128);
  static Olive = new Color(128, 128, 0);
  static Navy = new Color(0, 0, 128);

  static parse(str: string): Color {
    str = str.replace(/\s/g, ""); // Remove all spaces

    if (!str) {
      throw new Error("Invalid color: Empty string");
    }

    let values, r, g, b;

    if ((values = /#([\da-f]{2})([\da-f]{2})([\da-f]{2})/i.exec(str))) {
      [r, g, b] = values.slice(1).map((c) => parseInt(c, 16));
    } else if ((values = /#([\da-f])([\da-f])([\da-f])/i.exec(str))) {
      [r, g, b] = values.slice(1).map((c) => parseInt(c, 16) * 17);
    } else if ((values = /rgb\(([\d]+),([\d]+),([\d]+)\)/.exec(str))) {
      [r, g, b] = [+values[1], +values[2], +values[3]];
    } else {
      throw new Error(`Invalid color: ${str}`);
    }

    return new Color(r, g, b);
  }

  add(otherColor: Color): Color {
    return new Color(this.red + otherColor.red, this.green + otherColor.green, this.blue + otherColor.blue);
  }

  multiply(otherColor: Color): Color {
    const rr = Math.floor((this.red * otherColor.red) / 0xff);
    const gg = Math.floor((this.green * otherColor.green) / 0xff);
    const bb = Math.floor((this.blue * otherColor.blue) / 0xff);
    return new Color(rr, gg, bb);
  }

  scale(factor: number): Color {
    const scaledR = this.red * factor;
    const scaledG = this.green * factor;
    const scaledB = this.blue * factor;

    return new Color(scaledR, scaledG, scaledB);
  }
}
