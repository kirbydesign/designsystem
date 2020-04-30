import { Component } from '@angular/core';
import { tick, fakeAsync } from '@angular/core/testing';
import { IonToolbar, IonHeader, IonTitle, IonButtons, IonContent } from '@ionic/angular';
import { MockComponents } from 'ng-mocks';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { KirbyAnimation } from '../../../animation/kirby-animation';
import { TestHelper } from '../../../testing/test-helper';
import { ButtonComponent } from '../../button/button.component';
import { IconComponent } from '../../icon/icon.component';
import { ModalFooterComponent } from '../footer/modal-footer.component';
import { ModalWrapperComponent } from './modal-wrapper.component';

@Component({
  template: `
    <div>Some test content</div>
    <kirby-modal-footer>
      <button kirby-button>Test</button>
    </kirby-modal-footer>
  `,
})
class StaticFooterEmbeddedComponent {}

@Component({
  template: `
    <div>Some test content</div>
    <kirby-modal-footer *ngIf="showFooter" [class.enabled]="isEnabled">
      <button kirby-button>Test</button>
    </kirby-modal-footer>
  `,
})
class DynamicFooterEmbeddedComponent {
  showFooter = false;
  isEnabled = false;
}

@Component({
  template: `
    <input />
  `,
})
class InputEmbeddedComponent {}

