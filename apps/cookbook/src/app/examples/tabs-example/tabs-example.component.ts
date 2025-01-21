import { Component } from '@angular/core';
import { AvatarComponent } from '@kirbydesign/designsystem/avatar';
import { TabsModule } from '@kirbydesign/designsystem/tabs';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';

@Component({
  selector: 'cookbook-tabs-example',
  templateUrl: './tabs-example.component.html',
  styleUrls: ['./tabs-example.component.scss'],
  imports: [AvatarComponent, TabsModule, IconModule, ThemeColorDirective, BadgeComponent],
})
export class TabsExampleComponent {}
