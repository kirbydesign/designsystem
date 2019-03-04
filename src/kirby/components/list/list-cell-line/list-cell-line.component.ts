import { Component, Input } from '@angular/core';

@Component({
  selector: 'kirby-list-cell-line',
  templateUrl: './list-cell-line.component.html',
  styleUrls: ['./list-cell-line.component.scss'],
})
export class ListCellLineComponent {
  @Input()
  text: string;

  @Input()
  primary: boolean;

  constructor() {
    this.primary = false;
  }
}
