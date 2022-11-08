import { Component, Input, OnInit, Inject, Optional, SkipSelf } from '@angular/core';
import { COMPONENT_PROPS, Modal } from '@kirbydesign/designsystem';
import { Other } from '../other.model';
import { OtherService } from '../other.service';
import { VerifyService } from '../verify.service';

@Component({
  selector: 'flows-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  verified: boolean = false;
  amount: number;
  from: string;
  receiver: string;
  text: string;
  message: string;
  date: string;

  constructor(
    @Inject(COMPONENT_PROPS) private componentProps,
    private verifyService: VerifyService,
    @Optional() @SkipSelf() private modal: Modal
  ) {
    this.verified = componentProps.prop1;
    if (this.verified === false) {
      this.amount = componentProps.amount;
      this.from = componentProps.from;
      this.receiver = componentProps.receiver;
      this.text = componentProps.text;
      this.message = componentProps.message;
      this.date = componentProps.date;
    } else if (this.verified === true) {
      this.amount = componentProps.verifiedDetails.amount;
      this.from = componentProps.verifiedDetails.from;
      this.receiver = componentProps.verifiedDetails.receiver;
      this.text = componentProps.verifiedDetails.text;
      this.message = componentProps.verifiedDetails.message;
      this.date = componentProps.verifiedDetails.date;
    }
  }

  onClick() {
    this.verifyService.setVerifyStatus(true);
    const returnData = {
      verified: this.verified,
      amount: this.amount,
      from: this.from,
      receiver: this.receiver,
      text: this.text,
      message: this.message,
      date: this.date,
    };
    this.modal?.close(returnData);
  }
  ngOnInit(): void {}
}
