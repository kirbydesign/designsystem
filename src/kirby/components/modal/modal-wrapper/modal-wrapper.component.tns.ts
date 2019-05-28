import { Component, Injector, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular';
import { ContentView, ShownModallyData, View } from 'tns-core-modules/ui/content-view';
import { screen } from 'tns-core-modules/platform';
import * as application from 'tns-core-modules/application';
declare const android;

import { ModalConfig } from './config/modal-config';
import { COMPONENT_PROPS, ModalConfigHelper } from './config/modal-config.helper';
import { IModalController } from '../services/modal.controller.interface';

@Component({
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss'],
})
export class ModalWrapperComponent extends ContentView implements OnInit {
  config: ModalConfig;
  view: View;
  componentPropsInjector: Injector;
  outerPaddingTop = 32;
  innerMarginBottom = 0;

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

  ngOnInit(): void {
    this.setAndroidPaddingAndMargin();
  }

  setAndroidPaddingAndMargin() {
    if (application.android) {
      const additionalDP = 12;
      this.outerPaddingTop = this.getStatusBarHeight() + additionalDP;
      const navBarHeight = this.getNavBarHeight();
      if (navBarHeight > 0) {
        this.innerMarginBottom = navBarHeight - additionalDP;
      } else {
        this.innerMarginBottom = additionalDP;
      }
    }
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

  getStatusBarHeight() {
    var result = 0;
    if (application.android) {
      var resourceId = application.android.context
        .getResources()
        .getIdentifier('status_bar_height', 'dimen', 'android');
      if (resourceId) {
        const screenScale = screen.mainScreen.scale;
        const pixelValue = application.android.context.getResources().getDimension(resourceId);
        result = pixelValue / screenScale;
      }
    }
    return result;
  }

  getNavBarHeight() {
    if (application.android) {
      let navBarHeight = 0;
      let windowManager = application.android.context.getSystemService(
        android.content.Context.WINDOW_SERVICE
      );
      const defaultDisplay = windowManager.getDefaultDisplay();

      const realDisplayMetrics = new android.util.DisplayMetrics();
      defaultDisplay.getRealMetrics(realDisplayMetrics);

      const realHeight = realDisplayMetrics.heightPixels;
      const realWidth = realDisplayMetrics.widthPixels;

      const displayMetrics = new android.util.DisplayMetrics();
      defaultDisplay.getMetrics(displayMetrics);

      const displayHeight = displayMetrics.heightPixels;
      const displayWidth = displayMetrics.widthPixels;

      if (realHeight - displayHeight > 0) {
        // Portrait
        navBarHeight = realHeight - displayHeight;
      } else if (realWidth - displayWidth > 0) {
        // Landscape
        navBarHeight = realWidth - displayWidth;
      }

      // Convert to device independent pixels and return
      return navBarHeight / application.android.context.getResources().getDisplayMetrics().density;
    }
    return 0;
  }
}
