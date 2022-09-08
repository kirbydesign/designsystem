import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDetailsForyouComponent } from './transaction-details-foryou.component';

describe('TransactionDetailsForyouComponent', () => {
  let component: TransactionDetailsForyouComponent;
  let fixture: ComponentFixture<TransactionDetailsForyouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionDetailsForyouComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionDetailsForyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
