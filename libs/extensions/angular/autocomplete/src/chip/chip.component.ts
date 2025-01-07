import { ChangeDetectionStrategy, Component, HostBinding, input, output } from '@angular/core';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IconModule } from '@kirbydesign/designsystem/icon';

@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [ButtonComponent, IconModule],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipComponent {
  /**
   * Sets user-select accordingly.
   *
   * Defaults to false.
   */
  selectable = input(false, {
    transform: (val: string | boolean) => (typeof val === 'string' ? val === '' : val),
  });

  /**
   * Adds a delete button to the chip.
   *
   * Defaults to false.
   *
   * @see {@link delete}
   */
  deletable = input(false, {
    transform: (val: string | boolean) => (typeof val === 'string' ? val === '' : val),
  });

  /**
   * Emits when the chip is deleted.
   */
  delete = output();

  @HostBinding('style.user-select') get userSelect() {
    return this.selectable() ? 'auto' : 'none';
  }
}
