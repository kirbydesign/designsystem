import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kirby-segment-example',
  templateUrl: './segment-example.component.html',
  styleUrls: ['./segment-example.component.scss'],
})
export class SegmentExampleComponent implements OnInit {
  constructor() {}
  myItems: any[] = [
    {
      id: 1,
      data: 'chip-1',
    },
    {
      id: 2,
      data: 'chip-2',
    },
    {
      id: 3,
      data: 'chip-3',
    },
    {
      id: 4,
      data: 'chip-4',
    },
    {
      id: 5,
      data: 'chip-5',
    },
    {
      id: 6,
      data: 'chip-6',
    },
  ];
  selected: any = {
    id: 1,
    data: 'chip-1',
  };
  chipSelected(chip: any): void {
    this.selected = chip;
  }
  ngOnInit() {}
}
