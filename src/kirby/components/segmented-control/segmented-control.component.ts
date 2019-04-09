import { Component, EventEmitter, Output, Input } from '@angular/core';

import { SegmentItem } from './segment-item';

@Component({
  selector: 'kirby-segmented-control',
  templateUrl: './segmented-control.component.html',
  styleUrls: ['./segmented-control.component.scss'],
})
export class SegmentedControlComponent {
  @Output() segmentClick: EventEmitter<SegmentItem> = new EventEmitter();
  @Input() items: SegmentItem[];
  activeSegment: SegmentItem;

  onSegmentClick(item: SegmentItem) {
    this.activeSegment = item;
    this.items.forEach((segment) => (segment.checked = this.activeSegment.id === segment.id));
    this.segmentClick.emit(this.activeSegment);
  }
}
