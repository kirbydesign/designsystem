import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDetailsTransactionsComponent } from './transaction-details-transactions.component';

describe('TransactionDetailsTransactionsComponent', () => {
  let component: TransactionDetailsTransactionsComponent;
  let fixture: ComponentFixture<TransactionDetailsTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionDetailsTransactionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionDetailsTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
