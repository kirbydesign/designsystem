import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranactionDetailsAccountComponent } from './tranaction-details-account.component';

describe('TranactionDetailsAccountComponent', () => {
  let component: TranactionDetailsAccountComponent;
  let fixture: ComponentFixture<TranactionDetailsAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranactionDetailsAccountComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranactionDetailsAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
