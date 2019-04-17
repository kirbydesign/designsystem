import { Component, OnInit } from '@angular/core';
declare var require: any;

@Component({
  selector: 'kirby-segmented-chip-control-showcase',
  templateUrl: './segmented-chip-control-showcase.component.html',
  styleUrls: ['./segmented-chip-control-showcase.component.scss'],
})
export class SegmentedChipControlShowcaseComponent implements OnInit {
  exampleHtml: string = require('../../examples/segmented-chip-control-example/segmented-chip-control-example.component.html');

  constructor() {}

  ngOnInit() {}
}
