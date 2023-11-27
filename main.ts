import { Color } from "./src/modules/color";
import { Vector } from "./src/modules/vector";
type WindowWithRenderStarted = Window & {
  renderStarted?: number;
};
const windowWithRenderStarted: WindowWithRenderStarted = window as Window;

(() => {
  let canvas: HTMLCanvasElement | null = document.getElementById("rendering-environment") as HTMLCanvasElement | null;

  if (canvas === null) {
    console.error("Canvas element not found");
    return;
  }

  let ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

  if (ctx === null) {
    console.error("Canvas context not found");
    return;
  }

  let renderButton: HTMLButtonElement = document.getElementById("render-button") as HTMLButtonElement;
  let cancelButton: HTMLButtonElement = document.getElementById("cancel-button") as HTMLButtonElement;

  function handleMessageFromWorker(message: MessageEvent<{ command: string; imageData?: ImageData; x?: number; y?: number }>) {
    let data = message.data;
    switch (data.command) {
      case "putImageData":
        if (data.imageData && data.x !== undefined && data.y !== undefined) {
          ctx?.putImageData(data.imageData, data.x, data.y);
        }
        break;
      case "finished":
        runningWorkers--;
        updateStatus(runningWorkers > 0);
        break;
    }
  }
  function partition(width: number, height: number, rows: number, columns: number): { x: number; y: number; width: number; height: number }[] {
    let blockWidth = Math.ceil(width / rows);
    let blockHeight = Math.ceil(height / columns);
    let x = 0;
    let y = 0;

    let blocks: { x: number; y: number; width: number; height: number }[] = [];

    while (x + blockWidth < width) {
      while (y + blockHeight < height) {
        blocks.push({ x: x, y: y, width: blockWidth, height: blockHeight });
        y += blockHeight;
      }
      blocks.push({ x: x, y: y, width: blockWidth, height: blockHeight });
      y = 0;
      x += blockWidth;
    }

    while (y + blockHeight < height) {
      blocks.push({ x: x, y: y, width: width - x, height: blockHeight });
      y += blockHeight;
    }

    blocks.push({ x: x, y: y, width: width - x, height: height - y });

    return blocks;
  }

  let runningWorkers: number = 0;

  function render() {
    let selectedScene: string = (function () {
      let sceneSelector: HTMLSelectElement = document.getElementById("scene-selector") as HTMLSelectElement;
      return sceneSelector.value;
    })();

    let lightColor: string = (function () {
      let lightColorSelector: HTMLSelectElement = document.getElementById("light-color") as HTMLSelectElement;
      return lightColorSelector.value;
    })();

    let lightPositionX: number = (function () {
      let lightPosition: HTMLSelectElement = document.getElementById("light-pos-x") as HTMLSelectElement;
      return parseInt(lightPosition.value);
    })();

    let lightPositionY: number = (function () {
      let lightPosition: HTMLSelectElement = document.getElementById("light-pos-y") as HTMLSelectElement;
      return parseInt(lightPosition.value);
    })();

    let lightPositionZ: number = (function () {
      let lightPosition: HTMLSelectElement = document.getElementById("light-pos-z") as HTMLSelectElement;
      return parseInt(lightPosition.value);
    })();

    let cameraPositionX: number = (function () {
      let lightPosition: HTMLSelectElement = document.getElementById("camera-from-pos-x") as HTMLSelectElement;
      return parseInt(lightPosition.value);
    })();

    let cameraPositionY: number = (function () {
      let lightPosition: HTMLSelectElement = document.getElementById("camera-from-pos-y") as HTMLSelectElement;
      return parseInt(lightPosition.value);
    })();

    let cameraPositionZ: number = (function () {
      let cameraPosition: HTMLSelectElement = document.getElementById("camera-from-pos-z") as HTMLSelectElement;
      return parseInt(cameraPosition.value);
    })();

    let cameraToPosX: number = (function () {
      let cameraPosition: HTMLSelectElement = document.getElementById("camera-to-pos-x") as HTMLSelectElement;
      return parseInt(cameraPosition.value);
    })();

    let cameraToPosY: number = (function () {
      let cameraPosition: HTMLSelectElement = document.getElementById("camera-to-pos-y") as HTMLSelectElement;
      return parseInt(cameraPosition.value);
    })();

    let cameraToPosZ: number = (function () {
      let cameraPosition: HTMLSelectElement = document.getElementById("camera-to-pos-z") as HTMLSelectElement;
      return parseInt(cameraPosition.value);
    })();

    let backgroundColor: string = (function () {
      let backgroundColorSelector: HTMLSelectElement = document.getElementById("back-color") as HTMLSelectElement;
      return backgroundColorSelector.value;
    })();

    let reflection: number = (function () {
      let reflectionSelector: HTMLSelectElement = document.getElementById("reflection-value") as HTMLSelectElement;
      return parseInt(reflectionSelector.value);
    })();

    let shine: number = (function () {
      let shineSelector: HTMLSelectElement = document.getElementById("shine-value") as HTMLSelectElement;
      return parseInt(shineSelector.value);
    })();

    let basePattern: string = (function () {
      let basePatternSelector: HTMLSelectElement = document.getElementById("floor-pattern") as HTMLSelectElement;
      return basePatternSelector.value;
    })();

    let baseColorOne: string = (function () {
      let baseColorOneSelector: HTMLSelectElement = document.getElementById("floor-color1") as HTMLSelectElement;
      return baseColorOneSelector.value;
    })();

    let baseColorTwo: string = (function () {
      let baseColorTwoSelector: HTMLSelectElement = document.getElementById("floor-color2") as HTMLSelectElement;
      return baseColorTwoSelector.value;
    })();

    console.log("Rendering:");

    if (ctx === null) {
      console.error("Canvas context not found");
      return;
    }

    windowWithRenderStarted.renderStarted = new Date().valueOf();

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    let blocks = partition(ctx.canvas.width, ctx.canvas.height, 8, 2);

    ctx.strokeStyle = "#999";

    blocks.forEach((block) => {
      ctx?.strokeRect(block.x, block.y, block.width, block.height);

      let worker = new Worker("./src/worker/worker.ts", { type: "module" });

      worker.addEventListener("message", handleMessageFromWorker);

      if (cancelButton !== null) {
        cancelButton.addEventListener("click", function () {
          worker.terminate();
          updateStatus(false);
        });
      }

      if (renderButton !== null) {
        worker.postMessage({
          command: "render",
          width: canvas?.width,
          height: canvas?.height,
          block: block,
          selectedScene: selectedScene,
          lightColor: lightColor,
          lightPositionX: lightPositionX,
          lightPositionY: lightPositionY,
          lightPositionZ: lightPositionZ,
          cameraPositionX: cameraPositionX,
          cameraPositionY: cameraPositionY,
          cameraPositionZ: cameraPositionZ,
          cameraToPosX,
          cameraToPosY,
          cameraToPosZ,
          backgroundColor,
          reflection,
          shine,
          basePattern,
          baseColorOne,
          baseColorTwo,
        });
        runningWorkers++;
      }
    });

    updateStatus(true);
  }

  function updateStatus(running: boolean) {
    if (renderButton !== null && cancelButton !== null) {
      renderButton.disabled = running;
      cancelButton.disabled = !running;
    }

    if (!running && windowWithRenderStarted.renderStarted != undefined) {
      let elapsed = new Date().valueOf() - windowWithRenderStarted.renderStarted;
      console.log(`Render completed in ${elapsed / 1000} seconds`);
    }
  }

  if (renderButton !== null) {
    renderButton.addEventListener("click", render);
    render();
  }
})();
