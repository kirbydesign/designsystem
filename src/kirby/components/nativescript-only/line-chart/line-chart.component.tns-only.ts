import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TrackballCustomContentData } from 'nativescript-ui-chart';

export class NativeScriptLineChartItem {
  constructor(
    public category: number,
    public amount: number
    ) {
  }
}

@Component({
  selector: 'kirby-nativescript-line-chart',
  templateUrl: './line-chart.component.tns-only.html',
  styleUrls: ['./line-chart.component.tns-only.scss']
})
export class NativeScriptLineChartComponent implements OnInit, OnChanges {
  @Input() items: NativeScriptLineChartItem[];
  public strokeWidth = 2;
  public fillColor = '#CAEADC';
  public strokeColor = '#0A4B2E';
  public maximum = 0;
  public minimum = 0;
  public labelText: string;
  private chartBorderBottom = 30;

  constructor() {}

  ngOnInit() {
    // Included to avoid a null error bug in NativeScript UI.
    this.items = [{'category': 0, 'amount': 0}];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.maximum = this.getMaximum(this.items);
      this.minimum = this.getMinimum(this.items);
      this.labelText = '' + this.items[this.items.length - 1].amount;
    }
  }

  getMinimum(items: NativeScriptLineChartItem[]) {
    if (items == null) {
      return 0;
    }
    const min = this.getMinY(this.items) - this.strokeWidth - this.chartBorderBottom;
    return (min < 0) ? 0 : min;
  }

  getMaximum(items: NativeScriptLineChartItem[]) {
    if (items == null) {
      return 0;
    }
    return this.getMaxY(this.items) + this.strokeWidth;
  }

  getYs(items: NativeScriptLineChartItem[]) {
    return items.map(d => d.amount);
  }

  getMinY(items: NativeScriptLineChartItem[]) {
    return Math.min(...this.getYs(items));
  }

  getMaxY(items: NativeScriptLineChartItem[]) {
    return Math.max(...this.getYs(items));
  }

  onTrackBallContentRequested(args: TrackballCustomContentData) {
    const selectedItem: NativeScriptLineChartItem = args.pointData;
    args.content = '' + selectedItem.amount;
    this.labelText = '' + selectedItem.amount;

  }

}
