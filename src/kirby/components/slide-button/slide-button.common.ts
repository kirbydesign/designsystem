import { Output, EventEmitter, ElementRef, ViewChild, Input } from '@angular/core';

export class SlideButtonCommon {
  @Input() public text = '';
  @Input() public expand?: 'fullWidth'; // TODO: implement for native

  @Output() public slideDone = new EventEmitter();
  @Output() public slidingPercentageChanged = new EventEmitter<number>();
  public readonly slideDoneFadeTime = 500;
  public readonly slideResetTime = 100;
}
