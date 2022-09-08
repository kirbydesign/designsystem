import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDetailsFlowComponent } from './transaction-details-flow.component';

describe('TransactionDetailsFlowComponent', () => {
  let component: TransactionDetailsFlowComponent;
  let fixture: ComponentFixture<TransactionDetailsFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionDetailsFlowComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionDetailsFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
