import { Component, OnInit } from '@angular/core';
import { SegmentItem } from '@kirbydesign/designsystem';
import { OtherService } from '../other.service';
@Component({
  selector: 'flows-choose-receiver',
  templateUrl: './choose-receiver.component.html',
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

  public isDisabled: boolean = true;
  selectedSegment = this.items[0];

  constructor(private otherService: OtherService) {}

  changeSegment(segment: SegmentItem) {
    this.selectedSegment = segment;
  }

  ngOnInit(): void {
    this.otherService.getFormFilled().subscribe((formFilled) => (this.isDisabled = !formFilled));
  }

  saveReceiver() {
    this.otherService.addReceiver();
  }
}
