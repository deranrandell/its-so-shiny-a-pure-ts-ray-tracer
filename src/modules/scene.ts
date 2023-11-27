import { Camera } from "./camera";
import { Color } from "./color";
import { Light } from "./light";
import { Shape } from "./shape";

export class Scene {
  private camera: Camera;
  public background: Color;
  public shapes: Shape[];
  public lights: Light[];

  constructor(camera: Camera, background?: Color, shapes?: Shape[], lights?: Light[]) {
    this.camera = camera;
    this.background = background ?? Color.Black;
    this.shapes = shapes ?? [];
    this.lights = lights ?? [];
  }

  public trace(x: number, y: number): any {
    return this.camera.trace(this, x, y);
  }
}
