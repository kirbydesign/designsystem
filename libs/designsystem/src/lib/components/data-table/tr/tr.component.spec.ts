import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrComponent } from './tr.component';

describe('TrComponent', () => {
  let component: TrComponent;
  let fixture: ComponentFixture<TrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
