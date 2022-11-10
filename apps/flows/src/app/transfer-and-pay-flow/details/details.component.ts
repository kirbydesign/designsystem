import { Component, Input, OnInit, Inject, Optional, SkipSelf } from '@angular/core';
import { COMPONENT_PROPS, Modal } from '@kirbydesign/designsystem';
import { Detail } from '../detail.model';
import { Other } from '../other.model';
import { OtherService } from '../other.service';
import { VerifyService } from '../verify.service';
import { Transfer } from '../transfer.model';
@Component({
  selector: 'flows-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  verified: boolean = false;

  verifyDetail: Detail = {
    verify: false,
    amount: '',
    from: '',
    receiver: '',
    text: '',
    message: '',
    date: '',
  };

  constructor(
    @Inject(COMPONENT_PROPS) private componentProps,
    private verifyService: VerifyService,
    @Optional() @SkipSelf() private modal: Modal
  ) {
    this.verified = componentProps.prop1;
    if (this.verified === false) {
      this.verifyDetail.amount = componentProps.amount;
      this.verifyDetail.from = componentProps.from;
      this.verifyDetail.receiver = componentProps.receiver;
      this.verifyDetail.text = componentProps.text;
      this.verifyDetail.message = componentProps.message;
      this.verifyDetail.date = componentProps.date;
    } else if (this.verified === true) {
      this.verifyDetail.amount = componentProps.verifiedDetails.amount;
      this.verifyDetail.from = componentProps.verifiedDetails.from;
      this.verifyDetail.receiver = componentProps.verifiedDetails.receiver;
      this.verifyDetail.text = componentProps.verifiedDetails.text;
      this.verifyDetail.message = componentProps.verifiedDetails.message;
      this.verifyDetail.date = componentProps.verifiedDetails.date;
    }
  }

  onVerify() {
    this.verifyService.setVerifyStatus(true);
    const returnData = {
      verified: this.verified,
      amount: this.verifyDetail.amount,
      from: this.verifyDetail.from,
      receiver: this.verifyDetail.receiver,
      text: this.verifyDetail.text,
      message: this.verifyDetail.message,
      date: this.verifyDetail.date,
    };
    this.modal?.close(returnData);
  }
}
