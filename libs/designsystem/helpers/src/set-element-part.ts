import { ElementRef, Injectable, Renderer2 } from '@angular/core';

@Injectable()
export class IonicElementPartService {
  constructor(private renderer: Renderer2) {}

  public setPart(customElementRef: ElementRef, selector: string, partName: string) {
    // Ensure custom element has been defined
    customElements.whenDefined(customElementRef.nativeElement.localName).then(() => {
      customElementRef.nativeElement.componentOnReady().then((customElement) => {
        const partElement: HTMLElement = customElement.shadowRoot.querySelector(selector);
        if (partElement) {
          this.renderer.addClass(customElement, 'multiline');
          this.renderer.setAttribute(partElement, 'part', partName);
        }
      });
    });
  }
}
