import { Output, EventEmitter, Input } from '@angular/core';

export class SlideButtonCommon {
  @Input() text = '';
  @Input() expand?: 'block'; // TODO: implement for native

  @Output() slideDone = new EventEmitter();
  @Output() slidingPercentageChanged = new EventEmitter<number>();

  readonly slideDoneFadeTime = 500;
  readonly slideResetTime = 100;
}
