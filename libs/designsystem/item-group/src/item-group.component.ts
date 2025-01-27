import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';

@Component({
  imports: [CommonModule],
  selector: 'kirby-item-group',
  templateUrl: './item-group.component.html',
  styleUrls: ['./item-group.component.scss'],
})
export class ItemGroupComponent {
  @HostBinding('attr.role') role: string = 'group';
}
