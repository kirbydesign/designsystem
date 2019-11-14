import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { KirbyModule } from '@kirbydesign/designsystem';
import { COMPONENT_PROPS } from '@kirbydesign/designsystem/modal';

import { EmptyModalExampleComponent } from './empty-modal-example.component';

describe('FirstEmbeddedModalExampleComponent', () => {
  let component: EmptyModalExampleComponent;
  let fixture: ComponentFixture<EmptyModalExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [KirbyModule, RouterTestingModule],
      declarations: [EmptyModalExampleComponent],
      providers: [{ provide: COMPONENT_PROPS, useValue: {} }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyModalExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
