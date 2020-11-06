import { tick, fakeAsync } from '@angular/core/testing';
import { IonContent } from '@ionic/angular';
import { Spectator } from '@ngneat/spectator';

import { KirbyAnimation } from '../../../animation/kirby-animation';
import { TestHelper } from '../../../testing/test-helper';
import { IconComponent } from '../../icon/icon.component';
import { ModalWrapperComponent } from './modal-wrapper.component';
import {
  DynamicFooterEmbeddedComponent,
  ModalWrapperTestBuilder,
} from './modal-wrapper.testbuilder';

describe('ModalWrapperComponent', () => {
  const modalWrapperTestBuilder = new ModalWrapperTestBuilder();
  let spectator: Spectator<ModalWrapperComponent>;

  it('should create', () => {
    spectator = modalWrapperTestBuilder.build();

    expect(spectator.component).toBeTruthy();
    // Ensure any observers are destroyed:
    spectator.fixture.destroy();
  });

  describe('title', () => {
    beforeEach(() => {
      spectator = modalWrapperTestBuilder
        .title('Test title')
        .flavor('modal')
        .build();
    });

    afterEach(() => {
      // Ensure any observers are destroyed:
      spectator.fixture.destroy();
    });

    it('should render', () => {
      expect(spectator.component.config.title).toEqual('Test title');
    });

    it('should have css class "drawer" when drawer flavor is used', () => {
      spectator.component.config.flavor = 'drawer';
      spectator.detectChanges();
      const rootElement: HTMLElement = spectator.element;
      expect(rootElement.classList).toContain('drawer');
    });

    it('should have font size "m" when drawer flavor is used', () => {
      spectator.component.config.flavor = 'drawer';
      spectator.detectChanges();
      const rootElement: HTMLElement = spectator.element;
      const title = rootElement.querySelector('ion-title');
      expect(window.getComputedStyle(title).fontSize).toEqual('18px');
    });
  });

  describe('close button', () => {
    beforeEach(() => {
      spectator = modalWrapperTestBuilder.build();
    });

    afterEach(() => {
      // Ensure any observers are destroyed:
      spectator.fixture.destroy();
    });

    it('should render as a close icon by default', () => {
      spectator.component.config.flavor = 'modal';
      spectator.detectChanges();
      var el = spectator.query(IconComponent);
      expect(el.name).toBe('close');
    });

    it("should render arrow-down when flavor is set to 'drawer'", () => {
      spectator.component.config.flavor = 'drawer';
      spectator.detectChanges();
      var el = spectator.query(IconComponent);
      expect(el.name).toBe('arrow-down');
    });
  });

  describe('supplementary button', () => {
    beforeEach(() => {
      spectator = modalWrapperTestBuilder.build();
    });

    afterEach(() => {
      // Ensure any observers are destroyed:
      spectator.fixture.destroy();
    });

    it('should not render if an icon was provided, but the flavor is modal', () => {
      spectator.component.config.flavor = 'modal';
      spectator.component.config.drawerSupplementaryAction = { iconName: 'qr', action: undefined };
      spectator.detectChanges();
      const elements = spectator.queryAll(IconComponent);
      expect(elements.length).toBe(1);
      expect(elements[0].name).toBe('close');
    });

    it('should render as the provided icon when flavor is drawer', () => {
      spectator.component.config.flavor = 'drawer';
      spectator.component.config.drawerSupplementaryAction = { iconName: 'qr', action: undefined };
      spectator.detectChanges();
      const elements = spectator.queryAll(IconComponent);
      expect(elements.length).toBe(2);
      expect(elements[0].name).toBe('arrow-down');
      expect(elements[1].name).toBe('qr');
    });

    it('should invoke the provided callback on select', () => {
      spectator.component.config.flavor = 'drawer';
      spectator.component.config.drawerSupplementaryAction = {
        iconName: 'qr',
        action: (_: any) => {},
      };
      spyOn(spectator.component.config.drawerSupplementaryAction, 'action');

      spectator.detectChanges();
      spectator.dispatchMouseEvent('ion-buttons[slot="end"] button[kirby-button]', 'click');
      expect(spectator.component.config.drawerSupplementaryAction.action).toHaveBeenCalled();
    });
  });

  describe('scrollToTop', () => {
    beforeEach(() => {
      spectator = modalWrapperTestBuilder.build();
    });

    afterEach(() => {
      // Ensure any observers are destroyed:
      spectator.fixture.destroy();
    });

    it('should scroll to top with no scroll animation duration', () => {
      const ionContent: IonContent = spectator.query(IonContent);
      spyOn(ionContent, 'scrollToTop');
      spectator.component.scrollToTop();
      expect(ionContent.scrollToTop).toHaveBeenCalledWith(0);
    });

    it('should scroll to top with provided scroll animation duration', () => {
      const animationDuration = KirbyAnimation.Duration.LONG;
      const ionContent: IonContent = spectator.query(IonContent);
      spyOn(ionContent, 'scrollToTop');

      spectator.component.scrollToTop(animationDuration);

      expect(ionContent.scrollToTop).toHaveBeenCalledWith(animationDuration);
    });
  });

  describe('scrollToBottom', () => {
    beforeEach(() => {
      spectator = modalWrapperTestBuilder.build();
    });

    afterEach(() => {
      // Ensure any observers are destroyed:
      spectator.fixture.destroy();
    });

    it('should scroll to bottom with no scroll animation duration', () => {
      const ionContent: IonContent = spectator.query(IonContent);
      spyOn(ionContent, 'scrollToBottom');

      spectator.component.scrollToBottom();

      expect(ionContent.scrollToBottom).toHaveBeenCalledWith(0);
    });

    it('should scroll to bottom with provided scroll animation duration', () => {
      const animationDuration = KirbyAnimation.Duration.LONG;
      const ionContent: IonContent = spectator.query(IonContent);
      spyOn(ionContent, 'scrollToBottom');

      spectator.component.scrollToBottom(animationDuration);

      expect(ionContent.scrollToBottom).toHaveBeenCalledWith(animationDuration);
    });
  });

  describe('disable scroll Y', () => {
    beforeEach(() => {
      spectator = modalWrapperTestBuilder.build();
    });

    afterEach(() => {
      // Ensure any observers are destroyed:
      spectator.fixture.destroy();
    });

    it('should disable scroll Y', () => {
      const ionContent: IonContent = spectator.query(IonContent);
      spectator.component.scrollDisabled = true;
      expect(ionContent.scrollY).toBeFalse();
    });
  });

  describe('with embedded component with static footer', () => {
    beforeEach(() => {
      spectator = modalWrapperTestBuilder.withStaticFooter().build();
      spectator.detectChanges();
    });

    afterEach(() => {
      // Ensure any observers are destroyed:
      spectator.fixture.destroy();
    });

    it('should move embedded footer to wrapper component', () => {
      const ionContentElement = spectator.query('ion-content');
      const embeddedComponentElement = ionContentElement.firstElementChild;
      const embeddedFooter = embeddedComponentElement.querySelector('kirby-modal-footer');
      expect(embeddedFooter).toBeNull();
      const footerAsWrapperChild = spectator.element.querySelector(':scope > kirby-modal-footer');
      expect(footerAsWrapperChild).not.toBeNull();
    });

    it('should define custom CSS property --keyboard-offset on embedded footer', () => {
      const kirbyModalFooter = spectator.element.querySelector(':scope > kirby-modal-footer');
      spectator.component._onKeyboardWillShow({ detail: { keyboardHeight: 200 } });
      expect(kirbyModalFooter).toHaveStyle({ '--keyboard-offset': '200px' });
    });
  });

  describe('with embedded component with dynamic footer', () => {
    beforeEach(() => {
      spectator = modalWrapperTestBuilder
        .flavor('modal')
        .withDynamicFooter()
        .build();
      spectator.detectComponentChanges();
    });

    afterEach(() => {
      // Ensure any observers are destroyed:
      spectator.fixture.destroy();
    });

    it('should move embedded footer to wrapper component when rendered', (done) => {
      const footer = spectator.element.querySelector('kirby-modal-footer');
      expect(footer).toBeNull();

      const embeddedComponent = spectator.query(DynamicFooterEmbeddedComponent);

      embeddedComponent.showFooter = true;
      spectator.detectChanges();

      setTimeout(() => {
        const ionContentElement = spectator.query('ion-content');
        const embeddedComponentElement = ionContentElement.firstElementChild;
        const embeddedFooter = embeddedComponentElement.querySelector('kirby-modal-footer');
        expect(embeddedFooter).toBeNull();
        const footerAsWrapperChild = spectator.element.querySelector(':scope > kirby-modal-footer');
        expect(footerAsWrapperChild).not.toBeNull();
        done();
      });
    });

    it('should remove embedded footer from wrapper component when not rendered', (done) => {
      const footer = spectator.element.querySelector('kirby-modal-footer');
      expect(footer).toBeNull();

      const embeddedComponent = spectator.query(DynamicFooterEmbeddedComponent);
      embeddedComponent.showFooter = true;
      spectator.detectChanges();

      setTimeout(() => {
        const footerAsWrapperChild = spectator.element.querySelector(':scope > kirby-modal-footer');
        expect(footerAsWrapperChild).not.toBeNull();

        embeddedComponent.showFooter = false;
        spectator.detectChanges();

        setTimeout(() => {
          const footer = spectator.element.querySelector('kirby-modal-footer');
          expect(footer).toBeNull();
          done();
        });
      });
    });

    it('should render changes to embedded footer inside wrapper component', (done) => {
      const footer = spectator.element.querySelector('kirby-modal-footer');
      expect(footer).not.toHaveClass('enabled');
      const embeddedComponent = spectator.query(DynamicFooterEmbeddedComponent);
      embeddedComponent.showFooter = true;
      spectator.detectChanges();
      setTimeout(() => {
        const ionContentElement = spectator.query('ion-content');
        const embeddedComponentElement = ionContentElement.firstElementChild;
        const embeddedFooter = embeddedComponentElement.querySelector('kirby-modal-footer');
        expect(embeddedFooter).toBeNull();
        const footerAsWrapperChild = spectator.element.querySelector(':scope > kirby-modal-footer');
        expect(footerAsWrapperChild).not.toBeNull();

        embeddedComponent.isEnabled = true;
        spectator.detectChanges();
        expect(footerAsWrapperChild).toHaveClass('enabled');
        done();
      });
    });

    it('should define custom CSS property --keyboard-offset on embedded footer', (done) => {
      const embeddedComponent = spectator.query(DynamicFooterEmbeddedComponent);
      embeddedComponent.showFooter = true;
      spectator.detectChanges();

      setTimeout(() => {
        const kirbyModalFooter = spectator.element.querySelector(':scope > kirby-modal-footer');
        spectator.component._onKeyboardWillShow({ detail: { keyboardHeight: 200 } });
        expect(kirbyModalFooter).toHaveStyle({ '--keyboard-offset': '200px' });
        done();
      });
    });
  });

  describe(`on keyboard show/hide events`, () => {
    beforeEach(() => {
      spectator = modalWrapperTestBuilder.build();
    });

    afterEach(() => {
      // Ensure any observers are destroyed:
      spectator.fixture.destroy();
    });

    it('should set keyboardVisible to true on window:ionKeyboardDidShow', () => {
      spectator.dispatchFakeEvent(window, 'ionKeyboardDidShow');
      expect(spectator.component['keyboardVisible']).toBeTrue();
    });
    it('should set keyboardVisible to false on window:ionKeyboardDidHide', () => {
      spectator.dispatchFakeEvent(window, 'ionKeyboardDidShow');
      spectator.dispatchFakeEvent(window, 'ionKeyboardDidHide');
      expect(spectator.component['keyboardVisible']).toBeFalse();
    });
  });

  describe(`onHeaderTouchStart`, () => {
    let ionContent: HTMLIonContentElement;
    let input: HTMLInputElement;

    beforeEach(async () => {
      spectator = modalWrapperTestBuilder
        .flavor('drawer')
        .withEmbeddedInputComponent()
        .build();

      // Ensure ion-content gets height
      // or embedded component won't be visible:
      spectator.element.classList.add('ion-page');
      ionContent = spectator.query('ion-content');
      // If other test specs have imported IonicModule before this test is run,
      // then Ionic components won't be mocked - so ensure ionContent.componentOnReady is run if exists:
      await TestHelper.ionComponentOnReady(ionContent);

      input = ionContent.querySelector('input');
      spyOn(input, 'blur');
    });

    afterEach(() => {
      // Ensure any observers are destroyed:
      spectator.fixture.destroy();
    });

    describe(`when keyboard is NOT visible`, () => {
      beforeEach(() => {
        expect(document.activeElement).not.toEqual(input);
        spectator.dispatchFakeEvent(window, 'keyboardWillHide');
      });

      it('should not call blurActiveElement', () => {
        const blurActiveElementSpy = spyOn(spectator.component, 'blurActiveElement');
        spectator.dispatchTouchEvent('ion-header', 'touchstart');
        expect(blurActiveElementSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when keyboard is visible`, () => {
      beforeEach(() => {
        input.focus();
        expect(document.activeElement).toEqual(input);
        spectator.dispatchFakeEvent(window, 'ionKeyboardDidShow');
      });

      it('should blur document.activeElement when it is an input', () => {
        spectator.dispatchTouchEvent('ion-header', 'touchstart');
        expect(input.blur).toHaveBeenCalled();
      });

      it('should blur document.activeElement when it is a textarea', () => {
        const textarea = ionContent.querySelector('textarea');
        spyOn(textarea, 'blur');
        textarea.focus();
        expect(document.activeElement).toEqual(textarea);
        spectator.dispatchTouchEvent('ion-header', 'touchstart');
        expect(textarea.blur).toHaveBeenCalled();
      });

      it('should not blur document.activeElement if not input or textarea', () => {
        const button = ionContent.querySelector('button');
        button.focus();
        expect(document.activeElement).toEqual(button);
        spectator.dispatchTouchEvent('ion-header', 'touchstart');
        expect(input.blur).not.toHaveBeenCalled();
      });

      it('should not blur document.activeElement if event is from toolbar button', () => {
        spectator.dispatchTouchEvent(
          'ion-header > ion-toolbar > ion-buttons > button',
          'touchstart'
        );
        expect(input.blur).not.toHaveBeenCalled();
      });

      it('should not blur document.activeElement if event is from toolbar button child node', () => {
        spectator.dispatchTouchEvent(
          'ion-header > ion-toolbar > ion-buttons > button > kirby-icon',
          'touchstart'
        );
        expect(input.blur).not.toHaveBeenCalled();
      });
    });
  });

  describe(`close()`, () => {
    beforeEach(() => {
      spectator = modalWrapperTestBuilder.withEmbeddedInputComponent().build();
    });

    afterEach(() => {
      // Ensure any observers are destroyed:
      spectator.fixture.destroy();
    });

    it(`should call wrapping ion-modal's dismiss() method immediately`, () => {
      spectator.component.close('test data');
      // @ts-ignore
      expect(spectator.component.ionModalElement.dismiss).toHaveBeenCalledWith('test data');
    });

    describe(`when keyboard is visible`, () => {
      beforeEach(() => {
        spectator.dispatchFakeEvent(window, 'ionKeyboardDidShow');
      });

      describe(`and viewport is not resized`, () => {
        it(`should call wrapping ion-modal's dismiss() method immediately`, () => {
          spectator.component.close('test data');
          // @ts-ignore
          expect(spectator.component.ionModalElement.dismiss).toHaveBeenCalledWith('test data');
        });
      });

      describe(`and viewport is resized`, () => {
        beforeEach(async () => {
          // Ensure resizeObserver triggers and initialViewportHeight is set:
          await new Promise((resolve) => setTimeout(resolve));
          if (!spectator.component['initialViewportHeight']) {
            await new Promise((resolve) => setTimeout(resolve, 25));
          }
          expect(spectator.component['initialViewportHeight']).toBeGreaterThan(0);

          const keyboardHeight = 300;
          //Mimic native keyboard taking height of window:
          const heightWidthKeyboard = window.innerHeight - keyboardHeight;
          console.log(
            `Mimic native keyboard: (window.innerHeight - keyboardHeight) = (${window.innerHeight} - ${keyboardHeight}) = ${heightWidthKeyboard}px`
          );
          await TestHelper.resizeTestWindow({ height: `${window.innerHeight - keyboardHeight}px` });

          // Ensure resizeObserver triggers and onViewportResize fires:
          await new Promise((resolve) => setTimeout(resolve));
          if (!spectator.component['viewportResized']) {
            await new Promise((resolve) => setTimeout(resolve, 25));
          }
          expect(spectator.component['viewportResized']).toBeTrue;
        });

        afterEach(() => {
          // Ensure any observers are destroyed:
          spectator.fixture.destroy();
          TestHelper.resetTestWindow();
        });

        it(`should blur document.activeElement before calling wrapping ion-modal's dismiss() method`, fakeAsync(async () => {
          const ionContent = spectator.query('ion-content');
          // If other test specs have imported IonicModule before this test is run,
          // then Ionic components won't be mocked - so ensure ionContent.componentOnReady is run if exists:
          await TestHelper.ionComponentOnReady(ionContent);

          const input = ionContent.querySelector('input');
          spyOn(input, 'blur');
          input.focus();
          expect(document.activeElement).toEqual(input);

          spectator.component.close('test data');
          // @ts-ignore
          expect(spectator.component.ionModalElement.dismiss).not.toHaveBeenCalled();
          expect(input.blur).toHaveBeenCalled();
          tick(ModalWrapperComponent.KEYBOARD_HIDE_DELAY_IN_MS);
          // @ts-ignore
          expect(spectator.component.ionModalElement.dismiss).toHaveBeenCalled();
        }));

        it(`should delay before calling wrapping ion-modal's dismiss() method`, fakeAsync(() => {
          spectator.component.close('test data');
          // @ts-ignore
          expect(spectator.component.ionModalElement.dismiss).not.toHaveBeenCalled();
          tick(ModalWrapperComponent.KEYBOARD_HIDE_DELAY_IN_MS);
          // @ts-ignore
          expect(spectator.component.ionModalElement.dismiss).toHaveBeenCalledWith('test data');
        }));
      });
    });
  });
});
