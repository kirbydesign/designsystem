import { Component, forwardRef } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IonApp } from '@ionic/angular/standalone';
import { ModalController } from '@kirbydesign/designsystem/modal';

import { AppComponent } from './kirby-app.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ion-app',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: IonApp,
      useExisting: forwardRef(() => IonAppMockComponent),
    },
  ],
})
export class IonAppMockComponent {}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(waitForAsync(() => {
    const modalControllerSpy = jasmine.createSpy('ModalController');

    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [AppComponent, IonAppMockComponent],
      providers: [{ provide: ModalController, useValue: modalControllerSpy }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
