import { Component } from '@angular/core';
import { CardModule } from '@kirbydesign/designsystem/card';
import { StockChartExampleComparisonComponent } from './example/stock-chart-example-comparison.component';
import { StockChartExampleSimpleComponent } from './example/stock-chart-example-simple.component';

@Component({
  selector: 'cookbook-stock-chart-example',
  templateUrl: './stock-chart-example.component.html',
  styleUrls: ['./stock-chart-example.component.scss'],
  imports: [CardModule, StockChartExampleComparisonComponent, StockChartExampleSimpleComponent],
})
export class StockChartExampleComponent {}
