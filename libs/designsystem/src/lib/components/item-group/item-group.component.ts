import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'kirby-item-group',
  templateUrl: './item-group.component.html',
})
export class ItemGroupComponent {
  @HostBinding('attr.role') role: string = 'group';
}
