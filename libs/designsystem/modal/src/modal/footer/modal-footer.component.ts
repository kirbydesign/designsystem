import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  Optional,
} from '@angular/core';
import { IonFooter } from '@ionic/angular/standalone';
import {
  ModalElementComponent,
  ModalElementsAdvertiser,
  ModalElementType,
} from '../../modal.interfaces';

@Component({
  standalone: true,
  imports: [CommonModule, IonFooter],
  selector: 'kirby-modal-footer',
  templateUrl: './modal-footer.component.html',
  styleUrls: ['./modal-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalFooterComponent extends ModalElementComponent {
  @HostBinding('class.snap-to-keyboard')
  @Input()
  snapToKeyboard = false;

  @Input()
  type: 'inline' | 'fixed' = 'fixed';

  @Input()
  themeColor: 'white' | 'light' = 'white';

  @HostBinding('class')
  get _cssClass() {
    return [this.themeColor, this.type].filter((cssClass) => !!cssClass);
  }

  constructor(
    elementRef: ElementRef<HTMLElement>,
    @Optional() modalElementsAdvertiser: ModalElementsAdvertiser
  ) {
    super(ModalElementType.FOOTER, elementRef, modalElementsAdvertiser);
  }
}
