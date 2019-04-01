import { Component } from '@angular/core';
import { registerElement, ModalDialogParams } from 'nativescript-angular';
import { ContentView, ShownModallyData } from 'tns-core-modules/ui/content-view';
import { ExtendedShowModalOptions } from 'nativescript-windowed-modal/windowed-modal.common';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout/stack-layout';

const MODAL_COMPONENT_SELECTOR = 'kirby-modal';

// Selector was removed from the Component decorator because of the following error:
// https://stackoverflow.com/questions/51217201/error-in-modal-after-moving-project-files
@Component({
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent extends ContentView {
  extendedParams: ExtendedShowModalOptions;

  constructor(private params: ModalDialogParams) {
    super();
    this.extendedParams = params;
  }

  showingModally(args: ShownModallyData): void {
    const stackLayout = <StackLayout>args.object;
    stackLayout.backgroundColor = this.extendedParams.context.dim;
    console.log(stackLayout);

    if (stackLayout.android) {
      stackLayout
        .animate({
          translate: { x: 0, y: Number(stackLayout.height) },
          duration: 0,
        })
        .then(() => {
          stackLayout.animate({
            translate: { x: 0, y: 0 },
            duration: 500,
          });
        });
    }
  }

  buttonTap(): void {
    // this.extendedParams.closeCallback('some response...');
  }
}

registerElement(MODAL_COMPONENT_SELECTOR, () => require('./modal.component').ModalComponent);
