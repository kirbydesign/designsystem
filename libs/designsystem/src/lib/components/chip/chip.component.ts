import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'kirby-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipComponent {
  constructor() {
    console.warn(
      'DEPRECATION WARNING: `<kirby-chip>` will be removed from the API in Kirby v8. Use the Kirby button component instead.'
    );
  }

  @Input() text: string;

  @Input()
  @HostBinding('attr.aria-selected')
  @HostBinding('class.is-selected')
  isSelected: boolean;
}
