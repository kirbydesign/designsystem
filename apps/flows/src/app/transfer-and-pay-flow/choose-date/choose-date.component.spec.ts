import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseDateComponent } from './choose-date.component';

describe('ChooseDateComponent', () => {
  let component: ChooseDateComponent;
  let fixture: ComponentFixture<ChooseDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChooseDateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
