import { fakeAsync, tick } from '@angular/core/testing';
import { IonContent } from '@ionic/angular';
import { WindowRef } from '@kirbydesign/designsystem/types';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockComponents } from 'ng-mocks';

import { TestHelper } from '@kirbydesign/designsystem/testing';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { DesignTokenHelper, KirbyAnimation } from '@kirbydesign/designsystem/helpers';

import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { PageModule } from '@kirbydesign/designsystem/page';
import { CanDismissHelper, ModalWrapperComponent } from '@kirbydesign/designsystem/modal';
import {
  DummyContentEmbeddedComponent,
  DynamicFooterEmbeddedComponent,
  DynamicPageProgressEmbeddedComponent,
  InputEmbeddedComponent,
  ModalWrapperTestBuilder,
  StaticFooterEmbeddedComponent,
  StaticPageProgressEmbeddedComponent,
  TitleEmbeddedComponent,
} from './modal-wrapper.testbuilder';

const { getColor } = DesignTokenHelper;

describe('ModalWrapperComponent', () => {
  const createComponent = createComponentFactory({
    component: ModalWrapperComponent,
    imports: [PageModule],
    entryComponents: [
      TitleEmbeddedComponent,
      StaticFooterEmbeddedComponent,
      DynamicFooterEmbeddedComponent,
      InputEmbeddedComponent,
      StaticPageProgressEmbeddedComponent,
      DynamicPageProgressEmbeddedComponent,
    ],
    providers: [
      {
        provide: WindowRef,
        useValue: <WindowRef>{ nativeWindow: window },
      },
    ],
    declarations: [MockComponents(ButtonComponent)],
    mocks: [CanDismissHelper],
  });

  let modalWrapperTestBuilder: ModalWrapperTestBuilder;
  let spectator: Spectator<ModalWrapperComponent>;

  beforeEach(() => {
    modalWrapperTestBuilder = new ModalWrapperTestBuilder(createComponent);
  });

  it('should create', () => {
    spectator = modalWrapperTestBuilder.build();

    expect(spectator.component).toBeTruthy();
    // Ensure any observers are destroyed:
    spectator.fixture.destroy();
  });

  describe("when 'collapseTitle' is enabled", () => {
    /* 
      Whether the title is displayed & truncated is not tested. 
      This is the responsibility of the ionic components; we assume
      they're working as intended. 

      If needed, it should be implemented as an integration test. 
    */

    let ionContentElement: HTMLIonContentElement;
    let ionTitleElement: HTMLIonTitleElement;
    const testTitle = 'This is a long test title';

    beforeEach(() => {
      spectator = modalWrapperTestBuilder
        .flavor('modal')
        .collapsibleTitle(true)
        .title(testTitle)
        .component(TitleEmbeddedComponent)
        .build();

      ionContentElement = spectator.query('ion-content');
      ionTitleElement = spectator.query('ion-title');
    });

    afterEach(() => {
      spectator.fixture.destroy();
    });

    it('should have correct padding between content & toolbar', () => {
      const ionContentToolbarElement: HTMLIonToolbarElement =
        ionContentElement.querySelector('ion-toolbar');
      expect(ionContentToolbarElement).not.toBeUndefined();

      expect(ionContentToolbarElement).toHaveComputedStyle({
        'padding-top': '0px',
        '--padding-top': '0px',
        '--padding-bottom': DesignTokenHelper.size('l'),
        '--padding-start': DesignTokenHelper.size('s'),
        '--padding-end': DesignTokenHelper.size('s'),
      });
      expect(ionContentElement).toHaveComputedStyle({
        '--padding-top': DesignTokenHelper.size('m'),
      });
    });
  });

  describe('with slotted kirby-page-title', () => {
    beforeEach(() => {
      spectator = modalWrapperTestBuilder
        .title('Test title')
        .component(TitleEmbeddedComponent)
        .flavor('modal')
        .build();
    });

    afterEach(() => {
      // Ensure any observers are destroyed:
      spectator.fixture.destroy();
    });

    it('should have css class "drawer" when drawer flavor is used', () => {
      spectator.component.config.flavor = 'drawer';
      spectator.detectChanges();
      const rootElement: HTMLElement = spectator.element;
      expect(rootElement.classList).toContain('drawer');
    });

    it('should have correct font size when drawer flavor is used', () => {
      spectator.component.config.flavor = 'drawer';
      spectator.detectChanges();
      const rootElement: HTMLElement = spectator.element;
      const title = rootElement.querySelector('ion-title');
      expect(window.getComputedStyle(title).fontSize).toEqual(DesignTokenHelper.fontSize('n'));
    });
  });

  describe('sizing', () => {
    beforeEach(() => {
      spectator = modalWrapperTestBuilder.flavor('modal').withEmbeddedInputComponent().build();
    });
    afterEach(() => {
      spectator.fixture.destroy();
    });

    it('should observe Ionic modal-wrapper intersecting with viewport after ion-modal has been presented', async () => {
      const observeSpy = spyOn(spectator.component['intersectionObserver'], 'observe');

      spectator.component['ionModalDidPresent'].next();
      spectator.component['ionModalDidPresent'].complete();
      await TestHelper.waitForTimeout();

      const dummyWrapper = spectator.component['ionModalElement'];
      expect(observeSpy).toHaveBeenCalledWith(dummyWrapper);
    });

    it('should clean up intersection observer of Ionic modal-wrapper on destroy', async () => {
      const disconnectSpy = spyOn(spectator.component['intersectionObserver'], 'disconnect');

      spectator.component['ionModalDidPresent'].next();
      spectator.component['ionModalDidPresent'].complete();
      await TestHelper.waitForTimeout();

      spectator.component.ngOnDestroy();

      expect(disconnectSpy).toHaveBeenCalled();
    });
  });

  describe('viewportResize', () => {
    /**
     * Temporaly removed, see #2736
     */
    xit('should emit when viewport is resized', async () => {
      spectator = modalWrapperTestBuilder.build();
      await TestHelper.whenTrue(() => !!spectator.component['initialViewportHeight']);
      const viewportResizeSpy = spyOn(spectator.component['viewportResize'], 'next');

      await TestHelper.resizeTestWindow(TestHelper.screensize.tablet);
      await TestHelper.whenTrue(() => spectator.component['viewportResized']);

      expect(viewportResizeSpy).toHaveBeenCalled();
    });

    afterAll(() => {
      TestHelper.resetTestWindow();
    });
  });

  describe('with interact with background', () => {
    const elementHeight = 500;
    const elementWidth = 300;
    const screenSize = TestHelper.screensize.desktop;
    let scrollbarWidth = 0;

    beforeAll(async () => {
      await TestHelper.resizeTestWindow(screenSize);
      scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    });

    afterAll(() => {
      TestHelper.resetTestWindow();
    });

    describe('when flavor is modal', () => {
      beforeEach(() => {
        spectator = modalWrapperTestBuilder.flavor('modal').interactWithBackground().build();
        spectator.element.style.height = `${elementHeight}px`;
        spectator.element.style.width = `${elementWidth}px`;
        spectator.element.style.overflow = 'hidden';
        spectator.element.style.position = 'fixed'; // Use 'fixed' instead of 'absolute' to prevent test breaking if test window is scrolled
        spectator.element.style.bottom = '0';
        spectator.element.style.left = `calc(50% - ${elementWidth / 2}px)`; // Simulate horizontally centered modal
        spectator.element.style.backgroundColor = 'charrtreuse'; // Add some background for easier debugging of test
      });

      afterEach(() => {
        // Ensure any observers are destroyed:
        spectator.fixture.destroy();
      });

      it('should NOT resize ion-modal to wrapper size after ion-modal has been presented', fakeAsync(() => {
        spectator.component['ionModalDidPresent'].next();
        spectator.component['ionModalDidPresent'].complete();
        tick();

        const ionModalElement = spectator.component['ionModalElement'];
        expect(ionModalElement.style.top).toBe('');
        expect(ionModalElement.style.left).toBe('');
        expect(ionModalElement.style.right).toBe('');
      }));

      it('should NOT resize ion-modal to wrapper size on viewport resize', fakeAsync(() => {
        spectator.component['viewportResize'].next();
        spectator.component['viewportResize'].complete();
        tick();

        const ionModalElement = spectator.component['ionModalElement'];
        expect(ionModalElement.style.top).toBe('');
        expect(ionModalElement.style.left).toBe('');
        expect(ionModalElement.style.right).toBe('');
      }));
    });

    describe('when flavor is drawer', () => {
      beforeEach(() => {
        spectator = modalWrapperTestBuilder.flavor('drawer').interactWithBackground().build();
        spectator.element.style.height = `${elementHeight}px`;
        spectator.element.style.width = `${elementWidth}px`;
        spectator.element.style.overflow = 'hidden';
        spectator.element.style.position = 'fixed'; // Use 'fixed' instead of 'absolute' to prevent test breaking if test window is scrolled
        spectator.element.style.bottom = '0';
        spectator.element.style.left = `calc(50% - ${elementWidth / 2}px)`; // Simulate horizontally centered modal
        spectator.element.style.backgroundColor = 'charrtreuse'; // Add some background for easier debugging of test
      });

      afterEach(() => {
        // Ensure any observers are destroyed:
        spectator.fixture.destroy();
      });

      it('should resize ion-modal to wrapper size after ion-modal has been presented', fakeAsync(() => {
        spectator.component['ionModalDidPresent'].next();
        spectator.component['ionModalDidPresent'].complete();
        tick();

        const elementRect = spectator.element.getBoundingClientRect();
        const expectedPosition = {
          top: parseInt(screenSize.height) - elementHeight,
          left: elementRect.left,
          right: parseInt(screenSize.width) - scrollbarWidth - elementRect.right,
        };
        const ionModalElement = spectator.component['ionModalElement'];
        expect(ionModalElement.style.top).toBe(`${expectedPosition.top}px`);
        expect(ionModalElement.style.left).toBe(`${expectedPosition.left}px`);
        expect(ionModalElement.style.right).toBe(`${expectedPosition.right}px`);
      }));

      it('should resize ion-modal to wrapper size on viewport resize', fakeAsync(() => {
        spectator.component['viewportResize'].next();
        spectator.component['viewportResize'].complete();
        tick();

        const elementRect = spectator.element.getBoundingClientRect();
        const expectedPosition = {
          top: parseInt(screenSize.height) - elementHeight,
          left: elementRect.left,
          right: parseInt(screenSize.width) - scrollbarWidth - elementRect.right,
        };
        const ionModalElement = spectator.component['ionModalElement'];
        expect(ionModalElement.style.top).toBe(`${expectedPosition.top}px`);
        expect(ionModalElement.style.left).toBe(`${expectedPosition.left}px`);
        expect(ionModalElement.style.right).toBe(`${expectedPosition.right}px`);
      }));
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
      const el = spectator.query(IconComponent);
      expect(el.name).toBe('close');
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
      expect(elements[0].name).toBe('qr');
      expect(elements[1].name).toBe('close');
    });

    it('should invoke the provided callback on select', () => {
      spectator.component.config.flavor = 'drawer';
      spectator.component.config.drawerSupplementaryAction = {
        iconName: 'qr',
        action: () => {},
      };
      spyOn(spectator.component.config.drawerSupplementaryAction, 'action');

      spectator.detectChanges();
      spectator.dispatchMouseEvent('ion-buttons[slot="secondary"] button[kirby-button]', 'click');
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

  describe(`on keyboard show/hide events`, () => {
    beforeEach(() => {
      spectator = modalWrapperTestBuilder.build();
    });

    afterEach(() => {
      // Ensure any observers are destroyed:
      spectator.fixture.destroy();
    });

    it('should set keyboardVisible to true on window:keyboardWillShow', () => {
      const keyboardWillShowEvent = new CustomEvent('keyboardWillShow');
      keyboardWillShowEvent['keyboardHeight'] = 200;
      window.dispatchEvent(keyboardWillShowEvent);
      expect(spectator.component['keyboardVisible']).toBeTrue();
    });

    it('should set keyboardVisible to true on window:ionKeyboardDidShow', () => {
      const ionKeyboardDidShowEvent = new CustomEvent('ionKeyboardDidShow', {
        detail: { keyboardHeight: 200 },
      });
      window.dispatchEvent(ionKeyboardDidShowEvent);
      expect(spectator.component['keyboardVisible']).toBeTrue();
    });

    it('should set keyboardVisible to false on window:keyboardWillHide', () => {
      spectator.component['keyboardVisible'] = true;

      spectator.dispatchFakeEvent(window, 'keyboardWillHide');

      expect(spectator.component['keyboardVisible']).toBeFalse();
    });

    it('should set keyboardVisible to false on window:ionKeyboardDidHide', () => {
      spectator.component['keyboardVisible'] = true;

      spectator.dispatchFakeEvent(window, 'ionKeyboardDidHide');

      expect(spectator.component['keyboardVisible']).toBeFalse();
    });

    it('should keep same height, when keyboard is opened', async () => {
      const heightWhenKeyboardClosed = spectator.element.getBoundingClientRect().height;
      const ionKeyboardDidShowEvent = new CustomEvent('ionKeyboardDidShow', {
        detail: { keyboardHeight: 200 },
      });
      window.dispatchEvent(ionKeyboardDidShowEvent);
      expect(spectator.component['keyboardVisible']).toBeTrue();
      const heightWhenKeyboardOpened = spectator.element.getBoundingClientRect().height;
      expect(heightWhenKeyboardClosed).toEqual(heightWhenKeyboardOpened);
    });
  });

  describe(`onHeaderTouchStart`, () => {
    let ionContent: HTMLIonContentElement;
    let input: HTMLInputElement;

    beforeEach(async () => {
      spectator = modalWrapperTestBuilder.flavor('drawer').withEmbeddedInputComponent().build();

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
        spectator.component['_onKeyboardShow'](200);
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
      expect(spectator.component['ionModalElement'].dismiss).toHaveBeenCalledWith('test data');
    });

    describe(`when keyboard is visible`, () => {
      beforeEach(() => {
        spectator.component['keyboardVisible'] = true;
      });

      describe(`and viewport is not resized`, () => {
        it(`should call wrapping ion-modal's dismiss() method immediately`, () => {
          spectator.component.close('test data');
          expect(spectator.component['ionModalElement'].dismiss).toHaveBeenCalledWith('test data');
        });
      });

      describe(`and viewport is resized`, () => {
        beforeEach(async () => {
          // Ensure resizeObserver triggers and initialViewportHeight is set:
          await TestHelper.waitForResizeObserver();
          await TestHelper.whenTrue(() => !!spectator.component['initialViewportHeight']);
          expect(spectator.component['initialViewportHeight']).toBeGreaterThan(0);

          const keyboardHeight = 300;
          //Mimic native keyboard taking height of window:
          const heightWidthKeyboard = window.innerHeight - keyboardHeight;
          console.log(
            `Mimic native keyboard: (window.innerHeight - keyboardHeight) = (${window.innerHeight} - ${keyboardHeight}) = ${heightWidthKeyboard}px`
          );
          await TestHelper.resizeTestWindow({ height: `${window.innerHeight - keyboardHeight}px` });

          // Ensure resizeObserver triggers and onViewportResize fires:
          await TestHelper.waitForResizeObserver();
          await TestHelper.whenTrue(() => spectator.component['viewportResized']);
          // Ensure keyboardVisible is true, as Ionic dispatches 'ionKeyboardDidShow' event on viewport resize:
          spectator.component['keyboardVisible'] = true;
        });

        afterEach(() => {
          // Ensure any observers are destroyed:
          spectator.fixture.destroy();
          TestHelper.resetTestWindow();
        });

        it(`should blur document.activeElement before calling wrapping ion-modal's dismiss() method`, fakeAsync(() => {
          const ionContent = spectator.query('ion-content');
          // If other test specs have imported IonicModule before this test is run,
          // then Ionic components won't be mocked - so ensure ionContent.componentOnReady is run if exists:
          TestHelper.ionComponentOnReady(ionContent);

          const input = ionContent.querySelector('input');
          spyOn(input, 'blur');
          input.focus();
          expect(document.activeElement).toEqual(input);

          spectator.component.close('test data');
          expect(spectator.component['ionModalElement'].dismiss).not.toHaveBeenCalled();
          expect(input.blur).toHaveBeenCalled();
          tick(ModalWrapperComponent.KEYBOARD_HIDE_DELAY_IN_MS);
          expect(spectator.component['ionModalElement'].dismiss).toHaveBeenCalledWith('test data');
        }));

        it(`should delay before calling wrapping ion-modal's dismiss() method`, fakeAsync(() => {
          spectator.component.close('test data');
          expect(spectator.component['ionModalElement'].dismiss).not.toHaveBeenCalled();
          tick(ModalWrapperComponent.KEYBOARD_HIDE_DELAY_IN_MS);
          expect(spectator.component['ionModalElement'].dismiss).toHaveBeenCalledWith('test data');
        }));
      });
    });
  });

  describe('listenForScroll', () => {
    afterEach(() => {
      TestHelper.resetTestWindow();
    });
    it('should set scrollEventsEnabled to be false when opened on desktop', async () => {
      await TestHelper.resizeTestWindow(TestHelper.screensize.desktop);

      modalWrapperTestBuilder = new ModalWrapperTestBuilder(createComponent);
      spectator = modalWrapperTestBuilder
        .flavor('modal')
        .title('test')
        .component(TitleEmbeddedComponent)
        .build();

      expect(spectator.component.scrollEventsEnabled).toBeFalse();
    });

    it('should set scrollEventsEnabled to be true when opened on a phone', async () => {
      await TestHelper.resizeTestWindow(TestHelper.screensize.phone);

      modalWrapperTestBuilder = new ModalWrapperTestBuilder(createComponent);
      spectator = modalWrapperTestBuilder
        .flavor('modal')
        .title('test')
        .component(TitleEmbeddedComponent)
        .build();

      expect(spectator.component.scrollEventsEnabled).toBeTrue();
    });

    it('should set scrollEventsEnabled to be true when resizing from desktop to phone', async () => {
      await TestHelper.resizeTestWindow(TestHelper.screensize.desktop);
      modalWrapperTestBuilder = new ModalWrapperTestBuilder(createComponent);
      spectator = modalWrapperTestBuilder
        .flavor('modal')
        .title('test')
        .component(TitleEmbeddedComponent)
        .build();
      expect(spectator.component.scrollEventsEnabled).toBeFalse();

      await TestHelper.resizeTestWindow(TestHelper.screensize.phone);
      await TestHelper.whenTrue(() => spectator.component.scrollEventsEnabled);

      expect(spectator.component.scrollEventsEnabled).toBeTrue();
    });

    it('should set border-bottom-color on ion-toolbar when scrolling on phone to the bottom or past offset', async () => {
      await TestHelper.resizeTestWindow(TestHelper.screensize.phone);
      modalWrapperTestBuilder = new ModalWrapperTestBuilder(createComponent);
      spectator = modalWrapperTestBuilder
        .flavor('modal')
        .component(DummyContentEmbeddedComponent)
        .build();
      await spectator.fixture.whenStable();
      const MinimumScrollableContentHeight = '500px';
      const ionContentElement = spectator.query('ion-content') as HTMLElement;
      ionContentElement.style.minHeight = MinimumScrollableContentHeight;
      spectator.detectChanges();

      spectator.component.scrollToBottom();
      await spectator.fixture.whenStable();
      spectator.detectChanges();
      await TestHelper.whenTrue(() => spectator.component.isContentScrolled);
      const ionToolbarInScrolled = document.querySelector(
        'ion-header.content-scrolled ion-toolbar'
      ) as HTMLElement;
      ionToolbarInScrolled.style.transition = 'none';

      expect(ionToolbarInScrolled).toHaveComputedStyle({
        'border-bottom-color': getColor('medium'),
      });
    });
  });
});
