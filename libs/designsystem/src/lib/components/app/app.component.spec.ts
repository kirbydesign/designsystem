import { Component, ElementRef, forwardRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IonApp } from '@ionic/angular';

import { AppComponent } from './app.component';
import { ModalController } from '../modal';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ion-app',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: IonApp,
      useExisting: forwardRef(() => IonAppMockComponent),
    },
  ],
})
export class IonAppMockComponent {
  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.componentOnReady = () => Promise.resolve();
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    const modalControllerSpy = jasmine.createSpyObj('ModalController', [
      'registerPresentingElement',
    ]);

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
