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
} from '@kirbydesign/designsystem/modal/internal';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';

@Component({
  standalone: true,
  imports: [IonicModule, ThemeColorDirective],
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
