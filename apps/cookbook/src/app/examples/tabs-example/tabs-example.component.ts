import { Component } from '@angular/core';
import { AvatarComponent } from '@kirbydesign/designsystem/avatar';
import { TabButtonComponent, TabsComponent } from '@kirbydesign/designsystem/tabs';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';

@Component({
  selector: 'cookbook-tabs-example',
  templateUrl: './tabs-example.component.html',
  styleUrls: ['./tabs-example.component.scss'],
  imports: [AvatarComponent, TabsComponent, IconComponent, BadgeComponent, TabButtonComponent],
})
export class TabsExampleComponent {}
