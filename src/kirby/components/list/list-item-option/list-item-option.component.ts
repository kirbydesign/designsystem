import { Component, Input } from '@angular/core';

@Component({
  selector: 'kirby-list-item-option',
  templateUrl: './list-item-option.component.html',
  styleUrls: ['./list-item-option.component.scss'],
})
export class ListItemOptionComponent {
  @Input() iconName: string;
  @Input() expandable: boolean = false;
  onClick(event) {
    console.log('onClick', event);
  }
}
