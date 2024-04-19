import { Injectable } from '@angular/core';
import { Animation, AnimationBuilder, createAnimation } from '@ionic/angular/standalone';
import { PlatformService } from '@kirbydesign/designsystem/helpers';

import { KirbyAnimation } from '@kirbydesign/designsystem/helpers';

@Injectable({ providedIn: 'root' })
export class ModalAnimationBuilderService {
  constructor(private platform: PlatformService) {}

  private readonly easingEnter = KirbyAnimation.Easing.modal.enter;
  private readonly easingLeave = KirbyAnimation.Easing.modal.exit;
  private readonly duration = KirbyAnimation.Duration.LONG;
  private readonly SwipeToCloseDefaults = {
    MIN_PRESENTING_SCALE: 0.93,
  };

  public enterAnimation(currentBackdrop?: HTMLIonBackdropElement): AnimationBuilder {
    return (baseEl: HTMLElement, opts: { presentingEl?: HTMLElement }): Animation => {
      const { presentingEl } = opts;
      const root = this.getElementRoot(baseEl);
      const { wrapperAnimation, backdropAnimation } = this.createEnterAnimation();

      backdropAnimation.addElement(root.querySelector('ion-backdrop')!);

      wrapperAnimation
        .addElement(root.querySelectorAll('.modal-wrapper, .modal-shadow')!)
        .beforeStyles({ opacity: 1 });

      const baseAnimation = createAnimation('entering-base')
        .addElement(baseEl)
        .easing(this.easingEnter)
        .duration(this.duration)
        .addAnimation(wrapperAnimation);

      let currentBackdropAnimation: Animation;
      if (currentBackdrop) {
        currentBackdropAnimation = createAnimation()
          .addElement(currentBackdrop)
          .fromTo('opacity', 'var(--backdrop-opacity)', 0.01);
      }

      if (presentingEl) {
        const isMobile = !this.platform.isPhabletOrBigger();
        const hasCardModal =
          presentingEl.tagName === 'ION-MODAL' &&
          (presentingEl as HTMLIonModalElement).presentingElement !== undefined;
        const presentingElRoot = this.getElementRoot(presentingEl);

        const presentingAnimation = createAnimation().beforeStyles({
          transform: 'translateY(0)',
          'transform-origin': 'top center',
          overflow: 'hidden',
        });

        const bodyEl = document.body;

        if (isMobile) {
          /**
           * Fallback for browsers that does not support `max()` (ex: Firefox)
           * No need to worry about statusbar padding since engines like Gecko
           * are not used as the engine for standalone Cordova/Capacitor apps
           */
          const transformOffset = !CSS.supports('width', 'max(0px, 1px)')
            ? '30px'
            : 'max(30px, var(--ion-safe-area-top))';
          const modalTransform = hasCardModal ? '-10px' : transformOffset;
          const toPresentingScale = this.SwipeToCloseDefaults.MIN_PRESENTING_SCALE;
          const finalTransform = `translateY(${modalTransform}) scale(${toPresentingScale})`;

          presentingAnimation
            .afterStyles({
              transform: finalTransform,
            })
            .beforeAddWrite(() => bodyEl.style.setProperty('background-color', 'black'))
            .addElement(presentingEl)
            .keyframes([
              {
                offset: 0,
                filter: 'contrast(1)',
                transform: 'translateY(0px) scale(1)',
                borderRadius: '0px',
              },
              {
                offset: 1,
                filter: 'contrast(0.85)',
                transform: finalTransform,
                borderRadius: '10px 10px 0 0',
              },
            ]);

          baseAnimation.addAnimation(presentingAnimation);
        } else {
          baseAnimation.addAnimation(backdropAnimation);

          if (currentBackdropAnimation) {
            baseAnimation.addAnimation(currentBackdropAnimation);
          }

          if (!hasCardModal) {
            wrapperAnimation.fromTo('opacity', '0', '1');
          } else {
            const toPresentingScale = hasCardModal
              ? this.SwipeToCloseDefaults.MIN_PRESENTING_SCALE
              : 1;
            const finalTransform = `translateY(-10px) scale(${toPresentingScale})`;

            presentingAnimation
              .afterStyles({
                transform: finalTransform,
              })
              .addElement(presentingElRoot.querySelector('.modal-wrapper')!)
              .keyframes([
                { offset: 0, filter: 'contrast(1)', transform: 'translateY(0) scale(1)' },
                { offset: 1, filter: 'contrast(0.85)', transform: finalTransform },
              ]);

            const shadowAnimation = createAnimation()
              .afterStyles({
                transform: finalTransform,
              })
              .addElement(presentingElRoot.querySelector('.modal-shadow')!)
              .keyframes([
                { offset: 0, opacity: '1', transform: 'translateY(0) scale(1)' },
                { offset: 1, opacity: '0', transform: finalTransform },
              ]);

            baseAnimation.addAnimation([presentingAnimation, shadowAnimation]);
          }
        }
      } else {
        baseAnimation.addAnimation(backdropAnimation);
        if (currentBackdropAnimation) {
          baseAnimation.addAnimation(currentBackdropAnimation);
        }
      }

      return baseAnimation;
    };
  }

