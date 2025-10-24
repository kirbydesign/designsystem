import { Component } from '@angular/core';
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
export class TabsExampleComponent {}
