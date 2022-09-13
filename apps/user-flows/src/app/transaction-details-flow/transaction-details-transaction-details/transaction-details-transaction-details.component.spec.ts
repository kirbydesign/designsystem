import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDetailsTransactionDetailsComponent } from './transaction-details-transaction-details.component';

describe('TransactionDetailsTransactionDetailsComponent', () => {
  let component: TransactionDetailsTransactionDetailsComponent;
  let fixture: ComponentFixture<TransactionDetailsTransactionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionDetailsTransactionDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionDetailsTransactionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
