import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MockComponents } from 'ng-mocks';
import { NavParams, IonToolbar, IonHeader, IonTitle, IonButtons, IonContent } from '@ionic/angular';

import { ButtonComponent } from '../../button/button.component';
import { IconComponent } from '../../icon/icon.component';
import { ModalWrapperComponent } from './modal-wrapper.component';
import { IModalController } from '../services/modal.controller.interface';
import { KirbyAnimation } from '../../../animation/kirby-animation';
import { Modal } from '../services/modal.model';

describe('ModalWrapperComponent', () => {
  let spectator: Spectator<ModalWrapperComponent>;
  let component: ModalWrapperComponent;
  let navParamsSpy: jasmine.SpyObj<NavParams>;
  const modal = {
    close: () => {},
    scrollToTop: () => {},
    scrollToBottom: () => {},
  } as Modal;

  const createComponent = createComponentFactory({
    component: ModalWrapperComponent,
    declarations: [
      MockComponents(
        IconComponent,
        ButtonComponent,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonButtons,
        IonContent
      ),
    ],
  });

  beforeEach(() => {
    const modalControllerSpy = jasmine.createSpyObj('IModalController', [
      'showModal',
      'hideModal',
      'blurNativeWrapper',
      'hideTopmost',
    ]);
    navParamsSpy = jasmine.createSpyObj('NavParams', {
      get: {
        title: 'Test title',
        component: undefined,
        flavor: 'modal',
        modal,
      },
    });

    navParamsSpy.data = {
      config: {},
    } as any;
    spectator = createComponent({
      providers: [
        { provide: IModalController, useValue: modalControllerSpy },
        { provide: NavParams, useValue: navParamsSpy },
      ],
    });
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
      modal.scrollToTop();
      expect(ionContent.scrollToTop).toHaveBeenCalledWith(0);
    });

    it('should scroll to top with provided scroll animation duration', () => {
      const animationDuration = KirbyAnimation.Duration.LONG;
      const ionContent: IonContent = spectator.query(IonContent);
      spyOn(ionContent, 'scrollToTop');

      modal.scrollToTop(animationDuration);

      expect(ionContent.scrollToTop).toHaveBeenCalledWith(animationDuration);
    });
  });

  describe('scrollToBottom', () => {
    it('should scroll to bottom with no scroll animation duration', () => {
      const ionContent: IonContent = spectator.query(IonContent);
      spyOn(ionContent, 'scrollToBottom');

      modal.scrollToBottom();

      expect(ionContent.scrollToBottom).toHaveBeenCalledWith(0);
    });

    it('should scroll to bottom with provided scroll animation duration', () => {
      const animationDuration = KirbyAnimation.Duration.LONG;
      const ionContent: IonContent = spectator.query(IonContent);
      spyOn(ionContent, 'scrollToBottom');

      modal.scrollToBottom(animationDuration);

      expect(ionContent.scrollToBottom).toHaveBeenCalledWith(animationDuration);
    });
  });
});
