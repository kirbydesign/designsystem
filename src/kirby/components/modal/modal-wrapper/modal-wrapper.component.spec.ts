import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { NavParams } from '@ionic/angular';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';

import { FloatingActionButtonComponent } from '../../floating-action-button/floating-action-button.component';
import { IconComponent } from '../../icon/icon.component';
import { ModalWrapperComponent } from './modal-wrapper.component';
import { IModalController } from '../services/modal.controller.interface';

describe('ModalWrapperComponent', () => {
  let component: ModalWrapperComponent;
  let fixture: ComponentFixture<ModalWrapperComponent>;

  beforeEach(async(() => {
    const modalControllerSpy = jasmine.createSpyObj('IModalController', [
      'showModal',
      'hideModal',
      'registerModalCloseRef',
    ]);

    const navParamsSpy = jasmine.createSpyObj('NavParams', {
      get: {
        title: 'Test title',
        component: undefined,
      },
    });

    TestBed.configureTestingModule({
      declarations: [
        ModalWrapperComponent,
        MockComponent(IconComponent),
        MockComponent(FloatingActionButtonComponent),
      ],
      providers: [
        { provide: IModalController, useValue: modalControllerSpy },
        { provide: NavParams, useValue: navParamsSpy },
      ],
    }).compileComponents();
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ModalWrapperComponent, FloatingActionButtonComponent],
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

    it('should be aligned left by default', () => {
      const rootElement: HTMLElement = fixture.debugElement.nativeElement;
      const title = rootElement.querySelector('span');
      expect(title.classList).toContain('text-left');
    });

    it('should be aligned left by default', () => {
      const rootElement: HTMLElement = fixture.debugElement.nativeElement;
      const title = rootElement.querySelector('span');
      expect(title.classList).toContain('text-left');
    });

    it('should be centered when config.titleHorizontalAlignment is set to center', () => {
      component.config.titleHorizontalAlignment = 'center';
      fixture.detectChanges();
      const rootElement: HTMLElement = fixture.debugElement.nativeElement;
      const title = rootElement.querySelector('span');
      expect(title.classList).toContain('text-center');
    });
  });

  describe('close button', () => {
    it('should be placed inside by default', () => {
      expect(component.config.closeBtnPosition).toEqual('inside');
    });

    it('should be placed outside when config.closeBtnPosition is set to outside', () => {
      component.config.closeBtnPosition = 'outside';
      fixture.detectChanges();
      const rootElement: HTMLElement = fixture.debugElement.nativeElement;
      const button = rootElement.querySelector('.close-btn');
      expect(button.classList).toContain('outside');
    });

    it('should not be rendered when config.closeBtnPosition is set to hidden', () => {
      component.config.closeBtnPosition = 'hidden';
      fixture.detectChanges();
      const rootElement: HTMLElement = fixture.debugElement.nativeElement;
      const button = rootElement.querySelector('.close-btn');
      expect(button).not.toBeTruthy();
    });

    it('should have a default value of close', () => {
      expect(component.config.closeIconName).toEqual('close');
    });

    it('should render as a close icon by default', () => {
      var el = fixture.debugElement.query(By.directive(IconComponent));
      expect(el.componentInstance.name).toBe('close');
    });

    it('should render arrow when config.closeIcon is set to arrow', () => {
      component.config.closeIconName = 'arrow-back';
      fixture.detectChanges();
      var el = fixture.debugElement.query(By.directive(IconComponent));
      expect(el.componentInstance.name).toBe('arrow-back');
    });
  });
});
