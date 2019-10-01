import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavParams } from '@ionic/angular';

import { AlertComponent } from './alert.component';
import { ButtonComponent } from '../button/button.component';
import { IModalController } from '../modal/services/modal.controller.interface';

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
      declarations: [AlertComponent, ButtonComponent],
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
