import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  Optional,
} from '@angular/core';

import { ModalElementMover } from '../modal-wrapper/modal-wrapper.component';

@Component({
  selector: 'kirby-modal-footer',
  templateUrl: './modal-footer.component.html',
  styleUrls: ['./modal-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalFooterComponent implements AfterViewInit, OnDestroy {
  @HostBinding('class.snap-to-keyboard')
  @Input()
  snapToKeyboard = false;

  @HostBinding('class')
  @Input()
  type: 'inline' | 'fixed' = 'fixed';

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    @Optional() private modalElementMover: ModalElementMover
  ) {}

  ngAfterViewInit() {
    console.log('footer afterViewInit');
    if (this.modalElementMover !== undefined) {
      this.modalElementMover.registerFooter(this.elementRef);
    }
  }

  ngOnDestroy() {
    console.log('footer onDestroy');
    if (this.modalElementMover !== undefined) {
      this.modalElementMover.deregisterFooter(this.elementRef);
    }
  }
}
