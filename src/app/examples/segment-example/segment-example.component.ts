import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kirby-segment-example',
  templateUrl: './segment-example.component.html',
  styleUrls: ['./segment-example.component.scss'],
})
export class SegmentExampleComponent implements OnInit {
  constructor() {}
  items: string[] = ['chip-1', 'chip-2', 'chip-3', 'chip-4', 'chip-5', 'chip-6'];
  selectedItem: string = 'chip-1';
  onChipSelected(chip: string): void {
    this.selectedItem = chip;
  }
  ngOnInit() {}
}
