import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  Signal,
} from '@angular/core';
import { DividerComponent } from '@kirbydesign/designsystem/divider';
import { SidebarMenuItem } from '../../models';
import { MenuAnchorItemComponent } from '../menu-anchor-item';
import { MenuSubmenuItemComponent } from '../menu-submenu-item';
import { MenuItemSize } from '../../types';

type ViewModel<T> = {
  id: Signal<string | undefined>;
  size: Signal<MenuItemSize>;
  items: Signal<T[]>;
  disableAnimations: Signal<boolean>;
};

@Component({
  selector: 'kirby-x-menu-item-list',
  templateUrl: './menu-item-list.component.html',
  styleUrls: ['./menu-item-list.component.scss'],
  host: {
    '[attr.id]': 'vm.id()',
    '[class]': 'vm.size()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DividerComponent, MenuAnchorItemComponent, forwardRef(() => MenuSubmenuItemComponent)],
})
export class MenuItemListComponent<T extends SidebarMenuItem> {
  readonly items = input.required<T[]>();
  readonly size = input<MenuItemSize>('lg');
  readonly id = input<string>();
  readonly disableAnimations = input<boolean>(false);

  readonly vm: ViewModel<T> = {
    id: this.id,
    size: this.size,
    items: computed(() => this.items().filter((item) => !item.hidden)),
    disableAnimations: this.disableAnimations,
  };
}
