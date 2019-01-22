import { Component, OnInit } from '@angular/core';
declare var require: any;

@Component({
  selector: 'kirby-line-chart-showcase',
  templateUrl: './line-chart-showcase.component.html',
  styleUrls: ['./line-chart-showcase.component.scss']
})

export class LineChartShowcaseComponent implements OnInit {
    exampleHtml: string = require('../../examples/nativescript-only/line-chart-example/line-chart-example.component.tns-only.html');

    constructor() { }

    ngOnInit() {
    }

  }