describe('ModalWrapperComponent', () => {
  let spectator: Spectator<ModalWrapperComponent>;
  let component: ModalWrapperComponent;

  const createComponent = createComponentFactory({
    component: ModalWrapperComponent,
    entryComponents: [
      StaticFooterEmbeddedComponent,
      DynamicFooterEmbeddedComponent,
      InputEmbeddedComponent,
    ],
    declarations: [
      MockComponents(
        IconComponent,
        ButtonComponent,
        ModalFooterComponent,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonButtons,
        IonContent
      ),
    ],
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        config: {
          title: 'Test title',
          component: undefined,
          flavor: 'modal',
        },
      },
    });
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.config.title = 'hest';
  });

  describe('title', () => {
    it('should render', () => {
      expect(component.config.title).toEqual('Test title');
    });

    it('should have css class "drawer" when drawer flavor is used', () => {
      component.config.flavor = 'drawer';
      spectator.detectChanges();
      const rootElement: HTMLElement = spectator.element;
      expect(rootElement.classList).toContain('drawer');
    });

    it('should have font size "m" when drawer flavor is used', () => {
      component.config.flavor = 'drawer';
      spectator.detectChanges();
      const rootElement: HTMLElement = spectator.element;
      const title = rootElement.querySelector('ion-title');
      expect(window.getComputedStyle(title).fontSize).toEqual('18px');
    });
  });

  describe('close button', () => {
    it('should render as a close icon by default', () => {
      var el = spectator.query(IconComponent);
      expect(el.name).toBe('close');
    });

    it("should render arrow-down when flavor is set to 'drawer'", () => {
      component.config.flavor = 'drawer';
      spectator.detectChanges();
      var el = spectator.query(IconComponent);
      expect(el.name).toBe('arrow-down');
    });
  });

  describe('supplementary button', () => {
    it('should not render if an icon was provided, but the flavor is modal', () => {
      component.config.drawerSupplementaryAction = { iconName: 'qr', action: undefined };
      spectator.detectChanges();
      const elements = spectator.queryAll(IconComponent);
      expect(elements.length).toBe(1);
      expect(elements[0].name).toBe('close');
    });

    it('should render as the provided icon when flavor is drawer', () => {
      component.config.flavor = 'drawer';
      component.config.drawerSupplementaryAction = { iconName: 'qr', action: undefined };
      spectator.detectChanges();
      const elements = spectator.queryAll(IconComponent);
      expect(elements.length).toBe(2);
      expect(elements[0].name).toBe('arrow-down');
      expect(elements[1].name).toBe('qr');
    });

    it('should invoke the provided callback on select', () => {
      component.config.flavor = 'drawer';
      component.config.drawerSupplementaryAction = {
        iconName: 'qr',
        action: (_: any) => {},
      };
      spyOn(component.config.drawerSupplementaryAction, 'action');

      spectator.detectChanges();
      spectator.dispatchMouseEvent('ion-buttons[slot="end"] button[kirby-button]', 'click');
      expect(component.config.drawerSupplementaryAction.action).toHaveBeenCalled();
    });
  });

  describe('scrollToTop', () => {
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

  describe('with embedded component with static footer', () => {
    beforeEach(() => {
      spectator = createComponent({
        props: {
          config: {
            title: 'Modal with static footer',
            component: StaticFooterEmbeddedComponent,
          },
        },
      });
      component = spectator.component;
    });
    it('should move embedded footer to wrapper component', () => {
      const ionContentElement = spectator.query('ion-content');
      const embeddedComponentElement = ionContentElement.firstElementChild;
      const embeddedFooter = embeddedComponentElement.querySelector('kirby-modal-footer');
      expect(embeddedFooter).toBeNull();
      const footerAsWrapperChild = spectator.element.querySelector(':scope > kirby-modal-footer');
      expect(footerAsWrapperChild).not.toBeNull();
    });
  });

  describe('with embedded component with dynamic footer', () => {
    beforeEach(() => {
      spectator = createComponent({
        props: {
          config: {
            title: 'Modal with dynamic footer',
            component: DynamicFooterEmbeddedComponent,
          },
        },
      });
      component = spectator.component;
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
  });

  describe(`on keyboard show/hide events`, () => {
    it('should set keyboardVisible to true on window:keyboardWillShow', () => {
      spectator.dispatchFakeEvent(window, 'keyboardWillShow');
      expect(component['keyboardVisible']).toBeTrue();
    });
    it('should set keyboardVisible to false on window:keyboardWillHide', () => {
      spectator.dispatchFakeEvent(window, 'keyboardWillHide');
      expect(component['keyboardVisible']).toBeFalse();
    });
  });

  describe(`close()`, () => {
    let ionModalSpy: jasmine.SpyObj<HTMLIonModalElement>;
    beforeEach(() => {
      spectator = createComponent({
        props: {
          config: {
            title: 'Test title',
            component: InputEmbeddedComponent,
          },
        },
      });
      component = spectator.component;
      // Ensure ion-content gets height
      // or embedded component won't be visible:
      spectator.element.classList.add('ion-page');
      ionModalSpy = jasmine.createSpyObj('ion-modal spy', ['dismiss']);
      // Inject the modal spy through modal-wrapper's element.closest method:
      spectator.element.closest = () => ionModalSpy;
    });

    it(`should call wrapping ion-modal's dismiss() method immediately`, () => {
      spectator.component.close('test data');
      expect(ionModalSpy.dismiss).toHaveBeenCalledWith('test data');
    });

    describe(`when keyboard is visible`, () => {
      beforeEach(() => {
        spectator.dispatchFakeEvent(window, 'keyboardWillShow');
      });

      it(`should blur document.activeElement before calling wrapping ion-modal's dismiss() method`, async () => {
        const ionContent = spectator.query('ion-content');
        await TestHelper.whenReady(ionContent);
        const input = ionContent.querySelector('input');
        input.blur = jasmine.createSpy('blur');
        input.focus();
        expect(document.activeElement).toEqual(input);

        const didClose = spectator.component.close('test data');
        expect(input.blur).toHaveBeenCalled();
        expect(ionModalSpy.dismiss).not.toHaveBeenCalled();
        await didClose;
      });

      it(`should delay before calling wrapping ion-modal's dismiss() method`, fakeAsync(() => {
        spectator.component.close('test data');
        expect(ionModalSpy.dismiss).not.toHaveBeenCalled();
        tick(ModalWrapperComponent.KEYBOARD_HIDE_DELAY_IN_MS);
        expect(ionModalSpy.dismiss).toHaveBeenCalledWith('test data');
      }));
    });
  });
});
