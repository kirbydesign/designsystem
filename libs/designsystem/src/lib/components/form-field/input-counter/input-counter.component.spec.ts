import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCounterComponent } from './input-counter.component';
import { FormFieldMessageComponent } from '../form-field-message/form-field-message.component';

describe('InputCounterComponent', () => {
  let component: InputCounterComponent;
  let fixture: ComponentFixture<InputCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputCounterComponent, FormFieldMessageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
