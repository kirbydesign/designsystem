import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

declare var document;

@Component({
  selector: 'kirby-slide-button',
  templateUrl: './slide-button.component.html',
  styleUrls: ['./slide-button.component.scss'],
})
export class SlideButtonComponent {
  @Input() public text = '';
  @Input() expand?: 'fullWidth';

  @Output() public slideDone = new EventEmitter();
  @Output() public slidingPercentageChanged = new EventEmitter<number>();
  @ViewChild('sliderButtonRef') public sliderButtonRef: ElementRef;

  public isSlideDone = false;

  public value = 0;

  public onSliderMouseup() {
    if (this.value == 100) {
      this.handleSlideDone();
    } else {
      document.init = setInterval(() => {
        if (this.value != 0) {
          this.value--;
        }
      }, 1);
    }
  }

  public onSlide(val: string) {
    this.value = +val;
    this.slidingPercentageChanged.emit(this.value);
  }

  public onSliderMousedown() {
    clearInterval(document.init);
  }

  private handleSlideDone() {
    this.slideDone.emit();
    this.isSlideDone = true;
  }
}
