import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TrackballCustomContentData } from 'nativescript-ui-chart';
import { EventData, Observable } from 'tns-core-modules/data/observable';
import { Label } from 'tns-core-modules/ui/label';
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
  public legend: Date;
  private chartBorderBottom = 30;

  constructor() {}

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      // Included to avoid null errors everywhere when first loading.
      if (this.items == null) {
        this.items = [{'category': 0, 'amount': 0}];
      }
      this.maximum = this.getMaximum(this.items);
      this.minimum = this.getMinimum(this.items);
      this.labelText = this.getLabelText(this.getLastItem(this.items));
      const firstItem = this.getFirstItem(this.items);
      this.legend = new Date(firstItem.category);
    }
  }

  getFirstItem(items: NativeScriptLineChartItem[]) {
    return items[0];
  }

  getLastItem(items: NativeScriptLineChartItem[]) {
    return items[items.length - 1];
  }

  getLabelText(item: NativeScriptLineChartItem) {
    return `${item.amount} ${this.currency}`;
  }

  getMinimum(items: NativeScriptLineChartItem[]) {
    const min = this.getMinY(this.items) - this.strokeWidth - this.chartBorderBottom;
    return (min < 0) ? 0 : min;
  }

  getMaximum(items: NativeScriptLineChartItem[]) {
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

  onTap(args: EventData) {
    const label = <Label>args.object;
    switch (label.id) {
      case '1D': {
        console.log('1d');
        break;
      }
      case '1W': {
        console.log('1d');
        break;
      }
      case '1M': {
        console.log('1d');
        break;
      }
      case '1Y': {
        console.log('1d');
        break;
      }
      case '5Y': {
        console.log('1d');
        break;
      }
      case 'YTD': {
        console.log('1d');
        break;
      }
      default: {
        console.log('something else');
        break;
      }
    }
  }
}
