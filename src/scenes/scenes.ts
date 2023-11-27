import { Color } from "../modules/color";
import { Vector } from "../modules/vector";
import { Finish } from "../modules/finish";
import { Plane } from "../components/shape/plane";
import { Light } from "../modules/light";
import { Appearance } from "../modules/appearance";
import { Sphere } from "../components/shape/sphere";
import { Box } from "../components/shape/box";
import { CheckeredPattern } from "../components/patterns/patterns";
import { Scene } from "../modules/scene";
import { Camera } from "../modules/camera";

export function Scene001(light: Light[], camera: Camera, background: Color, reflection: number, finish: Finish, backgroundColor: Color, basePattern: string, baseColorOne: Color, baseColorTwo: Color): Scene {
  let shapes = [
    getFloor(basePattern, baseColorOne, baseColorTwo);
    new Plane(Vector.Y, -0.3, new Appearance(backgroundColor)),
    new Box(new Vector(-1.8, 0, -4.8), new Vector(1.8, 4, -1.2), new Appearance(Color.Yellow, finish)),
    new Sphere(new Vector(6, 2, -2), 2, new Appearance(Color.Magenta, finish)),
    new Sphere(new Vector(1.2, 0.5, -6.2), 0.5, new Appearance(Color.Black, new Finish({ shine: 0.8, reflection: reflection }))),
  ];

  return new Scene(camera, background, shapes, light);
}
export function Scene002(light: Light[], camera: Camera, background: Color, reflection: number, finish: Finish, backgroundColor: Color, basePattern: string, baseColorOne: Color, baseColorTwo: Color): Scene {
  let pattern = new Appearance(new CheckeredPattern(Color.Blue, Color.Pink, 2), new Finish({ ambient: 0.2, diffuse: 0.7, reflection: 0.4 }));

  let shapes = [
    new Plane(Vector.Y, -0.3, new Appearance(backgroundColor)),
    new Box(new Vector(-8, -0.3, -8), new Vector(8, 0, 8), pattern),
    new Box(new Vector(-1.8, 0, -4.8), new Vector(1.8, 4, -1.2), new Appearance(Color.Yellow, finish)),
    new Sphere(new Vector(6, 2, -2), 2, new Appearance(Color.Magenta, finish)),
    new Sphere(new Vector(1.2, 0.5, -6.2), 0.5, new Appearance(Color.Black, new Finish({ shine: 0.8, reflection: reflection }))),
  ];

  return new Scene(camera, background, shapes, light);
}
export function Scene003(light: Light[], camera: Camera, background: Color, reflection: number, finish: Finish, backgroundColor: Color, basePattern: string, baseColorOne: Color, baseColorTwo: Color): Scene {
  let pattern = new Appearance(new CheckeredPattern(Color.Blue, Color.Pink, 2), new Finish({ ambient: 0.2, diffuse: 0.7, reflection: 0.4 }));

  let shapes = [
    new Plane(Vector.Y, -0.3, new Appearance(backgroundColor)),
    new Box(new Vector(-8, -0.3, -8), new Vector(8, 0, 8), pattern),
    new Box(new Vector(-1.8, 0, -4.8), new Vector(1.8, 4, -1.2), new Appearance(Color.Yellow, finish)),
    new Sphere(new Vector(6, 2, -2), 2, new Appearance(Color.Magenta, finish)),
    new Sphere(new Vector(1.2, 0.5, -6.2), 0.5, new Appearance(Color.Black, new Finish({ shine: 0.8, reflection: reflection }))),
  ];

  return new Scene(camera, background, shapes, light);
}
export function Scene004(light: Light[], camera: Camera, background: Color, reflection: number, finish: Finish, backgroundColor: Color, basePattern: string, baseColorOne: Color, baseColorTwo: Color): Scene {
  let pattern = new Appearance(new CheckeredPattern(Color.Blue, Color.Pink, 2), new Finish({ ambient: 0.2, diffuse: 0.7, reflection: 0.4 }));

  let shapes = [
    new Plane(Vector.Y, -0.3, new Appearance(backgroundColor)),
    new Box(new Vector(-8, -0.3, -8), new Vector(8, 0, 8), pattern),
    new Box(new Vector(-1.8, 0, -4.8), new Vector(1.8, 4, -1.2), new Appearance(Color.Yellow, finish)),
    new Sphere(new Vector(6, 2, -2), 2, new Appearance(Color.Magenta, finish)),
    new Sphere(new Vector(1.2, 0.5, -6.2), 0.5, new Appearance(Color.Black, new Finish({ shine: 0.8, reflection: reflection }))),
  ];

  return new Scene(camera, background, shapes, light);
}
export function Scene005(light: Light[], camera: Camera, background: Color, reflection: number, finish: Finish, backgroundColor: Color, basePattern: string, baseColorOne: Color, baseColorTwo: Color): Scene {
  let pattern = new Appearance(new CheckeredPattern(Color.Blue, Color.Pink, 2), new Finish({ ambient: 0.2, diffuse: 0.7, reflection: 0.4 }));

  let shapes = [
    new Plane(Vector.Y, -0.3, new Appearance(backgroundColor)),
    new Box(new Vector(-8, -0.3, -8), new Vector(8, 0, 8), pattern),
    new Box(new Vector(-1.8, 0, -4.8), new Vector(1.8, 4, -1.2), new Appearance(Color.Yellow, finish)),
    new Sphere(new Vector(6, 2, -2), 2, new Appearance(Color.Magenta, finish)),
    new Sphere(new Vector(1.2, 0.5, -6.2), 0.5, new Appearance(Color.Black, new Finish({ shine: 0.8, reflection: reflection }))),
  ];

  return new Scene(camera, background, shapes, light);
}
function getFloor(basePattern: string, baseColorOne: Color, baseColorTwo: Color): Box | null {
  let pattern: Appearance;

  switch (basePattern) {
    case "None":
      pattern = new Appearance(new CheckeredPattern(Color.Blue, Color.Pink, 2), new Finish({ ambient: 0.2, diffuse: 0.7, reflection: 0.4 }));
      return null;

    case "Solid":
      pattern = new Appearance(new CheckeredPattern(Color.Blue, Color.Pink, 2), new Finish({ ambient: 0.2, diffuse: 0.7, reflection: 0.4 }));
      return  new Box(new Vector(-8, -0.3, -8), new Vector(8, 0, 8), pattern);

    case "Stripes":
      pattern = new Appearance(new CheckeredPattern(Color.Blue, Color.Pink, 2), new Finish({ ambient: 0.2, diffuse: 0.7, reflection: 0.4 }));
      return     new Box(new Vector(-8, -0.3, -8), new Vector(8, 0, 8), pattern);

      case "Checkered":
      pattern = new Appearance(new CheckeredPattern(Color.Blue, Color.Pink, 2), new Finish({ ambient: 0.2, diffuse: 0.7, reflection: 0.4 }));
      return     new Box(new Vector(-8, -0.3, -8), new Vector(8, 0, 8), pattern);
    case "Gradient":
      pattern = new Appearance(new CheckeredPattern(Color.Blue, Color.Pink, 2), new Finish({ ambient: 0.2, diffuse: 0.7, reflection: 0.4 }));
      return     new Box(new Vector(-8, -0.3, -8), new Vector(8, 0, 8), pattern);
    default:
      pattern = new Appearance(new CheckeredPattern(Color.Blue, Color.Pink, 2), new Finish({ ambient: 0.2, diffuse: 0.7, reflection: 0.4 }));
      return     new Box(new Vector(-8, -0.3, -8), new Vector(8, 0, 8), pattern);
  }
}
