import { Component, OnInit } from '@angular/core';
import { OwnAccountPageComponent } from '../own-account-page/own-account-page.component';
import { OtherPageComponent } from '../other-page/other-page.component';
import { SegmentItem } from '@kirbydesign/designsystem';
import { OtherService } from '../other.service';
@Component({
  selector: 'flows-choose-receiver',
  templateUrl: './choose-reciever.component.html',
  styleUrls: ['./choose-receiver.component.scss'],
})
export class ChooseReceiverComponent implements OnInit {
  readonly items: SegmentItem[] = [
    {
      text: 'Own Account',
      id: 'OwnAccountPage',
    },
    {
      text: 'Other',
      id: 'OtherPage',
    },
  ];

  isDisabled: boolean;
  selectedSegment = this.items[0];

  constructor(private OtherService: OtherService) {}

  onSegmentSelect(segment: SegmentItem) {
    this.selectedSegment = segment;
  }

  ngOnInit(): void {
    this.selectedSegment = this.items[0];
    this.OtherService.getFormFilled().subscribe((formFilled) => (this.isDisabled = !formFilled));
  }

  saveReceiver() {
    this.OtherService.saveReceiver();
  }
}
