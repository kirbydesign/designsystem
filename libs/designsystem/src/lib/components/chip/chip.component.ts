import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'kirby-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipComponent {
  @Input() text: string;

  @Input()
  @HostBinding('attr.aria-selected')
  @HostBinding('class.is-selected')
  isSelected: boolean;
}
