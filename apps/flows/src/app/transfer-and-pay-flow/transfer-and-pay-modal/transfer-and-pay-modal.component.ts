import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalConfig, ModalController } from '@kirbydesign/designsystem';
import { ChooseReceiverComponent } from '../choose-receiver/choose-receiver.component';
import { ChooseOwnAccountComponent } from '../choose-own-account/choose-own-account.component';
import { OtherService } from '../other.service';
import { OwnAccountService } from '../own-account.service';
import { OwnAccount } from '../own-account.model';
import { Account } from '../account.model';
import { ChooseDateComponent } from '../choose-date/choose-date.component';
import { ChooseTextAndMessageComponent } from '../choose-text-and-message/choose-text-and-message.component';
import { TextAndDateService } from '../text-and-date.service';
import { DetailsComponent } from '../details/details.component';
import { VerifyService } from '../verify.service';
import { Detail } from '../detail.model';

@Component({
  selector: 'flows-transfer-and-pay-modal',
  templateUrl: './transfer-and-pay-modal.component.html',
  styleUrls: ['./transfer-and-pay-modal.component.scss'],
  standalone: false,
})
export class TransferAndPayModalComponent implements OnInit {
  constructor(
    private modalController: ModalController,
    private otherService: OtherService,
    private ownAccountService: OwnAccountService,
    private textAndDateService: TextAndDateService,
    private verifyService: VerifyService
  ) {}

  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  public currency: string;
  public currencyEntered: boolean = false;
  public receiverChosen: boolean = false;
  public isDisabled: boolean;
  public transferRegistered: boolean = false;
  public selectedAccount: OwnAccount[];
  public selectedReceiver: Account[];
  public date: string;
  public text: string;
  public message: string;
  public verifiedDetails: Detail;

  ngOnInit(): void {
    this.otherService
      .getReceiverBoolean$()
      .subscribe((receiverChosen) => (this.receiverChosen = receiverChosen));
    this.ownAccountService
      .getOwnAccountSelected$()
      .subscribe((selected) => (this.selectedAccount = selected));
    this.ownAccountService.setSelected(1);
    this.ownAccountService
      .getSelectedReceiver$()
      .subscribe((selected) => (this.selectedReceiver = selected));
    this.otherService.getReceiver$().subscribe((selected) => (this.selectedReceiver = selected));

    this.textAndDateService.getDate$().subscribe((date) => (this.date = date));
    this.textAndDateService.getText$().subscribe((text) => (this.text = text));
    this.textAndDateService.getMessage$().subscribe((message) => (this.message = message));

    this.textAndDateService.setDate('Today');
    this.textAndDateService.setText('Text to account');
    this.textAndDateService.setMessage('Text to other');

    this.verifyService
      .getVerifyStatus$()
      .subscribe((verifyStatus) => (this.transferRegistered = verifyStatus));
    this.verifyService.setVerifyStatus(false);
  }

  showModalChooseReciever() {
    const config: ModalConfig = {
      flavor: 'drawer',
      component: ChooseReceiverComponent,
    };
    this.modalController.showModal(config);
  }

  showModalChooseOwnAccount() {
    const config: ModalConfig = {
      flavor: 'drawer',
      component: ChooseOwnAccountComponent,
    };
    this.modalController.showModal(config);
  }

  showModalChooseDate() {
    const config: ModalConfig = {
      flavor: 'drawer',
      component: ChooseDateComponent,
    };
    this.modalController.showModal(config);
  }

  showModalChooseTextAndMessage() {
    const config: ModalConfig = {
      flavor: 'drawer',
      component: ChooseTextAndMessageComponent,
    };
    this.modalController.showModal(config);
  }

  showModalVerifyDetails() {
    const config: ModalConfig = {
      flavor: 'drawer',
      component: DetailsComponent,
      componentProps: {
        detailAreVerified: false,
        amount: this.currency,
        from: this.selectedAccount[0].name,
        receiver: this.selectedReceiver[0].name,
        text: this.text,
        message: this.message,
        date: this.date,
      } as Detail,
    };
    this.modalController.showModal(config, this.closeModalSaveReturnedDetail);
  }

  private closeModalSaveReturnedDetail = (dataReturnedByModal) => {
    this.serVerifiedDetails(dataReturnedByModal);
  };

  private serVerifiedDetails(verifiedDetails: Detail) {
    this.verifiedDetails = verifiedDetails;
  }

  currencyEnteredUpdateStyle(): void {
    if (this.currency.length === 0) {
      this.currencyEntered = false;
    }
    if (this.currency.length >= 1 && this.receiverChosen) {
      this.currencyEntered = true;
    }
    if (this.currency.length > 3) {
      this.input.nativeElement.classList.remove('currency-input_medium-text');
      this.input.nativeElement.classList.add('currency-input_large-text');
    }
    if (this.currency.length > 5) {
      this.input.nativeElement.classList.remove('currency-input_small-text');
      this.input.nativeElement.classList.add('currency-input_medium-text');
    }
    if (this.currency.length > 7) {
      this.input.nativeElement.classList.remove('currency-input_medium-text');
      this.input.nativeElement.classList.add('currency-input_small-text');
    }
  }
}
