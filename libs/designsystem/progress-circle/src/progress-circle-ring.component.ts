import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
  Input,
} from '@angular/core';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';

@Component({
  selector: 'kirby-progress-circle-ring',
  templateUrl: './progress-circle-ring.component.html',
  styleUrls: ['./progress-circle-ring.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [ThemeColorDirective],
})
export class ProgressCircleRingComponent implements AfterViewInit {
  private themeColorDirective = inject(ThemeColorDirective);

  @Input() radius: number; // The desired outer radius of the SVG circle
  @Input() value: number = 0;
  private _themeColor: 'success' | 'warning' | 'danger' = 'success';
  @Input()
  get themeColor(): 'success' | 'warning' | 'danger' {
    return this._themeColor;
  }
  set themeColor(value: 'success' | 'warning' | 'danger') {
    this._themeColor = value;
    this.themeColorDirective.themeColor = value;
  }
  @Input() strokeWidth: number;
  @Input() upperBound: number;

  @HostBinding('class.view-initialized')
  viewInitialized;

  ngAfterViewInit(): void {
    this.viewInitialized = true;
  }

  @HostBinding('style.width.px')
  @HostBinding('style.height.px')
  get _diameter(): number {
    return this.radius * 2;
  }

  get _centerRadius(): number {
    return this.radius - this.strokeWidth / 2;
  }

  get _centerCircumference(): number {
    return this._centerRadius * 2 * Math.PI;
  }

  get _progress(): number {
    const valueWithinBounds = this.value < this.upperBound || this.value > 99;
    const _value = valueWithinBounds ? this.value : this.upperBound;
    const progressPercentage = _value / 100;
    return this._centerCircumference * progressPercentage;
  }

  get _remainder(): number {
    return this._centerCircumference - this._progress;
  }

  get _progressStrokeWidth(): number {
    // Do not render stroke if progress is 0, otherwise it will show as a dot
    if (this._progress === 0) return 0;

    return this.strokeWidth;
  }
}
