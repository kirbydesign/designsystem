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

import { ModalElementsAdvertiser } from '../modal-wrapper/modal-elements-advertiser.service';

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
    @Optional() private modalElementsAdvertiser: ModalElementsAdvertiser
  ) {}

  ngAfterViewInit() {
    if (this.modalElementsAdvertiser !== undefined) {
      this.modalElementsAdvertiser.registerElement('footer', this.elementRef);
    }
  }

  ngOnDestroy() {
    if (this.modalElementsAdvertiser !== undefined) {
      this.modalElementsAdvertiser.deregisterElement('footer', this.elementRef);
    }
  }
}
