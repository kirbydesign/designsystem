import { Component, Inject, Optional, SkipSelf } from '@angular/core';
import { COMPONENT_PROPS, Modal } from '@kirbydesign/designsystem';
import { Detail } from '../detail.model';
import { VerifyService } from '../verify.service';

@Component({
  selector: 'flows-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  standalone: false,
})
export class DetailsComponent {
  verified: boolean = false;

  verifyDetail: Detail = {
    detailAreVerified: false,
    amount: '',
    from: '',
    receiver: '',
    text: '',
    message: '',
    date: '',
  };

  constructor(
    @Inject(COMPONENT_PROPS) private componentProps: Detail,
    private verifyService: VerifyService,
    @Optional() @SkipSelf() private modal: Modal
  ) {
    this.verified = this.componentProps.detailAreVerified;
    this.verifyDetail = this.componentProps;
  }

  onVerify() {
    this.verifyService.setVerifyStatus(true);
    const returnData = {
      detailAreVerified: true,
      amount: this.verifyDetail.amount,
      from: this.verifyDetail.from,
      receiver: this.verifyDetail.receiver,
      text: this.verifyDetail.text,
      message: this.verifyDetail.message,
      date: this.verifyDetail.date,
    };
    this.modal.close(returnData);
  }
}
