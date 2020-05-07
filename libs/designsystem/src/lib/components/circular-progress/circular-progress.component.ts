import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kirby-circular-progress',
  templateUrl: './circular-progress.component.svg',
  styleUrls: ['./circular-progress.component.scss'],
})
export class CircularProgressComponent implements OnInit {
  @Input() radius: number = 40;
  @Input() value: number;

  strokeWidth: number = 4;
  innerRadius: number;
  diameter: number;
  innerCircumference: number;

  constructor() {}

  ngOnInit() {
    this.innerRadius = this.radius - this.strokeWidth;
    this.diameter = this.radius * 2;
    this.innerCircumference = this.innerRadius * 2 * Math.PI;
  }

  public changeValue() {
    this.value = Math.random() * 100;
  }

  get offset(): number {
    return this.innerCircumference - this.innerCircumference * (this.value / 100);
  }
}
