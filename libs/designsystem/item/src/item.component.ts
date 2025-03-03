import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  Input,
} from '@angular/core';

import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';
import { RadioComponent } from '@kirbydesign/designsystem/radio';
import { ToggleComponent } from '@kirbydesign/designsystem/toggle';

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
  standalone: false,
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
  @ContentChild(ToggleComponent, { static: false, read: ElementRef })
  private toggle: ElementRef<HTMLElement>;

  // Prevent default when inside kirby-dropdown to avoid blurring dropdown:
  onMouseDown(event: MouseEvent) {
    if (
      event.currentTarget instanceof HTMLElement &&
      event.currentTarget.closest('kirby-dropdown')
    ) {
      event.preventDefault();
    }
  }

  get _renderAsButton() {
    // We shouldn't render item as a button if the item contains
    // nested interactive, i.e. checkbox, radio or toggle:
    return this.selectable && !(this.checkbox || this.radio || this.toggle);
  }
}
