import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kirby-chart-example',
  templateUrl: './chart-example.component.html',
  styleUrls: ['./chart-example.component.scss'],
})
export class ChartExampleComponent implements OnInit {
  constructor() {}

  data = [
    1600.9,
    1710.5,
    1060.4,
    1290.2,
    1440.0,
    1460.0,
    1350.6,
    1480.5,
    1800.4,
    1940.1,
    1950.6,
    1700.4,
    1600.9,
    1710.5,
    1060.4,
    1290.2,
    1440.0,
    1460.0,
    1350.6,
    1480.5,
    1800.4,
    1940.1,
    1950.6,
    1700.4,
  ];

  ngOnInit() {}
}
