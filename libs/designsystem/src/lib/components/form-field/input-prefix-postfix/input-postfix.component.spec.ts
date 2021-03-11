import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPostfixComponent } from './input-postfix.component';

describe('InputPostfixComponent', () => {
  let component: InputPostfixComponent;
  let fixture: ComponentFixture<InputPostfixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputPostfixComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputPostfixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
