import { Component, Input } from '@angular/core';

@Component({
  selector: 'kirby-item-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class ItemOptionsComponent {
  @Input() side: 'end' | 'start' = 'start';
}
