import { Component, Input } from '@angular/core';

@Component({
  selector: 'kirby-list-item-options',
  templateUrl: './list-item-options.component.html',
  styleUrls: ['./list-item-options.component.scss'],
})
export class ListItemOptionsComponent {
  @Input() side: 'start' | 'end' = 'start';
  @Input() item: any;
  ionSwipe() {
    console.log('ionSwipe', this.item);
  }
}
