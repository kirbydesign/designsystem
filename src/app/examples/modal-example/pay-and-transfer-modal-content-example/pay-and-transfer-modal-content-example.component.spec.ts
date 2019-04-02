import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { KirbyModule } from '../../../../kirby/kirby.module';
import { PayAndTransferModalContentExampleComponent } from './pay-and-transfer-modal-content-example.component';

describe('PayAndTransferModalContentComponent', () => {
  let component: PayAndTransferModalContentExampleComponent;
  let fixture: ComponentFixture<PayAndTransferModalContentExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [KirbyModule, RouterTestingModule],
      declarations: [PayAndTransferModalContentExampleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayAndTransferModalContentExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
