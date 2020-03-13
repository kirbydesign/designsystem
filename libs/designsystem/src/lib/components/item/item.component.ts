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
  selected: boolean;
  @Input()
  selectable: boolean;
  @Input()
  reorderable: boolean;
}
