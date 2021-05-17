import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
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

  get offset(): number {
    if (this.value < this.upperBound || this.value > 99) {
      return this.centerCircumference - this.centerCircumference * (this.value / 100);
    } else {
      return this.centerCircumference - this.centerCircumference * (this.upperBound / 100);
    }
  }

  @HostBinding('style.width.px')
  @HostBinding('style.height.px')
  get diameter(): number {
    return this.radius * 2;
  }

  get centerRadius(): number {
    return this.radius - this.strokeWidth / 2;
  }

  get centerCircumference(): number {
    return this.centerRadius * 2 * Math.PI;
  }
}
