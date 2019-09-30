import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCounterComponent } from './input-counter.component';

describe('InputCounterComponent', () => {
  let component: InputCounterComponent;
  let fixture: ComponentFixture<InputCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputCounterComponent],
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
