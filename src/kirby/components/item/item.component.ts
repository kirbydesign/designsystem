import { Component, Input } from '@angular/core';

@Component({
  selector: 'kirby-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() lines: 'full' | 'inset' | 'none' = 'none';
}
