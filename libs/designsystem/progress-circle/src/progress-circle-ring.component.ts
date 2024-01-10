import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'kirby-progress-circle-ring',
  templateUrl: './progress-circle-ring.component.svg',
  styleUrls: ['./progress-circle-ring.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressCircleRingComponent {
  @Input() radius: number; // The desired outer radius of the SVG circle
  @Input() value: number = 0;
  @Input() themeColor: 'success' | 'warning' | 'danger' = 'success';
  @Input() strokeWidth: number;
  @Input() upperBound: number;

  get _offset(): number {
    const valueWithinBounds = this.value < this.upperBound || this.value > 99;
    if (valueWithinBounds) {
      return this.calculateOffset(this.value);
    } else {
      return this.calculateOffset(this.upperBound);
    }
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

  private calculateOffset(value: number): number {
    return this._centerCircumference - this._centerCircumference * (value / 100);
  }
}
