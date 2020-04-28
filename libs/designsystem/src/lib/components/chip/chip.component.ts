import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'kirby-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class ChipComponent {
  @Input() text: string;

  @Input()
  @HostBinding('attr.aria-selected')
  @HostBinding('class.is-selected')
  isSelected: boolean;
}
