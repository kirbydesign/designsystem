import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  Optional,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';

import {
  ModalElementComponent,
  ModalElementsAdvertiser,
  ModalElementType,
} from '../../modal.interfaces';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule],
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

  @HostBinding('class.themeColor')
  @Input()
  themeColor: 'white' | 'light' = 'white';

  constructor(
    elementRef: ElementRef<HTMLElement>,
    @Optional() modalElementsAdvertiser: ModalElementsAdvertiser
  ) {
    super(ModalElementType.FOOTER, elementRef, modalElementsAdvertiser);
  }
}
