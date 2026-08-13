import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
  selector: 'kirby-progress-circle-ring',
  templateUrl: './progress-circle-ring.component.html',
  styleUrls: ['./progress-circle-ring.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressCircleRingComponent implements AfterViewInit {
  @Input() value: number = 0;
  @Input() themeColor: 'success' | 'warning' | 'danger' = 'success';
  @Input() upperBound: number;

  @HostBinding('class.view-initialized')
  viewInitialized;

  ngAfterViewInit(): void {
    this.viewInitialized = true;
  }
  private readonly UPPER_AND_LOWER_BOUND_GAP = 2.5;

  get _progress(): number {
    if (this.value <= 0) return 0;
    if (this.value >= 100) return 100;
    return Math.min(this.value, 100 - this.UPPER_AND_LOWER_BOUND_GAP);
  }

  get _linecap(): 'butt' | 'round' {
    return this._progress <= 0 || this._progress >= 100 ? 'butt' : 'round';
  }

  get _remainder(): number {
    return 100 - this._progress;
  }
}
