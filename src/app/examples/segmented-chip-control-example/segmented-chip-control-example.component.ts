import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kirby-segmented-chip-control-example',
  templateUrl: './segmented-chip-control-example.component.html',
  styleUrls: ['./segmented-chip-control-example.component.scss'],
})
export class SegmentedChipControlExampleComponent implements OnInit {
  constructor() {}
  items: string[] = ['chip-1', 'chip-2', 'chip-3', 'chip-4', 'chip-5', 'chip-6'];
  selectedItem: string = this.items[0];
  onChipSelect(chip: string): void {
    this.selectedItem = chip;
  }
  ngOnInit() {}
}
