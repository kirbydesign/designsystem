import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferAndPayModalComponent } from './transfer-and-pay-modal.component';

describe('TransferAndPayModalComponent', () => {
  let component: TransferAndPayModalComponent;
  let fixture: ComponentFixture<TransferAndPayModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransferAndPayModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferAndPayModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
