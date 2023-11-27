import { THRESHOLD } from "../settings";
import { Vector } from "./vector";
import { Ray } from "./ray";
import { Finish } from "./finish";
import { Scene } from "./scene";
import { Appearance } from "./appearance";

export class Shape {
  appearance: any;
  constructor(appearance: Appearance) {
    this.appearance = appearance;
    if (!this.appearance.finish) this.appearance.finish = Finish.Default;
  }

  intersect = (_ray: Ray): number[] => {
    throw new Error("Classes which extend Shape must implement intersect");
  };

  getNormalAt = (_point: Vector): Vector => {
    throw new Error("Classes which extend Shape must implement getNormalAt");
  };

  closestDistanceAlongRay = (ray: Ray): number => {
    const distances = this.intersect(ray).filter((d) => d > THRESHOLD);
    const shortestDistance = Math.min(...distances);
    return shortestDistance;
  };

  /** return true if the specified light casts a shadow of this shape at the specified point  */
  castsShadowFor = (point: Vector, vector: Vector): boolean => {
    const distanceToLight = vector.length;
    const ray = new Ray(point, vector);
    return this.closestDistanceAlongRay(ray) <= distanceToLight;
  };

  getColorAt = (point: Vector, ray: Ray, scene: Scene, depth: number): any => {
    const normal = this.getNormalAt(point);
    let color = this.appearance.getAmbientColorAt(point);
    const reflex = ray.reflect(normal);

    const reflection = this.appearance.reflect(point, reflex, scene, depth);
    color = color.add(reflection);

    scene.lights.forEach((light) => {
      const v = Vector.from(point).to(light.position);

      // If this point is in shadow, do not add any illumination for this light source
      if (scene.shapes.some((shape) => shape.castsShadowFor(point, v))) return;

      const brightness = normal.dot(v.unit());
      if (brightness <= 0) return;

      const illumination = light.illuminate(this.appearance, point, brightness);
      color = color.add(illumination);

      const highlight = this.appearance.finish.addHighlight(reflex, light, v);
      color = color.add(highlight);
    });
    return color;
  };
}
