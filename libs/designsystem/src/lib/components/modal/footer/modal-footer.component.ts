import { Component, Input, OnInit, ElementRef, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'kirby-modal-footer',
  templateUrl: './modal-footer.component.html',
  styleUrls: ['./modal-footer.component.scss'],
})
export class ModalFooterComponent implements OnInit, OnChanges {
  @Input() snapToKeyboard = false;

  private kirbyModalFooterElement: HTMLElement;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnInit() {
    this.kirbyModalFooterElement = this.elementRef.nativeElement; //.nativeElement.closest('ion-footer');

    this.setSnapToKeyboard(this.snapToKeyboard);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.snapToKeyboard && this.kirbyModalFooterElement) {
      this.setSnapToKeyboard(changes.snapToKeyboard.currentValue);
    }
  }

  private setSnapToKeyboard(value: boolean) {
    if (this.kirbyModalFooterElement) {
      this.kirbyModalFooterElement.style.setProperty('--snap-to-keyboard', value ? '1' : '0');
    }
  }
}
