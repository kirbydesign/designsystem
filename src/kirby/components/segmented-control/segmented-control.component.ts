import { Component, EventEmitter, Output, Input, HostBinding } from '@angular/core';

import { SegmentItem } from './segment-item';

@Component({
  selector: 'kirby-segmented-control',
  templateUrl: './segmented-control.component.html',
  styleUrls: ['./segmented-control.component.scss'],
})
export class SegmentedControlComponent {
  @Output() segmentSelect: EventEmitter<SegmentItem> = new EventEmitter();

  @HostBinding('class.default-mode')
  isDefaultMode: boolean = true; // Default

  @HostBinding('class.chip-mode')
  isChipMode: boolean;

  @Input() items: SegmentItem[];

  @Input() set mode(mode: 'default' | 'chip') {
    this.isDefaultMode = mode === 'default';
    this.isChipMode = mode === 'chip';
  }

  activeSegment: SegmentItem;

  onSegmentSelect(item: SegmentItem) {
    this.activeSegment = item;
    this.items.forEach((segment) => (segment.checked = this.activeSegment.id === segment.id));
    this.segmentSelect.emit(this.activeSegment);
  }
}
