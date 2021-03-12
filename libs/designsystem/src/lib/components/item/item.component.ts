import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'kirby-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() disabled: boolean;
  @HostBinding('class.selected')
  @Input()
  selected: boolean;
  @Input()
  selectable: boolean;
  @Input()
  reorderable: boolean;
  @HostBinding('class')
  @Input()
  size: 'xs' | 'sm' | 'md' = 'md';

  // Prevent default when inside kirby-dropdown to avoid blurring dropdown:
  onMouseDown(event: MouseEvent) {
    if (
      event.currentTarget instanceof HTMLElement &&
      event.currentTarget.closest('kirby-dropdown')
    ) {
      event.preventDefault();
    }
  }
}
