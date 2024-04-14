import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'kirby-progress-circle-ring',
  templateUrl: './progress-circle-ring.component.html',
  styleUrls: ['./progress-circle-ring.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressCircleRingComponent {
  @Input() radius: number; // The desired outer radius of the SVG circle
  @Input() value: number = 0;
  @Input() themeColor: 'success' | 'warning' | 'danger' = 'success';
  @Input() strokeWidth: number;
  @Input() upperBound: number;

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

    return (_value * this._centerCircumference) / 100;
  }

  get _remainder(): number {
    return this._centerCircumference - this._progress;
  }

  get _progressStrokeWidth(): number {
    return this.value == 0 ? 0 : this.strokeWidth;
  }
}
