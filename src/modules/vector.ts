export class Vector {
  #x: number;
  #y: number;
  #z: number;
  #length: number | null = null;
  #squid: number | null = null;

  constructor(x: number, y: number, z: number) {
    this.#x = x;
    this.#y = y;
    this.#z = z;
  }

  get x() {
    return this.#x;
  }
  get y() {
    return this.#y;
  }
  get z() {
    return this.#z;
  }

  get length() {
    return (this.#length ??= Math.sqrt(this.squid));
  }

  get squid() {
    return (this.#squid ??= this.#x * this.#x + this.#y * this.#y + this.#z * this.#z);
  }

  static X = new Vector(1, 0, 0);
  static Y = new Vector(0, 1, 0);
  static Z = new Vector(0, 0, 1);
  static O = new Vector(0, 0, 0);

  dot = (that: Vector): number => this.x * that.x + this.y * that.y + this.z * that.z;

  cross = (that: Vector): Vector => new Vector(this.y * that.z - this.z * that.y, this.z * that.x - this.x * that.z, this.x * that.y - this.y * that.x);

  divide = (d: number): Vector => new Vector(this.x / d, this.y / d, this.z / d);

  unit = (): Vector => this.divide(this.length);

  invert = (): Vector => new Vector(-this.x, -this.y, -this.z);

  add = (that: Vector): Vector => new Vector(this.x + that.x, this.y + that.y, this.z + that.z);

  subtract = (that: Vector): Vector => new Vector(this.x - that.x, this.y - that.y, this.z - that.z);

  scale = (factor: number): Vector => new Vector(this.x * factor, this.y * factor, this.z * factor);

  static from = (origin: Vector) => ({ to: (target: Vector) => target.subtract(origin) });
}
