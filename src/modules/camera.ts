import { Vector } from "./vector";
import { Ray } from "./ray";

export class Camera {
  private location: Vector;
  private look_at: Vector;
  private direction: Vector;
  private right: Vector;
  private up: Vector;

  constructor(location: Vector, look_at: Vector, width: number = 4, height: number = 9 / 4) {
    this.location = location;
    this.look_at = look_at;

    // If the camera is DIRECTLY above the look_at point, things go weird, so
    // we nudge it backwards ever so slightly...
    // if (this.location.x === this.look_at.x && this.location.z === this.look_at.z) {
    //   this.location = this.location.add(new Vector(0, 0, -0.0000001));
    // }

    // Calculate the direction - the vector pointing at the centre of the "frame"
    this.direction = this.look_at.add(this.location.invert()).unit();

    //  then work out which way is "right" and "up" relative to the camera
    this.right = Vector.Y.cross(this.direction)
      .unit()
      .scale(width / 2);
    this.up = this.right
      .cross(this.direction)
      .invert()
      .unit()
      .scale(height / 2);
  }

  public trace(scene: any, x: number, y: number): any {
    let vx = this.right.scale(x);
    let vy = this.up.scale(y).invert();
    let r = this.direction.add(vx).add(vy);
    let ray = new Ray(this.location, r);
    return ray.trace(scene);
  }
}