  public leaveAnimation(currentBackdrop?: HTMLIonBackdropElement): AnimationBuilder {
    return (
      baseEl: HTMLElement,
      opts: { presentingEl?: HTMLElement },
      duration = this.duration
    ): Animation => {
      const { presentingEl } = opts;
      const root = this.getElementRoot(baseEl);
      const { wrapperAnimation, backdropAnimation } = this.createLeaveAnimation();

      backdropAnimation.addElement(root.querySelector('ion-backdrop')!);

      wrapperAnimation
        .addElement(root.querySelectorAll('.modal-wrapper, .modal-shadow')!)
        .beforeStyles({ opacity: 1 });

      const baseAnimation = createAnimation('leaving-base')
        .addElement(baseEl)
        .easing(this.easingLeave)
        .duration(duration)
        .addAnimation(wrapperAnimation);

      let currentBackdropAnimation: Animation;
      if (currentBackdrop) {
        currentBackdropAnimation = createAnimation()
          .addElement(currentBackdrop)
          .fromTo('opacity', 0.01, 'var(--backdrop-opacity)')
          .afterStyles({ opacity: 'var(--backdrop-opacity)' }); //Ensures backdrop is reset to default opacity after swipe to close
      }

      if (presentingEl) {
        const isMobile = !this.platform.isPhabletOrBigger();
        const hasCardModal =
          presentingEl.tagName === 'ION-MODAL' &&
          (presentingEl as HTMLIonModalElement).presentingElement !== undefined;
        const presentingElRoot = this.getElementRoot(presentingEl);

        const presentingAnimation = createAnimation()
          .beforeClearStyles(['transform'])
          .afterClearStyles(['transform'])
          .onFinish((currentStep) => {
            // only reset background color if this is the last card-style modal
            if (currentStep !== 1) {
              return;
            }

            presentingEl.style.setProperty('overflow', '');

            const numModals = Array.from(bodyEl.querySelectorAll('ion-modal')).filter(
              (m) => m.presentingElement !== undefined
            ).length;
            if (numModals <= 1) {
              bodyEl.style.setProperty('background-color', '');
            }
          });

        const bodyEl = document.body;

        if (isMobile) {
          const transformOffset = !CSS.supports('width', 'max(0px, 1px)')
            ? '30px'
            : 'max(30px, var(--ion-safe-area-top))';
          const modalTransform = hasCardModal ? '-10px' : transformOffset;
          const toPresentingScale = this.SwipeToCloseDefaults.MIN_PRESENTING_SCALE;
          const finalTransform = `translateY(${modalTransform}) scale(${toPresentingScale})`;

          presentingAnimation.addElement(presentingEl).keyframes([
            {
              offset: 0,
              filter: 'contrast(0.85)',
              transform: finalTransform,
              borderRadius: '10px 10px 0 0',
            },
            {
              offset: 1,
              filter: 'contrast(1)',
              transform: 'translateY(0px) scale(1)',
              borderRadius: '0px',
            },
          ]);

          baseAnimation.addAnimation(presentingAnimation);
        } else {
          baseAnimation.addAnimation(backdropAnimation);
          if (currentBackdropAnimation) {
            baseAnimation.addAnimation(currentBackdropAnimation);
          }

          if (!hasCardModal) {
            wrapperAnimation.fromTo('opacity', '1', '0');
          } else {
            const toPresentingScale = hasCardModal
              ? this.SwipeToCloseDefaults.MIN_PRESENTING_SCALE
              : 1;
            const finalTransform = `translateY(-10px) scale(${toPresentingScale})`;

            presentingAnimation
              .addElement(presentingElRoot.querySelector('.modal-wrapper')!)
              .afterStyles({
                transform: 'translate3d(0, 0, 0)',
              })
              .keyframes([
                { offset: 0, filter: 'contrast(0.85)', transform: finalTransform },
                { offset: 1, filter: 'contrast(1)', transform: 'translateY(0) scale(1)' },
              ]);

            const shadowAnimation = createAnimation()
              .addElement(presentingElRoot.querySelector('.modal-shadow')!)
              .afterStyles({
                transform: 'translateY(0) scale(1)',
              })
              .keyframes([
                { offset: 0, opacity: '0', transform: finalTransform },
                { offset: 1, opacity: '1', transform: 'translateY(0) scale(1)' },
              ]);

            baseAnimation.addAnimation([presentingAnimation, shadowAnimation]);
          }
        }
      } else {
        baseAnimation.addAnimation(backdropAnimation);
        if (currentBackdropAnimation) {
          baseAnimation.addAnimation(currentBackdropAnimation);
        }
      }

      return baseAnimation;
    };
  }

  private createEnterAnimation = () => {
    const backdropAnimation = createAnimation()
      .fromTo('opacity', 0.01, 'var(--backdrop-opacity)')
      .beforeStyles({
        'pointer-events': 'none',
      })
      .afterClearStyles(['pointer-events']);

    const wrapperAnimation = createAnimation().fromTo(
      'transform',
      'translateY(100vh)',
      'translateY(0vh)'
    );

    return { backdropAnimation, wrapperAnimation };
  };

  private createLeaveAnimation = () => {
    const backdropAnimation = createAnimation().fromTo('opacity', 'var(--backdrop-opacity)', 0);

    const wrapperAnimation = createAnimation().fromTo(
      'transform',
      'translateY(0vh)',
      'translateY(100vh)'
    );

    return { backdropAnimation, wrapperAnimation };
  };

  /**
   * Gets the root context of a shadow dom element
   * On newer browsers this will be the shadowRoot,
   * but for older browser this may just be the
   * element itself.
   *
   * Useful for whenever you need to explicitly
   * do "myElement.shadowRoot!.querySelector(...)".
   */
  private getElementRoot = (el: HTMLElement, fallback: HTMLElement = el) => {
    return el.shadowRoot || fallback;
  };
}
