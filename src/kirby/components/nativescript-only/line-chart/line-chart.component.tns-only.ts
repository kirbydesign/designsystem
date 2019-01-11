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
  @Input() currency: string;
  public strokeWidth = 2;
  public fillColor = '#bfd6ce';
  public strokeColor = '#005c3c';
  public maximum = 0;
  public minimum = 0;
  public labelText: string;
  public legend: string;
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
      this.labelText = this.getLabelText(this.getLastItem(this.items));
      this.legend = new Date(this.getFirstItem(this.items).category).getUTCDate().toString();
    }
  }

  getFirstItem(items: NativeScriptLineChartItem[]) {
    if (items == null) {
      return null;
    }
    return items[0];
  }

  getLastItem(items: NativeScriptLineChartItem[]) {
    if (items == null) {
      return null;
    }
    return items[items.length - 1];
  }

  getLabelText(item: NativeScriptLineChartItem) {
    if (item == null) {
      return '';
    }
    return `${item.amount} ${this.currency}`;
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
    args.content = this.getLabelText(selectedItem);
    this.labelText = this.getLabelText(selectedItem);

  }

}
