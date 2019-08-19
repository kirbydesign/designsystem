import { Component, Injector, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular';
import { ContentView, ShownModallyData, View } from 'tns-core-modules/ui/content-view';
import { screen } from 'tns-core-modules/platform';
import { AnimationCurve } from 'tns-core-modules/ui/enums';
import * as application from 'tns-core-modules/application';
declare const android;

import { ModalConfig } from './config/modal-config';
import { COMPONENT_PROPS } from './config/modal-config.helper';
import { IModalController } from '../services/modal.controller.interface';

declare var require: any;
const style: any = require('sass-extract-loader!./modal-wrapper.component.scss');

@Component({
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss'],
})
export class ModalWrapperComponent extends ContentView implements OnInit {
  config: ModalConfig;
  view: View;
  componentPropsInjector: Injector;
  outerPaddingTop = 0;
  innerMarginBottom = 0;
  isScreenWide = false;
  isScreenTall = false;
  private modalMaxHeight: number = 0;
  private modalMaxWidth: number = 0;
  isContentExceedingModalMaxHeight = false;

  constructor(
    private modalController: IModalController,
    private params: ModalDialogParams,
    injector: Injector
  ) {
    super();
    this.config = this.params.context;
    this.componentPropsInjector = Injector.create({
      providers: [{ provide: COMPONENT_PROPS, useValue: this.params.context.componentProps }],
      parent: injector,
    });
    this.modalController.register({ close: this.params.closeCallback });
  }

  ngOnInit(): void {
    // On iOS the modal never overlaps with the statusbar, hence we need no padding top (0)
    this.setAndroidPaddingAndMargin();
    this.setScreenSizeFlags();
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
    this.setMaxHeightConstraints();
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
              duration: 200,
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

        if (modalContainer.isLoaded) {
          // modalContainer may sometimes be loaded before reaching on('loaded')
          this.animateSlideUpOniOS(modalContainer, animationStartingY);
        } else {
          // modalContainer.on('loaded') prevents Error: Animation cancelled
          modalContainer.on('loaded', () => {
            this.animateSlideUpOniOS(modalContainer, animationStartingY);
            modalContainer.off('loaded');
          });
        }
      }
    }
  }

  private animateSlideUpOniOS(modalContainer: View, animationStartingY: number) {
    modalContainer.translateY = animationStartingY;
    modalContainer.animate({
      translate: { x: 0, y: 0 },
      curve: AnimationCurve.easeOut,
      duration: 200,
    });
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

  private setMaxHeightConstraints() {
    const modalView: View = this.view.getViewById('modal');
    this.setIsContentExceedingModalMaxHeight(modalView);
  }

  private setIsContentExceedingModalMaxHeight(modalView: View) {
    // TODO: this should be improved at some point
    // {N} allows us to get the height of the modal, but it comes after an uncertain delay
    setTimeout(() => {
      let height = modalView.getMeasuredHeight();
      if (height > 0) {
        this.isContentExceedingModalMaxHeight = height > this.modalMaxHeight;
      } else {
        this.setIsContentExceedingModalMaxHeight(modalView);
      }
    }, 1);
  }

  private setScreenSizeFlags() {
    this.modalMaxHeight = parseInt(style.global['$modal-max-height'].value);
    this.modalMaxWidth = parseInt(style.global['$modal-max-width'].value);
    this.isScreenTall = screen.mainScreen.heightDIPs >= this.modalMaxHeight;
    this.isScreenWide = screen.mainScreen.widthDIPs >= this.modalMaxWidth;
  }
}
