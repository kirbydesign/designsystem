import { Component, OnInit } from '@angular/core';
declare var require: any;

@Component({
  selector: 'kirby-doughnut-chart-showcase',
  templateUrl: './doughnut-chart-showcase.component.html',
  styleUrls: ['./doughnut-chart-showcase.component.scss'],
})
export class DoughnutChartShowcaseComponent implements OnInit {
  exampleHtml: string = require('../../examples/nativescript-only/doughnut-chart-example/doughnut-chart-example.component.tns-only.html');

  constructor() {}

  ngOnInit() {}
}
