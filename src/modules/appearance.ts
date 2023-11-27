import { CheckeredPattern } from "../components/patterns/patterns";
import { Color, Material } from "./color";
import { Finish } from "./finish";
import { Ray } from "./ray";
import { Scene } from "./scene";
import { Vector } from "./vector";

/** A shape's appearance is a combination of the material it's made from and the finish applied to it. */
export class Appearance {
  private material: Material;
  finish: Finish;

  constructor(material?: Material | CheckeredPattern, finish?: Finish) {
    this.material = material ?? Color.Grey;
    this.finish = finish ?? Finish.Default;
  }

  private getColorAt = (point: Vector): Color => this.material.getColorAt(point);

  public getAmbientColorAt = (point: Vector): Color => this.getColorAt(point).scale(this.finish.ambient);

  public getDiffuseColorAt = (point: Vector): Color => this.getColorAt(point).scale(this.finish.diffuse);

  public reflect = (point: Vector, reflex: Vector, scene: Scene, depth: number): Color => {
    if (!this.finish.reflection) return Color.Black;
    let reflectedRay = new Ray(point, reflex);
    let reflectedColor = reflectedRay.trace(scene, depth);
    return reflectedColor.scale(this.finish.reflection);
  };
}
