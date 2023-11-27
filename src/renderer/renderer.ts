import { Scene } from "../modules/scene";

class Renderer {
  canvasWidth: number;
  canvasHeight: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  render(scene: Scene, callback: Function, block: { x?: number; width?: number; y?: number; height?: number } | undefined): void {
    let xMin = block && block.x ? block.x : 0;
    let xMax = block && block.width ? xMin + block.width : this.canvasWidth;
    let yMin = block && block.y ? block.y : 0;
    let yMax = block && block.height ? yMin + block.height : this.canvasHeight;
    console.log(`Rendering block (${xMin}, ${yMin}) => (${xMax}, ${yMax})`);
    for (let pixelY = yMin; pixelY < yMax; pixelY++) {
      for (let pixelX = xMin; pixelX < xMax; pixelX++) {
        let sceneX = pixelX / this.canvasWidth - 0.5;
        let sceneY = pixelY / this.canvasHeight - 0.5;
        let pixelColor = scene.trace(sceneX, sceneY);
        callback(pixelX, pixelY, pixelColor);
      }
    }
  }
}

export { Renderer };
