import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavParams } from '@ionic/angular';

import { AlertComponent } from './alert.component';
import { ButtonComponent } from '../button/button.component';
import { IModalController } from '../modal/services/modal.controller.interface';
import { SizeDirective } from '@kirbydesign/designsystem/directives/size/size.directive';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async(() => {
    const modalControllerSpy = jasmine.createSpyObj('IModalController', ['showAlert']);

    const navParamsSpy = jasmine.createSpyObj('NavParams', {
      get: {
        title: 'Test title',
      },
    });

    TestBed.configureTestingModule({
      declarations: [AlertComponent, ButtonComponent, SizeDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: IModalController, useValue: modalControllerSpy },
        { provide: NavParams, useValue: navParamsSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    component.okBtn = 'Test OK Button Text';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ok button', () => {
    it('should render', () => {
      const expected = 'Test OK Button Text';
      const okButton = fixture.debugElement.query(By.css('.ok-button'));

      expect(component.okBtn).toEqual(expected);
      expect(okButton.nativeElement.textContent).toEqual(expected);
    });

    it('should support isDestructive', () => {
      component.okBtnIsDestructive = true;
      fixture.detectChanges();
      const okButton = fixture.debugElement.query(By.css('.ok-button'));

      expect(okButton).toBeDefined();
      expect(okButton.nativeElement.getAttribute('class')).toContain('destructive');
    });

    it('should default to not being destructive', () => {
      const okButton = fixture.debugElement.query(By.css('.ok-button'));

      expect(okButton).toBeDefined();
      expect(okButton.nativeElement.getAttribute('class')).not.toContain('destructive');
    });
  });

  describe('cancel button', () => {
    it('should render', () => {
      const expected = 'Test Cancel Button Text';
      component.cancelBtn = 'Test Cancel Button Text';
      fixture.detectChanges();
      const cancelButton = fixture.debugElement.query(By.css('.cancel-btn'));
      expect(cancelButton.nativeElement.textContent).toEqual(expected);
    });
  });

  describe('icon', () => {
    it('should render', () => {
      component.iconName = 'warning';
      fixture.detectChanges();

      const icon = fixture.debugElement.query(By.css('.icon-outline'));
      expect(icon).toBeDefined();
    });
  });
});
