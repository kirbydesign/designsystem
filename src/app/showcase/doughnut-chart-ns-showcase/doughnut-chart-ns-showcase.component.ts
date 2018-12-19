import { Component, OnInit } from '@angular/core';
declare var require: any;

@Component({
  selector: 'kirby-doughnut-chart-ns-showcase',
  templateUrl: './doughnut-chart-ns-showcase.component.html',
  styleUrls: ['./doughnut-chart-ns-showcase.component.scss']
})

export class DoughnutChartNsShowcaseComponent implements OnInit {
    exampleHtml: string = require('../../examples/doughnut-chart-ns-example/doughnut-chart-ns-example.component.tns.html');

    constructor() { }

    ngOnInit() {
    }

  }
