import { Layer } from '../layers/layer';
import { Selection } from '../selection';
import { DataService } from '../services/data.service';

class MoveTool {
  readonly type: string = 'moveTool';
  mouseDownListener!: (e: any) => void;
  mouseMoveListener!: (e: any) => void;
  mouseUpListener!: (e: any) => void;

  configure(display: HTMLElement, data: DataService): void {
    let layerToMove: Layer | undefined;
    let mousedown = false;
    let rect: DOMRect;
    let zoom: number;
    let movingAllowed: boolean = data.isMovingAllowed.getValue();
    this.mouseDownListener = (e: any) => {
      console.log('mousedown');
      rect = display.getBoundingClientRect();
      zoom = data.zoom.getValue() / 100;
      const layers = data.layers.getValue();
      const selection = data.currentSelection.getValue();
      layerToMove = layers.find((layer) =>
        layer.contains(e.target as HTMLElement)
      );
      console.log('layerToMove', layerToMove);
      if (layerToMove) {
        console.log('there is layer to move');

        mousedown = true;
      }
    };
    this.mouseMoveListener = (e: any) => {
      if (!mousedown || !movingAllowed) {
        return;
      }
      if (layerToMove && !layerToMove.locked) {
        layerToMove.moveTo(
          (e.clientX - rect.left) / zoom,
          (e.clientY - rect.top) / zoom
        );
      }
    };
    this.mouseUpListener = (e: any) => {
      mousedown = false;
    };
    document.addEventListener('mousedown', this.mouseDownListener);
    document.addEventListener('mousemove', this.mouseMoveListener);
    document.addEventListener('mouseup', this.mouseUpListener);
  }
  disconfigure(): void {
    document.removeEventListener('mousedown', this.mouseDownListener);
    document.removeEventListener('mousemove', this.mouseMoveListener);
    document.removeEventListener('mouseup', this.mouseUpListener);
  }
}

export const moveTool = new MoveTool();
