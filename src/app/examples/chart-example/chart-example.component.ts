import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kirby-chart-example',
  templateUrl: './chart-example.component.html',
  styleUrls: ['./chart-example.component.scss']
})
export class ChartExampleComponent implements OnInit {

  constructor() { }

  data = [1600.90, 1710.50, 1060.40, 1290.20, 1440.00, 1460.00, 1350.60, 1480.50, 1800.40, 1940.10, 1950.60,
          1700.40, 1600.90, 1710.50, 1060.40, 1290.20, 1440.00, 1460.00, 1350.60, 1480.50, 1800.40, 1940.10, 1950.60, 1700.40];

  ngOnInit() { }

}
