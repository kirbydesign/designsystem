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

  activeSegment: string;

  onSegmentTap(item: SegmentItem) {
    this.activeSegment = item.id;
    this.segmentItems.forEach((segment) => (segment.checked = this.activeSegment === segment.id));
    this.segmentClicked.emit(this.activeSegment);
  }
}
