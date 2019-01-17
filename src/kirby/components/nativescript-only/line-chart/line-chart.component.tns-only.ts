import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { TrackballCustomContentData } from 'nativescript-ui-chart';
import { EventData } from 'tns-core-modules/data/observable';
import { Label } from 'tns-core-modules/ui/label';
import * as platform from 'tns-core-modules/platform';
import { SelectorsMap } from 'tns-core-modules/ui/styling/css-selector/css-selector';
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
  @Input() selectors;
  @Input() legendText;
  @Output() selectorChange: EventEmitter<any> = new EventEmitter();
  public strokeWidth = platform.isIOS ? 2 : 10;
  public fillColor = '#bfd6ce';
  public strokeColor = '#005c3c';
  public xAxisMaximum: Date;
  public xAxisMinimum: Date;
  public yAxisMaximum: number;
  public yAxisMinimum: number;
  public labelText: string;
  public legendDate: Date;
  private chartBorderBottom = 30;

  constructor() {}

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      if (this.items != null) {
        // Set x-axis minimum and maximum to first and last item.
        this.xAxisMaximum = new Date(this.getLastItem(this.items).category);
        this.xAxisMinimum = new Date(this.getFirstItem(this.items).category);
        // Set y-axis to best minimum and maximum.
        this.yAxisMaximum = this.getMaximum(this.items);
        this.yAxisMinimum = this.getMinimum(this.items);
        // Set texts based on items.
        this.labelText = this.getLabelText(this.getLastItem(this.items));
        this.legendDate = new Date(this.getFirstItem(this.items).category);
      }
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
    this.selectorChange.emit(label.id);
  }

}
