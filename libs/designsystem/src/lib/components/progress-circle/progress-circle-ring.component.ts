import { Component, Input, ChangeDetectionStrategy, HostBinding } from '@angular/core';

import { ThemeColor } from '../../helpers/theme-color.type';

@Component({
  selector: 'kirby-progress-circle-ring',
  templateUrl: './progress-circle-ring.component.svg',
  styleUrls: ['./progress-circle-ring.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressCircleRingComponent {
  @Input() radius: number; // The desired outer radius of the SVG circle
  @Input() value: number = 0;
  @Input() themeColor: ThemeColor;

  readonly strokeWidth = 4;

  get offset(): number {
    return this.centerCircumference - this.centerCircumference * (this.value / 100);
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
