import { Scene } from "./../modules/scene";
import { Renderer } from "../renderer/renderer";
import { RenderScene } from "../scenes/render_scene";

interface Color {
  rgba: Uint8ClampedArray;
}
interface Block {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface MessageData {
  command: string;
  width: number;
  height: number;
  block: Block;
  selectedScene: string;
  lightColor: string;
  lightPositionX: number;
  lightPositionY: number;
  lightPositionZ: number;
  cameraPositionX: number;
  cameraPositionY: number;
  cameraPositionZ: number;
  cameraToPosX: number;
  cameraToPosY: number;
  cameraToPosZ: number;
  backgroundColor: string;
  reflection: number;
  shine: number;
  basePattern: string;
  baseColorOne: string;
  baseColorTwo: string;
}

function makeCallback(block: Block, rowsPerCallback: number): (x: number, y: number, color: Color) => void {
  let rgbaData = new Uint8ClampedArray(block.width * 4 * rowsPerCallback);

  let yOffset = 0;
  let imageDataHeight = rowsPerCallback;

  function callback(x: number, y: number, color: Color): void {
    let offsetY = y - block.y;
    let offsetX = x - block.x;
    let offset = ((offsetY % rowsPerCallback) * block.width + offsetX) * 4;

    rgbaData.set(color.rgba, offset);

    let bufferIsFull = offset + 4 === rgbaData.length;
    let atEndOfBlock = x === block.x + block.width - 1 && y === block.y + block.height - 1;

    if (bufferIsFull || atEndOfBlock) {
      if (atEndOfBlock) {
        imageDataHeight = block.height - yOffset;
        rgbaData = rgbaData.slice(0, block.width * imageDataHeight * 4);
      }

      let imageData = new ImageData(rgbaData, block.width, imageDataHeight);

      let data = { command: "putImageData", x: block.x, y: block.y + yOffset, imageData: imageData };

      self.postMessage(data);

      yOffset += rowsPerCallback;
    }
  }

  return callback;
}

self.addEventListener("message", function (message: MessageEvent<MessageData>) {
  let data = message.data;
  // console.log(data.cameraLookingAtPositionX);
  switch (data.command) {
    case "render":
      let renderer = new Renderer(data.width, data.height);
      let scene: Scene = RenderScene(
        data.selectedScene,
        data.lightColor,
        data.lightPositionX,
        data.lightPositionY,
        data.lightPositionZ,
        data.cameraPositionX,
        data.cameraPositionY,
        data.cameraPositionZ,
        data.cameraToPosX,
        data.cameraToPosY,
        data.cameraToPosZ,
        data.backgroundColor,
        data.reflection / 10,
        data.shine / 10,
        data.basePattern,
        data.baseColorOne,
        data.baseColorTwo
      );
      let callback = makeCallback(data.block, 8);
      renderer.render(scene, callback, data.block);
      self.close();
      self.postMessage({ command: "finished" });
      break;
  }
});
