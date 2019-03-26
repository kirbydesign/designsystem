import { Component, OnInit } from '@angular/core';

interface SegmentChip {
  index: number,
  title: string
}

@Component({
  selector: 'kirby-segment-example',
  templateUrl: './segment-example.component.html',
  styleUrls: ['./segment-example.component.scss'],
})
export class SegmentExampleComponent implements OnInit {
  constructor() {}
  myItems: SegmentChip[] = [
    {
      index: 1,
      title: 'chip-1',
    },
    {
      index: 2,
      title: 'chip-2',
    },
    {
      index: 3,
      title: 'chip-3',
    },
    {
      index: 4,
      title: 'chip-4',
    },
    {
      index: 5,
      title: 'chip-5',
    },
    {
      index: 6,
      title: 'chip-6',
    },
  ];
  selected: SegmentChip = {
    index: 1,
    title: 'chip-1',
  };
  chipSelected(chip: SegmentChip): void {
    this.selected = chip;
  }
  ngOnInit() {}
}
