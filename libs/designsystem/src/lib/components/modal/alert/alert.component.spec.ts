import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SizeDirective } from '../../../directives/size/size.directive';
import { WindowRef } from '../../../types/window-ref';
import { ButtonComponent } from '../../button/button.component';

import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AlertComponent, ButtonComponent, SizeDirective],
        providers: [
          {
            provide: WindowRef,
            useValue: window,
          },
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    component.okBtnText = 'Test OK Button Text';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ok button', () => {
    it('should render', () => {
      const expected = 'Test OK Button Text';
      const okButton = fixture.debugElement.query(By.css('.ok-btn'));

      expect(component.okBtnText).toEqual(expected);
      expect(okButton.nativeElement.innerText).toEqual(expected);
    });

    it('should support isDestructive', () => {
      component.okBtnIsDestructive = true;
      fixture.detectChanges();
      const okButton = fixture.debugElement.query(By.css('.ok-btn'));

      expect(okButton).toBeDefined();
      expect(okButton.nativeElement.getAttribute('class')).toContain('destructive');
    });

    it('should default to not being destructive', () => {
      const okButton = fixture.debugElement.query(By.css('.ok-btn'));

      expect(okButton).toBeDefined();
      expect(okButton.nativeElement.getAttribute('class')).not.toContain('destructive');
    });

    it('should have default size', () => {
      const okButton = fixture.debugElement.query(By.css('.ok-btn'));
      component.cancelBtnText = 'Test Cancel Button Text';
      fixture.detectChanges();
      expect(okButton.attributes['ng-reflect-size']).toBeUndefined();
    });

    it('should have large ok button when no cancel button', () => {
      const okButton = fixture.debugElement.query(By.css('.ok-btn'));
      component.cancelBtnText = null;
      fixture.detectChanges();
      expect(okButton.attributes['ng-reflect-size']).toBe('lg');
    });
  });

  describe('cancel button', () => {
    it('should render', () => {
      const expected = 'Test Cancel Button Text';
      component.cancelBtnText = 'Test Cancel Button Text';
      fixture.detectChanges();
      const cancelButton = fixture.debugElement.query(By.css('.cancel-btn'));
      expect(cancelButton.nativeElement.innerText).toEqual(expected);
    });

    it('should not render when cancelBtn not set', () => {
      component.cancelBtnText = null;
      fixture.detectChanges();
      const cancelButton = fixture.debugElement.query(By.css('.cancel-btn'));
      expect(cancelButton).toBeNull();
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
