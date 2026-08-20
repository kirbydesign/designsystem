import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { MenuItemSize } from '../../types';

@Component({
  selector: 'a[kirby-x-menu-item],button[kirby-x-menu-item]',
  host: {
    '[attr.id]': '"item" + id()',
    '[class]': 'size()',
  },
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [IconModule],
})
export class MenuItemComponent {
  readonly id = input.required<string>();
  readonly size = input.required<MenuItemSize>();
  readonly icon = input<string>();

  readonly iconSize = computed(() => (this.size() === 'lg' ? 'sm' : 'xs'));
}
