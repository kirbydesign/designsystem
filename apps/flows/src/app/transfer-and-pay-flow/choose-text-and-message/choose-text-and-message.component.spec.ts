import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseTextAndMessageComponent } from './choose-text-and-message.component';

describe('ChooseTextAndMessageComponent', () => {
  let component: ChooseTextAndMessageComponent;
  let fixture: ComponentFixture<ChooseTextAndMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChooseTextAndMessageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseTextAndMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
