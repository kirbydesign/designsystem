import { Component, Injector, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular';
import { ContentView, ShownModallyData, View } from 'tns-core-modules/ui/content-view';
import { screen } from 'tns-core-modules/platform';
import { AnimationCurve } from 'tns-core-modules/ui/enums';
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

  private animateModal(): void {
    if (this.view.android) {
      if (this.config.flavor === 'drawer') {
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
    } else if (this.view.ios) {
      const viewController = this.view.viewController;
      // modalTransitionStyle=2 is a fade-in animation
      viewController.modalTransitionStyle = 2;
      if (this.config.flavor === 'drawer') {
        // TODO: the animation starting point should be dependent on the context - bottom of the opening element
        const animationStartingY = screen.mainScreen.heightDIPs;
        const modalContainer = <View>this.view.getViewById('modal');
        // setTimeout prevents an error caused by {N} on iOS when calling animate
        // https://github.com/NativeScript/nativescript-angular/issues/431

        setTimeout(() => {
          modalContainer.opacity = 0;
          modalContainer
            .animate({
              translate: { x: 0, y: animationStartingY },
              duration: 0,
            })
            .then(() => {
              modalContainer.opacity = 1;
              modalContainer.animate({
                translate: { x: 0, y: 0 },
                curve: AnimationCurve.easeOut,
                duration: 300,
              });
            });
        });
      }
    }
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
