import { Component, OnInit } from '@angular/core';
declare var require: any;

@Component({
  selector: 'kirby-segment-showcase',
  templateUrl: './segment-showcase.component.html',
  styleUrls: ['./segment-showcase.component.scss'],
})
export class SegmentShowcaseComponent implements OnInit {
  exampleHtml: string = require('../../examples/segment-example/segmented-chip-control-example/segmented-chip-control-example.component.html');

  constructor() {}

  ngOnInit() {}
}
