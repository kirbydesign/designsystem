import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kirby-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() chartType = 'bar';
  @Input() labels: string[] = ['Taco', 'Toast', 'Pizza'];
  @Input() data: any[] = [300, 500, 100];

  constructor() { }

  ngOnInit() {
  }

}
