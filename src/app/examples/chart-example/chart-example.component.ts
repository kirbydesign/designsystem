import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kirby-chart-example',
  templateUrl: './chart-example.component.html',
  styleUrls: ['./chart-example.component.scss']
})
export class ChartExampleComponent implements OnInit {

  constructor() { }

  data = [160.9, 171.5, 106.4, 129.2, 144.0, 146.0, 135.6, 148.5, 180.4, 194.1, 195.6, 170.4];

  ngOnInit() { }

}
