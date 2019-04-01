import { Component } from '@angular/core';
import { registerElement, ModalDialogParams } from 'nativescript-angular';
import { ContentView, View, EventData, Color } from 'tns-core-modules/ui/content-view';

const MODAL_COMPONENT_SELECTOR = 'kirby-modal';

// Selector was removed from the Component decorator because of the following error:
// https://stackoverflow.com/questions/51217201/error-in-modal-after-moving-project-files
@Component({
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent extends ContentView {
  view: View;
  closeCallback: Function;

  constructor(private params: ModalDialogParams) {
    super();
  }

  onViewLoaded(args: EventData) {
    this.view = <View>args.object;
    this.showingModally();
  }

  showingModally(): void {
    // const page = args.object as Page;
    // page.content.set('backgroundColor', args.context.dim);
    // page.content.set('backgroundColor', 'cornflowerblue');

    // this.view.backgroundColor = new Color('red');
    if (this.view.android) {
      this.view.animate({ translate: { x: 0, y: 500 }, duration: 0 }).then(() => {
        this.view.animate({ translate: { x: 0, y: 0 }, duration: 200 });
      });
    }
    // if (this.view.android) {
    //   let nativeView = this.view.android;
    //   nativeView
    //     .animate({
    //       translate: { x: 0, y: 500 },
    //       duration: 0,
    //     })
    //     .then(() => {
    //       nativeView.animate({
    //         translate: { x: 0, y: 50 },
    //         duration: 500,
    //       });
    //     });
    // } else {
    //   let nativeView = this.view.ios;
    //   console.log('page!!!!!!!!!!!!');
    //   console.log(nativeView);
    // }

    // page
    //   .animate({
    //     translate: { x: 0, y: Number(page.content.page.height) },
    //     duration: 0,
    //   })
    //   .then(() => {
    //     page.animate({
    //       translate: { x: 0, y: 50 },
    //       duration: 500,
    //     });
    //   });
  }

  buttonTap(): void {
    this.params.closeCallback('Return response here...');
  }
}

registerElement(MODAL_COMPONENT_SELECTOR, () => require('./modal.component').ModalComponent);
