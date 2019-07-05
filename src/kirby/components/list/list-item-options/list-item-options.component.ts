import { Component, Input } from '@angular/core';

@Component({
  selector: 'kirby-list-item-options',
  templateUrl: './list-item-options.component.html',
})
export class ListItemOptionsComponent {
  @Input() side: 'start' | 'end' = 'start';
}
