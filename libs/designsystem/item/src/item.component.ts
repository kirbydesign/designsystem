import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  Input,
  Renderer2,
} from '@angular/core';
import { forwardAttributes } from '@kirbydesign/designsystem/shared';
import { ButtonComponent } from '@kirbydesign/designsystem/button';

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
export class ItemComponent implements AfterViewInit {
  private _linkAttributesToForward = ['rel', 'target', 'download'];

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

  @Input()
  href: string;

  @Input() rotateIcon: boolean = false;

  @ContentChild(CheckboxComponent, { static: false, read: ElementRef })
  private checkbox: ElementRef<HTMLElement>;
  @ContentChild(RadioComponent, { static: false, read: ElementRef })
  private radio: ElementRef<HTMLElement>;
  @ContentChild(ToggleComponent, { static: false, read: ElementRef })
  private toggle: ElementRef<HTMLElement>;
  @ContentChild(ButtonComponent, { static: false, read: ElementRef })
  private button: ElementRef<HTMLElement>;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    if (this.href) {
      const ionItem = this.elementRef.nativeElement.querySelector('ion-item');
      forwardAttributes(
        this.elementRef.nativeElement,
        this._linkAttributesToForward,
        this.renderer,
        ionItem
      );
    }
  }

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

    return this.selectable && !(this.checkbox || this.radio || this.toggle || this.button);
  }
}
