import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'kirby-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() disabled: boolean;
  @HostBinding('class.selected')
  @Input()
  selected;
  @Input()
  selectable: boolean;
  @Input()
  size: 'normal' | 'small' | 'tiny' = 'normal';
}
