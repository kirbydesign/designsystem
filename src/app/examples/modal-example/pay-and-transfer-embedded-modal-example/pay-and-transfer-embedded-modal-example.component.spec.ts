import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { KirbyModule } from '../../../../kirby/kirby.module';
import { PayAndTransferEmbeddedModalExampleComponent } from './pay-and-transfer-embedded-modal-example.component';

describe('PayAndTransferEmbeddedModalExampleComponent', () => {
  let component: PayAndTransferEmbeddedModalExampleComponent;
  let fixture: ComponentFixture<PayAndTransferEmbeddedModalExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [KirbyModule, RouterTestingModule],
      declarations: [PayAndTransferEmbeddedModalExampleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayAndTransferEmbeddedModalExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
