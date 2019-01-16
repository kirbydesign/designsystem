import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TrackballCustomContentData } from 'nativescript-ui-chart';
import { EventData, Observable } from 'tns-core-modules/data/observable';
import { Label } from 'tns-core-modules/ui/label';
import * as platform from 'tns-core-modules/platform';
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
  private items2: NativeScriptLineChartItem[];
  @Input() currency: string;
  public strokeWidth = platform.isIOS ? 2 : 10;
  public fillColor = '#bfd6ce';
  public strokeColor = '#005c3c';
  public xAxisMaximum: string;
  public xAxisMinimum: string;
  public yAxisMaximum = 0;
  public yAxisMinimum = 0;
  public labelText: string;
  public legend: Date;
  private chartBorderBottom = 30;
  private oneDay = 1000 * 60 * 60 * 24;
  private oneWeek = 1000 * 60 * 60 * 24 * 7;

  constructor() {}

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      // Included to avoid null errors everywhere when first loading.
      if (this.items == null) {
        this.items = [{'category': 0, 'amount': 0}, {'category': 1545087600000, 'amount': 0}];
      }
      this.items2 = this.items;
      /*
      const lastDate = DateTime.fromMillis(this.getLastItem(this.items).category);
      this.xAxisMaximum = lastDate.toJSDate();
      const firstDate = DateTime.fromMillis(this.getFirstItem(this.items).category);
      this.xAxisMinimum = firstDate.toJSDate();
      */
      this.xAxisMaximum = this.convertDateToStringFormat(new Date(this.getLastItem(this.items).category));
      this.xAxisMinimum = this.convertDateToStringFormat(new Date(this.getFirstItem(this.items).category));
      //
      this.yAxisMaximum = this.getMaximum(this.items);
      this.yAxisMinimum = this.getMinimum(this.items);
      this.labelText = this.getLabelText(this.getLastItem(this.items));
      this.legend = new Date(this.getFirstItem(this.items).category);
    }
  }

  convertDateToStringFormat(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day}/${month}/${year}`;
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
    const lastDateMillisec = new Date(this.getLastItem(this.items).category).getTime();
    const label = <Label>args.object;
    switch (label.id) {
      case '1D': {
        const firstDateMillisec = lastDateMillisec - this.oneDay;
        this.xAxisMinimum = this.convertDateToStringFormat(new Date(firstDateMillisec));
        console.log(this.xAxisMinimum.toString());
        this.items = this.items2;
        break;
      }
      case '1W': {
        const firstDateMillisec = lastDateMillisec - this.oneWeek;
        this.xAxisMinimum = this.convertDateToStringFormat(new Date(firstDateMillisec));
        console.log(this.xAxisMinimum.toString());
        this.items = this.items2;
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
