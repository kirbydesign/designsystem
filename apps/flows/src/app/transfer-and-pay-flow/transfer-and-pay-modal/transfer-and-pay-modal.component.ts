import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalConfig, ModalController } from '@kirbydesign/designsystem';
import { ChooseRecieverComponent } from '../choose-reciever/choose-reciever.component';
import { ChooseOwnAccountComponent } from '../choose-own-account/choose-own-account.component';

@Component({
  selector: 'flows-transfer-and-pay-modal',
  templateUrl: './transfer-and-pay-modal.component.html',
  styleUrls: ['./transfer-and-pay-modal.component.scss'],
})
export class TransferAndPayModalComponent {
  constructor(private modalController: ModalController) {}

  @ViewChild('input') public input: ElementRef<HTMLInputElement>;
  currency: string;

  showModalChooseReciever() {
    const config: ModalConfig = {
      flavor: 'drawer',
      component: ChooseRecieverComponent,
      componentProps: {
        prop1: 'value1',
        prop2: 'value2',
      },
    };
    this.modalController.showModal(config);
  }

  showModalChooseOwnAccount() {
    const config: ModalConfig = {
      flavor: 'drawer',
      component: ChooseOwnAccountComponent,
      componentProps: {
        prop1: 'value1',
        prop2: 'value2',
      },
    };
    this.modalController.showModal(config);
  }

  onCurrencyEntered(): void {
    if (this.currency.length > 5) {
      this.input.nativeElement.classList.remove('currency-input_medium-text');
      this.input.nativeElement.classList.add('currency-input_large-text');
    }
    if (this.currency.length > 7) {
      this.input.nativeElement.classList.remove('currency-input_small-text');
      this.input.nativeElement.classList.add('currency-input_medium-text');
    }
    if (this.currency.length > 9) {
      this.input.nativeElement.classList.remove('currency-input_medium-text');
      this.input.nativeElement.classList.add('currency-input_small-text');
    }
  }
}
