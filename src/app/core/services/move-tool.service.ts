import { Injectable, Renderer2 } from '@angular/core';
import { Layer } from '../layers/layer';
import { DataService } from './data.service';
import { ToolService } from './tool.service';

@Injectable({
  providedIn: 'root',
})
export class MoveToolService {
  private mouseDownListenter?: () => void;
  private mouseUpListenter?: () => void;
  private mouseMoveListenter?: () => void;
  constructor(private data: DataService, private toolService: ToolService) {}
  configure(display: HTMLElement, renderer: Renderer2) {
    this.toolService.disconfigureTools();
    let mousedown = false;
    let rect: DOMRect;
    let zoom: number;
    let layerToMove: Layer;
    this.mouseDownListenter = renderer.listen(display, 'mousedown', (e) => {
      mousedown = true;
      rect = display.getBoundingClientRect();
      zoom = this.data.zoom.getValue() / 100;
      const layers = this.data.layers.getValue();

      for (let i = 0; i < layers.length; i++) {
        const layer = layers[i];
        if (layer.contains(e.target)) {
          layerToMove = layer;
        }
      }
    });
    this.mouseUpListenter = renderer.listen(document, 'mouseup', (e) => {
      mousedown = false;
    });
    this.mouseMoveListenter = renderer.listen(document, 'mousemove', (e) => {
      if (!mousedown) {
        return;
      }
      const x = (e.clientX - rect.left) / zoom;
      const y = (e.clientY - rect.top) / zoom;

      if (!layerToMove) {
        return;
      }

      layerToMove.moveTo(x, y);
    });
  }
  disconfigure() {
    if (this.mouseDownListenter) {
      this.mouseDownListenter();
    }
    if (this.mouseMoveListenter) {
      this.mouseMoveListenter();
    }
    if (this.mouseUpListenter) {
      this.mouseUpListenter();
    }
  }
  centerSelectedObjVertical() {
    const selectedLayers = this.data.selectedLayers.getValue();
    selectedLayers.forEach((layer) => {
      const display = this.data.displayElem.getValue();
      layer.elem.style.top =
        display!.clientHeight / 2 - layer.elem.clientHeight / 2 + 'px';
    });
  }
  centerSelectedObjHorizontal() {
    const selectedLayers = this.data.selectedLayers.getValue();

    selectedLayers.forEach((layer) => {
      const display = this.data.displayElem.getValue();

      layer.elem.style.left =
        display!.clientWidth / 2 - layer.elem.clientWidth / 2 + 'px';
    });
  }
  alignTop() {
    const selectedLayers = this.data.selectedLayers.getValue();

    selectedLayers.forEach((layer) => {
      layer.elem.style.top = '0px';
    });
  }
  alignLeft() {
    const selectedLayers = this.data.selectedLayers.getValue();

    selectedLayers.forEach((layer) => {
      layer.elem.style.left = '0px';
    });
  }
  alignRight() {
    const selectedLayers = this.data.selectedLayers.getValue();

    selectedLayers.forEach((layer) => {
      const display = this.data.displayElem.getValue();
      // layer.elem.style.left =
      // display!.clientWidth - layer.elem.clientWidth + 'px';
    });
  }
  alignBottom() {
    const display = this.data.displayElem.getValue();
    const selectedLayers = this.data.selectedLayers.getValue();

    selectedLayers.forEach((layer) => {
      layer.elem.style.top =
        display!.clientHeight - layer.elem.clientHeight + 'px';
    });
  }
}