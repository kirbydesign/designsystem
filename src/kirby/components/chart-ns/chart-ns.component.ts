import { PlatformService } from '../../../../shared/services/platform.service';
import { Distribution } from '../../models/distribution';
import { CustodyAccountService } from '../../services/custody-account.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PathLocationStrategy } from '@angular/common';


export class Model {
  constructor(
    public type?: string,
    public percentage?: number,
    public drawingPercentage?: number,
    public labelPercentage?: string,
    public color?: string
    ) {
  }
}

@Component({
  selector: 'drb-chart',
  templateUrl: './chart-ns.component.html',
  styleUrls: ['./chart-ns.component.scss']
})
export class ChartNsComponent implements OnInit {
  private _models$: Observable<Model[]>;
  public showLegend: boolean;
  public headline: string;
  private _paletteColors: string[];
  private _defaultColors = ['#33a87f', '#005d3c', '#02f5a1', '#24765a'];

  constructor(private platformService: PlatformService) {
    this.showLegend = false;
  }

  ngOnInit() {}

  @Input()
  set distributions$(distributions$: Observable<Distribution[]>) {
    this._models$ = this.addColors(distributions$, this.paletteColors);
  }

  @Input()
  set paletteColors(paletteColors: string[]) {
    this._paletteColors = paletteColors;
  }

  get paletteColors(): string[] {
    if (this._paletteColors && this._paletteColors.length) {
      return this._paletteColors;
    } else {
      return this._defaultColors;
    }
  }

  get models$(): Observable<Model[]> {
    return this._models$;
  }

  get startAngle(): number {
    if (this.platformService.isAndroid()) {
      return 270;
    }
    if (this.platformService.isIOS()) {
      return -90;
    }
  }

  get endAngle(): number {
    if (this.platformService.isAndroid()) {
      return 360;
    }
    if (this.platformService.isIOS()) {
      return 270;
    }
  }

  addColors(distributions$: Observable<Distribution[]>, colors: string[]): Observable<Model[]> {
    let index = 0;
    return distributions$.pipe(map(distributions => {
      return distributions.map(distribution => {
        const currentIndex = index;
        index++;
        if (index > colors.length - 1) {
          index = 0;
        }
        return new Model(
          distribution.type,
          distribution.percentage,
          distribution.drawingPercentage,
          distribution.labelPercentage,
          colors[currentIndex]
        );
      });
    }));
  }
}
