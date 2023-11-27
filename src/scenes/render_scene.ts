import { Camera } from "../modules/camera";
import { Color } from "../modules/color";
import { Finish } from "../modules/finish";
import { Light } from "../modules/light";
import { Scene } from "../modules/scene";
import { Vector } from "../modules/vector";
import { Scene001, Scene002, Scene003, Scene004, Scene005 } from "./scenes";
export function RenderScene(
  selectedScene: string,
  lightColor: string,
  lightPositionX: number,
  lightPositionY: number,
  lightPositionZ: number,
  cameraFromPosX: number,
  cameraFromPosY: number,
  cameraFromPosZ: number,
  cameraToPosX: number,
  cameraToPosY: number,
  cameraToPosZ: number,
  backgroundColor: string,
  reflection: number,
  shine: number,
  basePattern: string,
  baseColorOne: string,
  baseColorTwo: string
): Scene {
  let light = [new Light(new Vector(lightPositionX, lightPositionY, lightPositionZ), stringToColor(lightColor))];
  let cameraFrom: Vector = new Vector(cameraFromPosX, cameraFromPosY, cameraFromPosZ);
  let cameraTo: Vector = new Vector(cameraToPosX, cameraToPosY, cameraToPosZ);
  let camera = new Camera(cameraFrom, cameraTo, 16 / 8, 9 / 8);

  let finish = new Finish({ reflection: reflection, shine: shine });
  let background = stringToColor("..");
  let backgroundColorC = stringToColor(backgroundColor);
  let baseColorOneC = stringToColor(baseColorOne);
  let baseColorTwoC = stringToColor(baseColorTwo);

  switch (selectedScene) {
    case "1":
      return Scene001(light, camera, background, reflection, finish, backgroundColorC, basePattern, baseColorOneC, baseColorTwoC);
    case "2":
      return Scene002(light, camera, background, reflection, finish, backgroundColorC, basePattern, baseColorOneC, baseColorTwoC);
    case "3":
      return Scene003(light, camera, background, reflection, finish, backgroundColorC, basePattern, baseColorOneC, baseColorTwoC);
    case "4":
      return Scene004(light, camera, background, reflection, finish, backgroundColorC, basePattern, baseColorOneC, baseColorTwoC);
    default:
      return Scene005(light, camera, background, reflection, finish, backgroundColorC, basePattern, baseColorOneC, baseColorTwoC);
  }
}
function stringToColor(lightColor: string): Color {
  switch (lightColor) {
    case "White":
      return Color.White;

    case "Black":
      return Color.Black;

    case "Grey":
      return Color.Grey;

    case "Red":
      return Color.Red;

    case "Green":
      return Color.Green;

    case "Blue":
      return Color.Blue;

    case "Yellow":
      return Color.Yellow;

    case "Magenta":
      return Color.Magenta;

    case "Cyan":
      return Color.Cyan;

    case "Orange":
      return Color.Orange;

    case "Purple":
      return Color.Purple;

    case "Brown":
      return Color.Brown;

    case "Pink":
      return Color.Pink;

    case "Lavender":
      return Color.Lavender;

    case "Teal":
      return Color.Teal;

    case "Olive":
      return Color.Olive;

    case "Navy":
      return Color.Navy;

    default:
      return Color.Black;
  }
}
