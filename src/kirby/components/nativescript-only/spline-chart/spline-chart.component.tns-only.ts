import { Component, OnInit, Input } from '@angular/core';
import * as platform from 'tns-core-modules/platform';

export class NativeScriptSplineChartItem {
  constructor(
    public category: string,
    public amount: number
    ) {
  }
}

@Component({
  selector: 'kirby-nativescript-spline-chart',
  templateUrl: './spline-chart.component.tns-only.html',
  styleUrls: ['./spline-chart.component.tns-only.scss']
})
export class NativeScriptSplineChartComponent implements OnInit {

  @Input() items: NativeScriptSplineChartItem[];

  public categoricalSource: { Country: string, Amount: number, SecondVal: number, ThirdVal: number, Impact: number, Year: number }[];

  constructor() {}

  ngOnInit() {
    this.categoricalSource = this.getCategoricalSource();
  }

  getCategoricalSource(): { Country: string, Amount: number, SecondVal: number, ThirdVal: number, Impact: number, Year: number }[] {
    return [
      { Country: 'Germany', Amount: 15, SecondVal: 14, ThirdVal: 24, Impact: 0, Year: 0 },
      { Country: 'France', Amount: 13, SecondVal: 23, ThirdVal: 25, Impact: 0, Year: 0 },
      { Country: 'Bulgaria', Amount: 24, SecondVal: 17, ThirdVal: 23, Impact: 0, Year: 0 },
      { Country: 'Spain', Amount: 11, SecondVal: 19, ThirdVal: 24, Impact: 0, Year: 0 },
      { Country: 'USA', Amount: 18, SecondVal: 8, ThirdVal: 21, Impact: 0, Year: 0 }
    ];
  }

}
