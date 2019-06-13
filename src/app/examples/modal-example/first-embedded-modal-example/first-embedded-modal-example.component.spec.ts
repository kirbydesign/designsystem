import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { KirbyModule } from '@kirbydesign/designsystem';
import { COMPONENT_PROPS } from '@kirbydesign/designsystem/modal';

import { FirstEmbeddedModalExampleComponent } from './first-embedded-modal-example.component';

describe('FirstEmbeddedModalExampleComponent', () => {
  let component: FirstEmbeddedModalExampleComponent;
  let fixture: ComponentFixture<FirstEmbeddedModalExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [KirbyModule, RouterTestingModule],
      declarations: [FirstEmbeddedModalExampleComponent],
      providers: [{ provide: COMPONENT_PROPS, useValue: {} }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstEmbeddedModalExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
