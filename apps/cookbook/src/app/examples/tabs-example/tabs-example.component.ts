import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { AvatarComponent } from '@kirbydesign/designsystem/avatar';
import { TabButtonComponent, TabsComponent } from '@kirbydesign/designsystem/tabs';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';

@Component({
  selector: 'cookbook-tabs-example',
  templateUrl: './tabs-example.component.html',
  styleUrls: ['./tabs-example.component.scss'],
  imports: [
    AvatarComponent,
    TabsComponent,
    IconComponent,
    ThemeColorDirective,
    BadgeComponent,
    TabButtonComponent,
  ],
})
export class TabsExampleComponent {
  private route = inject(ActivatedRoute);
  private queryParams = toSignal(this.route.queryParams, { initialValue: {} });

  texts = computed(() => {
    const isDanish = this.queryParams()['danish'] !== undefined;
    if (isDanish) {
      return {
        overview: 'Overblik',
        explore: 'Udforsk',
        transfer: 'Overfør',
        inbox: 'Indbakke',
        menu: 'Menu',
      };
    }

    return {
      overview: 'Overview',
      explore: 'Explore',
      transfer: 'Transfer',
      inbox: 'Inbox',
      menu: 'Menu',
    };
  });
}
