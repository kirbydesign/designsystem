import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'kirby-segmented-chip-control',
  templateUrl: './segmented-chip-control.component.html',
  styleUrls: ['./segmented-chip-control.component.scss'],
})
class SegmentedChipControlComponent implements OnInit {
  @Input() items: string[];
  @Input() selectedItem: string;
  @Output() chipSelect = new EventEmitter<string>();

  constructor() {}

  segmentedChipSelect(item: string): void {
    this.selectedItem = item;
    this.chipSelect.emit(item);
  }

  ngOnInit(): void {}
}
export { SegmentedChipControlComponent };
