import { Component, HostBinding } from '@angular/core';

@Component({
  standalone: true,
  selector: 'kirby-item-group',
  templateUrl: './item-group.component.html',
  styleUrls: ['./item-group.component.scss'],
})
export class ItemGroupComponent {
  @HostBinding('attr.role') role: string = 'group';
}
