import { Component, OnInit } from '@angular/core';
declare var require: any;

@Component({
  selector: 'kirby-chart-showcase',
  templateUrl: './chart-showcase.component.html',
  styleUrls: ['./chart-showcase.component.scss'],
})
export class ChartShowcaseComponent implements OnInit {
  exampleHtml: string = require('!raw-loader!../../examples/chart-example/chart-example.component.html')
    .default;

  constructor() {}

  ngOnInit() {}
}
