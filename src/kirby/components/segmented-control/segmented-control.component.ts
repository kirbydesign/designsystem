import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { SegmentItem } from './segment-item';

@Component({
  selector: 'kirby-segmented-control',
  templateUrl: './segmented-control.component.html',
  styleUrls: ['./segmented-control.component.scss'],
})
export class SegmentedControlComponent implements OnInit {
  @Output() segmentClicked: EventEmitter<any> = new EventEmitter();
  @Input() segmentItems: SegmentItem[];

  constructor() {}

  ngOnInit() {}

  onSegmentClick(ev: any) {
    this.segmentClicked.emit(ev.target.value);
  }
}
