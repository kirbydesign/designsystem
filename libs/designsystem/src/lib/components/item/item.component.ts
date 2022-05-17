import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

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
  _selectable: boolean;

  @Input() disabled: boolean;
  @HostBinding('class.selected')
  @Input()
  selected: boolean;
  @Input() set selectable(selectable: boolean) {
    if (this._selectable === selectable) return;
    this._selectable = selectable;
    this.cdr.markForCheck();
  }
  @Input()
  reorderable: boolean;
  @HostBinding('class')
  @Input()
  size: ItemSize | `${ItemSize}` = ItemSize.MD;

  // Prevent default when inside kirby-dropdown to avoid blurring dropdown:
  onMouseDown(event: MouseEvent) {
    if (
      event.currentTarget instanceof HTMLElement &&
      event.currentTarget.closest('kirby-dropdown')
    ) {
      event.preventDefault();
    }
  }

  constructor(private cdr: ChangeDetectorRef) {}
}
