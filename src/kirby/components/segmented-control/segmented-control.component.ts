import { Component, EventEmitter, Output, Input } from '@angular/core';

import { SegmentItem } from './segment-item';

@Component({
  selector: 'kirby-segmented-control',
  templateUrl: './segmented-control.component.html',
  styleUrls: ['./segmented-control.component.scss'],
})
export class SegmentedControlComponent {
  @Output() segmentClicked: EventEmitter<any> = new EventEmitter();
  @Input() segmentItems: SegmentItem[];

  onSegmentClick(ev: any) {
    this.segmentClicked.emit(ev.target.value);
  }
}
