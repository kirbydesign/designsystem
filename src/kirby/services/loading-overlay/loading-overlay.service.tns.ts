import { Injectable } from '@angular/core';
import { isIOS, isAndroid } from '@kirbydesign/designsystem/services/platform/platform.service';
import { Color } from 'tns-core-modules/color/color';
import { LoadingOverlay } from './loading-overlay.interface';
import { ios } from 'tns-core-modules/utils/utils';
import { topmost } from 'tns-core-modules/ui/frame';
import { ColorHelper } from '@kirbydesign/designsystem/helpers/color-helper';

declare var android,
  UIApplication,
  UIView,
  CGRectMake,
  CGPointMake,
  UIActivityIndicatorView,
  UIActivityIndicatorViewStyle;

let loaderView;

@Injectable({
  providedIn: 'root',
})
export class LoadingOverlayService implements LoadingOverlay {
  showLoadingOverlay(message: string = 'Loading...') {
    if (loaderView) {
      return;
    }

    if (isIOS) {
        ios.getter(UIApplication, UIApplication.sharedApplication).beginIgnoringInteractionEvents();

        const currentView =  topmost().ios.controller.view;
        loaderView = UIView.alloc().initWithFrame(CGRectMake(0, 0, 90, 90));
        loaderView.center = currentView.center;
        loaderView.layer.cornerRadius = 4;

        const bgColor = ColorHelper.getThemeColor('background-color').hex.replace('#', '');
        loaderView.backgroundColor = new Color("#CC"+bgColor).ios;

        const indicator = UIActivityIndicatorView.alloc().initWithActivityIndicatorStyle(UIActivityIndicatorViewStyle.WhiteLarge);
        indicator.center = CGPointMake(45, 45);

        const indicatorColor = ColorHelper.getThemeColor('primary').hex;
        indicator.color = new Color(indicatorColor).ios;

        loaderView.addSubview(indicator);
        currentView.addSubview(loaderView);

        indicator.startAnimating();
    }

    if (isAndroid) {
        loaderView = android.app.ProgressDialog.show(UIApplication.android.foregroundActivity, '', message);
    }
  }

  hideLoadingOverlay() {
    if (!loaderView) {
      return;
    }

    if (isIOS) {
        loaderView.removeFromSuperview();
        ios.getter(UIApplication, UIApplication.sharedApplication).endIgnoringInteractionEvents();
    }

    if (isAndroid) {
        loaderView.dismiss();
    }

    loaderView = null;
  }
}
