import { ChangeDetectionStrategy, Component, forwardRef, input, Signal } from '@angular/core';
import { DividerComponent } from '@kirbydesign/designsystem/divider';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { SidebarMenuItem } from '../../models';
import { MenuAnchorItemComponent } from '../menu-anchor-item';
import { MenuSubmenuItemComponent } from '../menu-submenu-item';
import { MenuItemSize } from '../../types';

type ViewModel = {
  id: Signal<string | undefined>;
  size: Signal<MenuItemSize>;
  items: Signal<SidebarMenuItem[]>;
  isDraggable: Signal<boolean>;
};

@Component({
  selector: 'ul[kirby-x-menu-item-list]',
  templateUrl: './menu-item-list.component.html',
  styleUrls: ['./menu-item-list.component.scss'],
  host: {
    '[attr.id]': 'vm.id()',
    '[class]': 'vm.size()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DividerComponent,
    MenuAnchorItemComponent,
    forwardRef(() => MenuSubmenuItemComponent),
    CdkDrag,
  ],
})
export class MenuItemListComponent {
  readonly items = input.required<SidebarMenuItem[]>();
  readonly size = input<MenuItemSize>('lg');
  readonly id = input<string>();
  readonly isDraggable = input<boolean>(false);

  readonly vm: ViewModel = {
    id: this.id,
    size: this.size,
    items: this.items,
    isDraggable: this.isDraggable,
  };
}
