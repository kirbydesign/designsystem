import { Component, HostBinding, Input } from '@angular/core';

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

  @HostBinding('class.sm')
  private isSizeSmall: boolean = false;

  @Input() set size(value: 'sm' | 'md') {
    console.log('setting size', value);
    this.isSizeSmall = value === 'sm';
  }
}
