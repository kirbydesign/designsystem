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

import {
  ModalElementComponent,
  ModalElementsAdvertiser,
  ModalElementType,
} from '../services/modal.interfaces';

@Component({
  selector: 'kirby-modal-footer',
  templateUrl: './modal-footer.component.html',
  styleUrls: ['./modal-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalFooterComponent extends ModalElementComponent {
  @HostBinding('class.snap-to-keyboard')
  @Input()
  snapToKeyboard = false;

  @HostBinding('class')
  @Input()
  type: 'inline' | 'fixed' = 'fixed';

  constructor(
    elementRef: ElementRef<HTMLElement>,
    @Optional() modalElementsAdvertiser: ModalElementsAdvertiser
  ) {
    super(ModalElementType.FOOTER, elementRef, modalElementsAdvertiser);
  }
}
