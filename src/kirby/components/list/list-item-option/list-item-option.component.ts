import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'kirby-list-item-option',
  templateUrl: './list-item-option.component.html',
  styleUrls: ['./list-item-option.component.scss'],
})
export class ListItemOptionComponent {
  @Input() id: number;
  @Input() title: string;
  @Input() iconName?: string;
  @Output() itemOptionSelect = new EventEmitter<string>();
  onClick(event) {
    this.itemOptionSelect.emit(event.currentTarget.id);
  }
}
