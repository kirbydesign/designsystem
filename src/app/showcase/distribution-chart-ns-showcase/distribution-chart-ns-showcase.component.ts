import { Component, OnInit } from '@angular/core';
declare var require: any;

@Component({
  selector: 'kirby-distribution-chart-ns-showcase',
  templateUrl: './distribution-chart-ns-showcase.component.html',
  styleUrls: ['./distribution-chart-ns-showcase.component.scss']
})

export class DistributionChartNsShowcaseComponent implements OnInit {
    exampleHtml: string = require('../../examples/distribution-chart-ns-example/distribution-chart-ns-example.component.html');

    constructor() { }

    ngOnInit() {
    }

  }
