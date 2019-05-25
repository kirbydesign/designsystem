import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

declare var document;

@Component({
  selector: 'kirby-slide-button',
  templateUrl: './slide-button.component.html',
  styleUrls: ['./slide-button.component.scss'],
})
export class SlideButtonComponent implements AfterViewInit {
  @Input() public text = '';
  @Input() expand?: 'fullWidth';

  @Output() public slideDone = new EventEmitter();
  @Output() public slidingPercentageChanged = new EventEmitter<number>();
  @ViewChild('slideButtonRef') public slideButtonRef: ElementRef;

  public onSliderMouseup() {
    console.log('mouse Up');
  }

  public onSliderMousedown() {}

  ngAfterViewInit(): void {
    this.slideButtonRef.nativeElement.onmouseup = () => {
      var theRange = this.slideButtonRef.nativeElement.value;
      if (theRange == 100) {
        this.hideSlider();
      } else {
        document.init = setInterval(() => {
          if (this.slideButtonRef.nativeElement.value != 0) {
            this.slideButtonRef.nativeElement.value = theRange--;
          }
        }, 1);
      }
    };

    this.slideButtonRef.nativeElement.onmousedown = () => {
      clearInterval(document.init);
    };
  }

  private hideSlider() {
    this.slideButtonRef.nativeElement.style.opacity = '0';
  }
}
