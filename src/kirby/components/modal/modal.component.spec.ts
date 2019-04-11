import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { ModalController, NavParams } from '@ionic/angular';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';

import { FloatingActionButtonComponent } from '../floating-action-button/floating-action-button.component';
import { IconComponent } from './../icon/icon.component';
import { ModalComponent } from './modal.component';
import { ModalNestedComponentHelper } from './helpers/modal-nested-component-helper';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async(() => {
    const modalControllerSpy = jasmine.createSpyObj('ModalController', ['dismiss']);

    const navParamsSpy = jasmine.createSpyObj('NavParams', {
      get: {
        title: 'Test title',
        component: undefined,
      },
    });

    const modalNestedComponentHelperSpy = jasmine.createSpyObj('ModalNestedComponentHelper', [
      'appendComponent',
    ]);

    TestBed.configureTestingModule({
      declarations: [
        ModalComponent,
        MockComponent(IconComponent),
        MockComponent(FloatingActionButtonComponent),
      ],
      providers: [
        { provide: ModalController, useValue: modalControllerSpy },
        { provide: NavParams, useValue: navParamsSpy },
        { provide: ModalNestedComponentHelper, useValue: modalNestedComponentHelperSpy },
      ],
    }).compileComponents();
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ModalComponent, FloatingActionButtonComponent],
      },
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('title', () => {
    it('should have a default horizontal alignment value of center', () => {
      expect(component.config.titleHorizontalAlignment).toEqual('center');
    });

    it('should render', () => {
      expect(component.config.title).toEqual('Test title');
    });

    it('should be aligned in the center by default', () => {
      const rootElement: HTMLElement = fixture.debugElement.nativeElement;
      const title = rootElement.querySelector('h2');
      expect(title.classList).toContain('text-center');
    });

    it('should be aligned left when config.titleHorizontalAlignment is set to left', () => {
      component.config.titleHorizontalAlignment = 'left';
      fixture.detectChanges();
      const rootElement: HTMLElement = fixture.debugElement.nativeElement;
      const title = rootElement.querySelector('h2');
      expect(title.classList).toContain('text-left');
    });
  });

  describe('dismiss icon', () => {
    it('should have a default value of close', () => {
      expect(component.config.closeIconName).toEqual('close');
    });

    it('should render as a close icon by default', () => {
      var el = fixture.debugElement.query(By.directive(IconComponent));
      expect(el.componentInstance.name).toBe('close');
    });

    it('should render arrow when config.closeIcon is set to arrow', () => {
      component.config.closeIconName = 'arrow';
      fixture.detectChanges();
      var el = fixture.debugElement.query(By.directive(IconComponent));
      expect(el.componentInstance.name).toBe('arrow');
    });
  });
});
