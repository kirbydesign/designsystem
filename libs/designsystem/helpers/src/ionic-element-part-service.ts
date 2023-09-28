import { ElementRef, Injectable, Renderer2 } from '@angular/core';

@Injectable()
export class IonicElementPartService {
  constructor(private renderer: Renderer2) {}

  public async setPart(partName: string, ionicElementRef: ElementRef, selector: string) {
    // Ensure custom element has been defined and rendered
    await customElements.whenDefined(ionicElementRef.nativeElement.localName);
    const customElement = await ionicElementRef.nativeElement.componentOnReady();

    const partElement: HTMLElement = customElement.shadowRoot.querySelector(selector);
    if (!partElement) return;

    this.renderer.setAttribute(partElement, 'part', partName);
  }
}
