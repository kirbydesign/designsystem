import { Component } from '@angular/core';
import { CardModule } from '@kirbydesign/designsystem/card';
import { StockChartExampleComparisonComponent } from './example/comparison';
import { StockChartExampleSimpleDatasetComponent } from './example/simple-dataset';

@Component({
  selector: 'cookbook-stock-chart-example',
  templateUrl: './stock-chart-example.component.html',
  styleUrls: ['./stock-chart-example.component.scss'],
  imports: [
    CardModule,
    StockChartExampleComparisonComponent,
    StockChartExampleSimpleDatasetComponent,
  ],
})
export class StockChartExampleComponent {}
