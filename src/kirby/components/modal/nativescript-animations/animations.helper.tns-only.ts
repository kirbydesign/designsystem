import { AnimationCurve } from 'tns-core-modules/ui/enums/enums';
import { screen } from 'tns-core-modules/platform';
import { View } from 'tns-core-modules/ui/page/page';

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
    if (view.isLoaded) {
      // modalContainer may sometimes be loaded before reaching on('loaded')
      this._animateSlideUpOnIOS(view);
    } else {
      // modalContainer.on('loaded') prevents Error: Animation cancelled
      view.on('loaded', () => {
        this._animateSlideUpOnIOS(view);
        view.off('loaded');
      });
    }
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
