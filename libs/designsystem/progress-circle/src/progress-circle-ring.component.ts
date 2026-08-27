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
  private readonly UPPER_AND_LOWER_BOUND_GAP = 2.5;

  @Input() value: number = 0;
  @Input() themeColor: 'success' | 'warning' | 'danger' = 'success';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  @HostBinding('class')
  get _sizeClass() {
    return this.size;
  }

  @HostBinding('class.view-initialized')
  viewInitialized;

  ngAfterViewInit(): void {
    this.viewInitialized = true;
  }

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

  get _progressStrokeWidth(): string | number {
    // Do not render stroke if progress is 0, otherwise it will show as a dot
    if (this._progress === 0) return 0;
    return 'var(--kirby-progress-circle-stroke-width)';
  }
}
