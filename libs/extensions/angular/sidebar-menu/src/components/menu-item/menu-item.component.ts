import { Component, computed, input, Signal } from '@angular/core';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';
import { ThemeColor } from '@kirbydesign/designsystem/helpers';
import { SidebarMenuItem } from '../../models';

type ViewModel = {
  level: Signal<number>;
  icon: Signal<string | undefined>;
  iconSize: Signal<'sm' | 'xs'>;
  title: Signal<string>;
  badge: Signal<{ text: string; color: ThemeColor } | undefined>;
  disclosure: Signal<string | undefined>;
  rotateDisclosure: Signal<boolean>;
};

@Component({
  selector: 'kirby-x-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  imports: [IconModule, BadgeComponent],
})
export class MenuItemComponent {
  readonly item = input.required<SidebarMenuItem>();
  readonly level = input<number>(0);

  readonly #icon = computed(() => {
    const item = this.item();
    if (this.level() === 0) {
      return item.icon;
    }
    switch (item.isExpanded) {
      case true:
        return 'remove';
      case false:
        return 'add';
      case undefined:
        return 'arrow-right-fill';
    }
  });
  readonly #badge = computed(() => {
    const badge = this.item().badge;
    return badge ? { text: badge.value, color: badge.themeColor ?? 'primary' } : undefined;
  });
  readonly #disclosure = computed(() =>
    this.level() === 0 && this.item().isExpanded !== undefined ? 'arrow-more' : undefined
  );

  readonly vm: ViewModel = {
    level: this.level,
    icon: this.#icon,
    iconSize: computed(() => (this.level() === 0 ? 'sm' : 'xs')),
    title: computed(() => this.item().title ?? ''),
    badge: this.#badge,
    disclosure: this.#disclosure,
    rotateDisclosure: computed(() => this.item().isExpanded ?? false),
  };
}
