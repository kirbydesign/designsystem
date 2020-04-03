import {
  Component,
  EventEmitter,
  Output,
  Input,
  HostBinding,
  SimpleChanges,
  OnChanges,
  AfterViewChecked,
} from '@angular/core';

import { SegmentItem } from './segment-item';

@Component({
  selector: 'kirby-segmented-control',
  templateUrl: './segmented-control.component.html',
  styleUrls: ['./segmented-control.component.scss'],
})
export class SegmentedControlComponent implements OnChanges, AfterViewChecked {
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

  private isInitializing = false;

  onSegmentSelect(item: SegmentItem) {
    if (!this.isInitializing) {
      this.activeSegment = item;
      this.segmentSelect.emit(this.activeSegment);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items) {
      // Flag to prevent emitting onSegmentSelect event if previous items exists
      // Is cleared in ngAfterViewChecked
      this.isInitializing = true;
      this.activeSegment = (this.items || []).find((item) => item.checked);
    }
  }

  ngAfterViewChecked(): void {
    this.isInitializing = false;
  }
}
