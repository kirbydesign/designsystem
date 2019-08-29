import { AnimationCurve } from 'tns-core-modules/ui/enums/enums';
import { screen } from 'tns-core-modules/platform';
import { View } from 'tns-core-modules/ui/page/page';

import { ViewHelper } from '../../../helpers/view-helper.tns-only';

export class NativeScriptAnimationHelper {
  animateSlideUpOnAndroid(view: View) {
    view
      .animate({
        translate: { x: 0, y: Number(view.height) },
        duration: 0,
      })
      .then(() => {
        view.animate({
          translate: { x: 0, y: 0 },
          duration: 200,
        });
      });
  }

  // Transitions enum: https://developer.apple.com/documentation/uikit/uimodaltransitionstyle
  setTransitionStyleIOS(view: View, transition: 0 | 1 | 2 | 3) {
    view.viewController.modalTransitionStyle = transition;
  }

  animateSlideUpOnIOS(view: View) {
    ViewHelper.invokeOnViewLoaded(view, this._animateSlideUpOnIOS.bind(this, view));
  }

  private _animateSlideUpOnIOS(view: View) {
    const animationStartingY = screen.mainScreen.heightDIPs;
    view.translateY = animationStartingY;
    view.animate({
      translate: { x: 0, y: 0 },
      curve: AnimationCurve.easeOut,
      duration: 200,
    });
  }
}
