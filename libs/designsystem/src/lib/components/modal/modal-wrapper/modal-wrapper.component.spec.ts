import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { NavParams, IonToolbar, IonHeader, IonTitle, IonButtons, IonContent } from '@ionic/angular';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';

import { ButtonComponent } from '../../button/button.component';
import { IconComponent } from '../../icon/icon.component';
import { ModalWrapperComponent } from './modal-wrapper.component';
import { IModalController } from '../services/modal.controller.interface';
import { KirbyAnimation } from '../../../animation/kirby-animation';
import { Modal } from '../services/modal.model';

describe('ModalWrapperComponent', () => {
  let component: ModalWrapperComponent;
  let fixture: ComponentFixture<ModalWrapperComponent>;
  let navParamsSpy: jasmine.SpyObj<NavParams>;
  const modal = {
    close: () => {},
    scrollToTop: () => {},
    scrollToBottom: () => {},
  } as Modal;

  beforeEach(async(() => {
    const modalControllerSpy = jasmine.createSpyObj('IModalController', [
      'showModal',
      'hideModal',
      'registerModalCloseRef',
      'blurNativeWrapper',
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

    TestBed.configureTestingModule({
      declarations: [
        ModalWrapperComponent,
        MockComponent(IconComponent),
        MockComponent(ButtonComponent),
        MockComponent(IonHeader),
        MockComponent(IonToolbar),
        MockComponent(IonTitle),
        MockComponent(IonButtons),
        MockComponent(IonContent),
      ],
      providers: [
        { provide: IModalController, useValue: modalControllerSpy },
        { provide: NavParams, useValue: navParamsSpy },
      ],
    }).compileComponents();
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ModalWrapperComponent, ButtonComponent],
      },
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
      fixture.detectChanges();
      const rootElement: HTMLElement = fixture.debugElement.nativeElement;
      expect(rootElement.classList).toContain('drawer');
    });

    it('should have font size "m" when drawer flavor is used', () => {
      component.config.flavor = 'drawer';
      fixture.detectChanges();
      const rootElement: HTMLElement = fixture.debugElement.nativeElement;
      const title = rootElement.querySelector('ion-title');
      expect(window.getComputedStyle(title).fontSize).toEqual('18px');
    });
  });

  describe('close button', () => {
    it('should render as a close icon by default', () => {
      var el = fixture.debugElement.query(By.directive(IconComponent));
      expect(el.componentInstance.name).toBe('close');
    });

    it("should render arrow-down when flavor is set to 'drawer'", () => {
      component.config.flavor = 'drawer';
      fixture.detectChanges();
      var el = fixture.debugElement.query(By.directive(IconComponent));
      expect(el.componentInstance.name).toBe('arrow-down');
    });
  });

  describe('supplementary button', () => {
    it('should not render if an icon was provided, but the flavor is modal', () => {
      component.config.drawerSupplementaryAction = { iconName: 'qr', action: undefined };
      fixture.detectChanges();
      var elements = fixture.debugElement.queryAll(By.directive(IconComponent));
      expect(elements.length).toBe(1);
      expect(elements[0].componentInstance.name).toBe('close');
    });

    it('should render as the provided icon when flavor is drawer', () => {
      component.config.flavor = 'drawer';
      component.config.drawerSupplementaryAction = { iconName: 'qr', action: undefined };
      fixture.detectChanges();
      var elements = fixture.debugElement.queryAll(By.directive(IconComponent));
      expect(elements.length).toBe(2);
      expect(elements[0].componentInstance.name).toBe('arrow-down');
      expect(elements[1].componentInstance.name).toBe('qr');
    });

    it('should invoke the provided callback on select', () => {
      component.config.flavor = 'drawer';
      component.config.drawerSupplementaryAction = {
        iconName: 'qr',
        action: (_: any) => {},
      };
      spyOn(component.config.drawerSupplementaryAction, 'action');

      fixture.detectChanges();
      var elements = fixture.debugElement.queryAll(By.directive(IconComponent));
      expect(elements.length).toBe(2);
      expect(elements[1].componentInstance.name).toBe('qr');
      elements[1].parent.triggerEventHandler('click', 'test');
      expect(component.config.drawerSupplementaryAction.action).toHaveBeenCalledWith('test');
    });
  });

  describe('scrollToTop', () => {
    it('should scroll to top with no scroll animation duration', () => {
      const ionContentElement = fixture.debugElement.query(By.css('ion-content'));
      const ionContent: IonContent = ionContentElement.componentInstance;
      spyOn(ionContent, 'scrollToTop');

      modal.scrollToTop();

      expect(ionContent.scrollToTop).toHaveBeenCalledWith(0);
    });

    it('should scroll to top with provided scroll animation duration', () => {
      const animationDuration = KirbyAnimation.Duration.LONG;
      const ionContentElement = fixture.debugElement.query(By.css('ion-content'));
      const ionContent: IonContent = ionContentElement.componentInstance;
      spyOn(ionContent, 'scrollToTop');

      modal.scrollToTop(animationDuration);

      expect(ionContent.scrollToTop).toHaveBeenCalledWith(animationDuration);
    });
  });

  describe('scrollToBottom', () => {
    it('should scroll to bottom with no scroll animation duration', () => {
      const ionContentElement = fixture.debugElement.query(By.css('ion-content'));
      const ionContent: IonContent = ionContentElement.componentInstance;
      spyOn(ionContent, 'scrollToBottom');

      modal.scrollToBottom();

      expect(ionContent.scrollToBottom).toHaveBeenCalledWith(0);
    });

    it('should scroll to bottom with provided scroll animation duration', () => {
      const animationDuration = KirbyAnimation.Duration.LONG;
      const ionContentElement = fixture.debugElement.query(By.css('ion-content'));
      const ionContent: IonContent = ionContentElement.componentInstance;
      spyOn(ionContent, 'scrollToBottom');

      modal.scrollToBottom(animationDuration);

      expect(ionContent.scrollToBottom).toHaveBeenCalledWith(animationDuration);
    });
  });
});
