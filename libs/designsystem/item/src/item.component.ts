import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';

import { IonItem } from '@ionic/angular/standalone';

import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';
import { RadioComponent } from '@kirbydesign/designsystem/radio';

export enum ItemSize {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
}

@Component({
  selector: 'kirby-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent {
  @HostBinding('class.disabled')
  @Input()
  disabled: boolean;
  @HostBinding('class.selected')
  @Input()
  selected: boolean;
  @HostBinding('class.disclosure')
  @Input()
  disclosure: 'link' | 'arrow-more' | 'arrow-down' | 'arrow-up' | null;
  @Input() selectable: boolean;

  @Input()
  reorderable: boolean;
  @HostBinding('class')
  @Input()
  size: ItemSize | `${ItemSize}` = ItemSize.MD;

  @Input() rotateIcon: boolean = false;

  @ContentChild(CheckboxComponent, { static: false, read: ElementRef })
  private checkbox: ElementRef<HTMLElement>;
  @ContentChild(RadioComponent, { static: false, read: ElementRef })
  private radio: ElementRef<HTMLElement>;
  @ViewChild(IonItem, { static: true })
  ionItem;

  @HostListener('focus')
  onFocus() {
    this.focusItem(this.ionItem.el);
  }

  constructor(public element: ElementRef) {}

  // Prevent default when inside kirby-dropdown to avoid blurring dropdown:
  onMouseDown(event: MouseEvent) {
    if (
      event.currentTarget instanceof HTMLElement &&
      event.currentTarget.closest('kirby-dropdown')
    ) {
      event.preventDefault();
    }
  }

  /** Focus the internal button of the ion-item */
  focusItem(item: HTMLIonItemElement) {
    const root = item.shadowRoot;
    const button = root.querySelector('button');
    if (button) {
      button.focus();
    }
  }

  get _isIonicButton() {
    // Ionic checks for slotted checkbox and radio
    // and we shouldn't set the `button` prop in that scenario:
    return this.selectable; // && !(this.checkbox || this.radio);
  }
}
