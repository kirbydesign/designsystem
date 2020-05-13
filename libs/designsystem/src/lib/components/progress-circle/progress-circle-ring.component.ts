import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { ThemeColor } from '../../helpers/theme-color.type';

const STROKE_WIDTH = 4;

@Component({
  selector: 'kirby-progress-circle-ring',
  templateUrl: './progress-circle-ring.component.svg',
  styleUrls: ['./progress-circle-ring.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressCircleRingComponent {
  @Input() radius: number;
  @Input() value: number;
  @Input() themeColor: ThemeColor;

  get offset(): number {
    return this.innerCircumference - this.innerCircumference * (this.value / 100);
  }

  get diameter(): number {
    return this.radius * 2;
  }

  get innerRadius(): number {
    return this.radius - this.strokeWidth;
  }

  get innerCircumference(): number {
    return this.innerRadius * 2 * Math.PI;
  }

  get strokeWidth(): number {
    return STROKE_WIDTH;
  }
}
