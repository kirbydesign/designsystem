import { Color } from 'tns-core-modules/color';
import { Component, ViewContainerRef } from '@angular/core';
import { registerElement, ModalDialogParams } from 'nativescript-angular';
import { ContentView, ShownModallyData } from 'tns-core-modules/ui/content-view';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout/stack-layout';

import { ModalContent } from './modal-content';

const MODAL_COMPONENT_SELECTOR = 'kirby-modal';
const style: any = require('sass-extract-loader!./modal.component.scss');

// Selector was removed from the Component decorator because of the following issue:
// https://stackoverflow.com/questions/51217201/error-in-modal-after-moving-project-files
@Component({
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent extends ContentView {
  context: ModalContent;

  constructor(private params: ModalDialogParams, private viewContainer: ViewContainerRef) {
    super();
    this.context = params.context;
  }

  showModally(args: ShownModallyData): void {
    const stackLayout = <StackLayout>args.object;
    this.animateModal(stackLayout);
    this.setBackgroundColor(stackLayout);
  }

  closeModal(): void {
    this.params.closeCallback('closed');
  }

  private setBackgroundColor(stackLayout: StackLayout): void {
    const shadowColor = this.getThemeColor('kirby-grey-7');
    stackLayout.backgroundColor = new Color(
      this.getAlphaIn255Range(this.context.dim),
      shadowColor.r,
      shadowColor.g,
      shadowColor.b
    );
    stackLayout.color = new Color(this.getThemeColor('kirby-brand-5').hex);
  }

  private getAlphaIn255Range(alpha: number): number {
    const defaultAlpha = 0.9;
    if (!alpha) {
      return defaultAlpha;
    }
    if (alpha <= 0) {
      return 255;
    } else if (alpha >= 1) {
      return 0;
    } else {
      return alpha * 25500;
    }
  }

  private animateModal(stackLayout: StackLayout): void {
    if (stackLayout.android) {
      stackLayout
        .animate({
          translate: { x: 0, y: Number(stackLayout.height) },
          duration: 0,
        })
        .then(() => {
          stackLayout.animate({
            translate: { x: 0, y: 0 },
            duration: 200,
          });
        });
    }
    // this is a default behaviour in iOS
  }

  // TODO: move this common function in a utility class
  private getThemeColor(name: string) {
    return style.global['$kirby-colors'].value[name].value;
  }
}

registerElement(MODAL_COMPONENT_SELECTOR, () => require('./modal.component').ModalComponent);
