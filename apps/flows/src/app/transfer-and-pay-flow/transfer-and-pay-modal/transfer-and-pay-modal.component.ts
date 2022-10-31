import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalConfig, ModalController } from '@kirbydesign/designsystem';
import { ChooseReceiverComponent } from '../choose-receiver/choose-receiver.component';
import { ChooseOwnAccountComponent } from '../choose-own-account/choose-own-account.component';
import { OtherService } from '../other.service';
import { OwnAccountService } from '../own-account.service';
import { OwnAccount } from '../own-account';
import { Account } from '../account';

@Component({
  selector: 'flows-transfer-and-pay-modal',
  templateUrl: './transfer-and-pay-modal.component.html',
  styleUrls: ['./transfer-and-pay-modal.component.scss'],
})
export class TransferAndPayModalComponent implements OnInit {
  constructor(
    private modalController: ModalController,
    private otherService: OtherService,
    private ownAccountService: OwnAccountService
  ) {}

  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  currency: string;
  currencyEntered: boolean = false;
  receiverChosen: boolean = false;
  isDisabled: boolean;
  selectedAccount: OwnAccount[];
  selectedReceiver: Account[];

  ngOnInit(): void {
    this.otherService.getReceiverBoolean$().subscribe((boolean) => (this.receiverChosen = boolean));
    this.ownAccountService
      .getOwnAccountSelected$()
      .subscribe((selected) => (this.selectedAccount = selected));
    this.ownAccountService.setSelected(1);
    this.ownAccountService
      .getSelectedReceiver$()
      .subscribe((selected) => (this.selectedReceiver = selected));
    this.otherService.getReceiver$().subscribe((selected) => (this.selectedReceiver = selected));
  }

  showModalChooseReciever() {
    const config: ModalConfig = {
      flavor: 'drawer',
      component: ChooseReceiverComponent,
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

  onChange(): void {
    if (this.currency.length === 0) {
      this.currencyEntered = false;
    }
    if (this.currency.length >= 1) {
      if (this.receiverChosen === true) {
        this.currencyEntered = true;
      }
    }
    if (this.currency.length > 5) {
      this.input.nativeElement.classList.remove('medium-text');
      this.input.nativeElement.classList.add('large-text');
    }
    if (this.currency.length > 7) {
      this.input.nativeElement.classList.remove('small-text');
      this.input.nativeElement.classList.add('medium-text');
    }
    if (this.currency.length > 9) {
      this.input.nativeElement.classList.remove('medium-text');
      this.input.nativeElement.classList.add('small-text');
    }
  }
}
