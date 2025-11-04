import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';

import { Badge } from '../../models';

@Component({
  selector: 'kirby-x-menu-item-content',
  templateUrl: './menu-item-content.component.html',
  styleUrls: ['./menu-item-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconModule, BadgeComponent],
})
export class MenuItemContentComponent {
  readonly title = input.required<string>();
  readonly icon = input<string>();
  readonly badge = input<Badge>();
  readonly isExpanded = input<boolean>();
}
