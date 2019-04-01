import { Component } from '@angular/core';
import { registerElement } from 'nativescript-angular';
import { ContentView, ShownModallyData } from 'tns-core-modules/ui/content-view';
import { Page } from 'tns-core-modules/ui/page/page';

const MODAL_COMPONENT_SELECTOR = 'kirby-modal';

@Component({
  selector: MODAL_COMPONENT_SELECTOR,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  closeCallback: Function;

  constructor() {
    console.log('gets to the constructor...');
    // super();
  }

  showingModally(args: ShownModallyData): void {
    this.closeCallback = args.closeCallback;
    const page = args.object as Page;
    page.content.set('backgroundColor', args.context.dim);

    page
      .animate({
        translate: { x: 0, y: Number(page.content.page.height) },
        duration: 0,
      })
      .then(() => {
        page.animate({
          translate: { x: 0, y: 50 },
          duration: 500,
        });
      });
  }

  buttonTap(): void {
    this.closeCallback('Return response here');
  }
}

registerElement(MODAL_COMPONENT_SELECTOR, () => require('./modal.component').ModalComponent);
