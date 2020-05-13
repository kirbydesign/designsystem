import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { ThemeColor } from '../../helpers/theme-color.type';

@Component({
  selector: 'kirby-circular-progress-ring',
  templateUrl: './circular-progress-ring.component.svg',
  styleUrls: ['./circular-progress-ring.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CircularProgressRingComponent {
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
    // TODO: Add stroke width breakpoints
    return 4;
  }
}
