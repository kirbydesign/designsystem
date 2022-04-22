import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { DesignTokenHelper } from '@kirbydesign/core';

import { WindowRef } from '../../../types/window-ref';
import { ButtonComponent } from '../../button/button.component';

import { AlertComponent } from './alert.component';

const getColor = DesignTokenHelper.getColor;

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AlertComponent, ButtonComponent],
      providers: [
        {
          provide: WindowRef,
          useValue: <WindowRef>{ nativeWindow: window },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

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

describe('AlertComponent with okBtn', () => {
  let spectator: SpectatorHost<AlertComponent>;
  let element: HTMLElement;

  const createHost = createHostFactory({
    component: AlertComponent,
    declarations: [ButtonComponent],
    providers: [
      {
        provide: WindowRef,
        useValue: <WindowRef>{ nativeWindow: window },
      },
    ],
  });

  beforeEach(() => {
    spectator = createHost(`
    <kirby-alert okBtnText="OK Button Text">
    </kirby-alert>
    `);
    element = spectator.element;
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should have success colors on button', () => {
    const okButton = element.querySelector('[kirby-button]');

    expect(okButton).toHaveComputedStyle({
      'background-color': getColor('success'),
      color: getColor('success', 'contrast'),
    });
  });
});
