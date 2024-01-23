import { ElementRef, Injectable, Renderer2 } from '@angular/core';
import { componentOnReady } from '@ionic/core';

@Injectable()
export class IonicElementPartHelper {
  constructor(private renderer: Renderer2) {}

  public async setPart(partName: string, ionicElementRef: ElementRef, selector: string) {
    // Ensure custom element has been defined and rendered
    await customElements.whenDefined(ionicElementRef.nativeElement.localName);
    const customElement = await new Promise<HTMLElement>((resolve) => {
      componentOnReady(ionicElementRef.nativeElement, (element) => resolve(element));
    });

    const partElement: HTMLElement = customElement.shadowRoot.querySelector(selector);
    if (!partElement) return;

    this.renderer.setAttribute(partElement, 'part', partName);
  }
}
