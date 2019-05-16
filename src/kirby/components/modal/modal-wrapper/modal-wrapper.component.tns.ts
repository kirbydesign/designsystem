import { Component, Injector } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular';
import { ContentView, ShownModallyData, View } from 'tns-core-modules/ui/content-view';

import { ModalConfig } from './config/modal-config';
import { COMPONENT_PROPS, ModalConfigHelper } from './config/modal-config.helper';
import { IModalController } from '../services/modal.controller.interface';

@Component({
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss'],
})
export class ModalWrapperComponent extends ContentView {
  config: ModalConfig;
  view: View;
  componentPropsInjector: Injector;

  constructor(
    private modalController: IModalController,
    private params: ModalDialogParams,
    injector: Injector
  ) {
    super();
    this.config = ModalConfigHelper.processOptionalValues(this.params.context);
    this.componentPropsInjector = Injector.create({
      providers: [{ provide: COMPONENT_PROPS, useValue: this.params.context.componentProps }],
      parent: injector,
    });
    this.modalController.register({ close: this.params.closeCallback });
  }

  onShowingModally(args: ShownModallyData): void {
    this.view = <View>args.object;
    this.animateModal();
  }

  onModalDismiss(): void {
    this.modalController.hideTopmost();
  }

  // // TODO: fix animations
  // private animateBackgroundColor(stackLayout: StackLayout): void {
  //   const shadowColor = ColorHelper.getThemeColor('kirby-grey-7');
  //   stackLayout.backgroundColor = new Color(
  //     ColorHelper.getAlphaIn255Range(this.config.dim),
  //     shadowColor.r,
  //     shadowColor.g,
  //     shadowColor.b
  //   );
  //   stackLayout.color = new Color(ColorHelper.getThemeColor('kirby-brand-5').hex);
  // }

  private animateModal(): void {
    if (this.view.android) {
      this.view
        .animate({
          translate: { x: 0, y: Number(this.view.height) },
          duration: 0,
        })
        .then(() => {
          this.view.animate({
            translate: { x: 0, y: 0 },
            duration: 300,
          });
        });
    }
    // TODO: by default iOS slides up, however it slides together with the dimmed background, hence needs fixing
  }
}
