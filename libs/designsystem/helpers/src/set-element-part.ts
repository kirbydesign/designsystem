import { ElementRef, Injectable, Renderer2 } from '@angular/core';

@Injectable()
export class IonicElementPartService {
  constructor(private renderer: Renderer2) {}

  public async setPart(
    ionicElementRef: ElementRef,
    selector: string,
    partName: string,
    applyPartCondition?: (part: HTMLElement) => boolean
  ) {
    // Ensure custom element has been defined and rendered
    await customElements.whenDefined(ionicElementRef.nativeElement.localName);
    const customElement = await ionicElementRef.nativeElement.componentOnReady();

    const partElement: HTMLElement = customElement.shadowRoot.querySelector(selector);

    if (!partElement) return;
    if (typeof applyPartCondition === 'function' && !applyPartCondition(partElement)) return;

    this.renderer.setAttribute(partElement, 'part', partName);
  }
}
