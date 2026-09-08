import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  inject,
  Input,
  Optional,
} from '@angular/core';
import { IonFooter } from '@ionic/angular/standalone';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';
import {
  ModalElementComponent,
  ModalElementsAdvertiser,
  ModalElementType,
} from '../../modal.interfaces';

@Component({
  imports: [IonFooter],
  selector: 'kirby-modal-footer',
  templateUrl: './modal-footer.component.html',
  styleUrls: ['./modal-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [ThemeColorDirective],
})
export class ModalFooterComponent extends ModalElementComponent {
  private themeColorDirective = inject(ThemeColorDirective);

  @HostBinding('class.snap-to-keyboard')
  @Input()
  snapToKeyboard = false;

  @Input()
  type: 'inline' | 'fixed' = 'fixed';

  private _themeColor: 'white' | 'light' = 'white';
  @Input()
  get themeColor(): 'white' | 'light' {
    return this._themeColor;
  }
  set themeColor(value: 'white' | 'light') {
    this._themeColor = value;
    this.themeColorDirective.themeColor = value;
  }

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
