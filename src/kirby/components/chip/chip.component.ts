import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'kirby-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChipComponent {
  @Input() label: string;
  @Input() isSelected: boolean;
  constructor() {}
}
