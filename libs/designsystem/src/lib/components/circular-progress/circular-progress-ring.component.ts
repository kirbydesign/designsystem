import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { ThemeColor } from '../../helpers/theme-color.type';

@Component({
  selector: 'kirby-circular-progress-ring',
  templateUrl: './circular-progress-ring.component.svg',
  styleUrls: ['./circular-progress-ring.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CircularProgressRingComponent implements OnInit {
  @Input() radius: number;
  @Input() value: number;
  @Input() themeColor: ThemeColor;

  protected strokeWidth: number = 4;
  protected innerRadius: number;
  protected diameter: number;
  protected innerCircumference: number;

  constructor() {}

  ngOnInit() {
    this.calculateParams();
  }

  get offset(): number {
    return this.innerCircumference - this.innerCircumference * (this.value / 100);
  }

  private calculateParams() {
    this.innerRadius = this.radius - this.strokeWidth;
    this.diameter = this.radius * 2;
    this.innerCircumference = this.innerRadius * 2 * Math.PI;
  }
}
