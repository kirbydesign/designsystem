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

import { ModalElementsAdvertiser } from '../services/modal.interfaces';

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

  private get isContainedInModal() {
    return this.modalElementsAdvertiser !== null;
  }

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    @Optional() private modalElementsAdvertiser: ModalElementsAdvertiser
  ) {}

  ngAfterViewInit() {
    if (this.isContainedInModal) {
      this.modalElementsAdvertiser.addFooter(this.elementRef);
    }
  }

  ngOnDestroy() {
    if (this.isContainedInModal) {
      this.modalElementsAdvertiser.removeFooter(this.elementRef);
    }
  }
}
