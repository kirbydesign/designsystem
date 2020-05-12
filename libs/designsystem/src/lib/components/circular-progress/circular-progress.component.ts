import { Component, OnInit, Input, ChangeDetectionStrategy, HostBinding } from '@angular/core';

import { ThemeColor } from './../../helpers/theme-color.type';

@Component({
  selector: 'kirby-circular-progress',
  templateUrl: './circular-progress.component.html',
  styleUrls: ['./circular-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CircularProgressComponent implements OnInit {
  @Input() radius: number = 40;
  @Input() value: number;

  @Input() themeColor: ThemeColor;

  @HostBinding('style.width.px')
  @HostBinding('style.height.px')
  get diameter(): number {
    return this.radius * 2;
  }

  constructor() {}

  ngOnInit() {}
}
