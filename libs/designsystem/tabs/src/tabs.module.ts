import { CommonModule } from '@angular/common';

import { IconModule } from '@kirbydesign/designsystem/icon';
import { NgModule } from '@angular/core';
import { IonTabBar, IonTabButton, IonTabs } from '@ionic/angular/standalone';
import { TabButtonComponent } from './tab-button/tab-button.component';
import { TabsService } from './tabs.service';
import { TabsComponent } from './tabs.component';

@NgModule({
  imports: [IconModule, CommonModule, IonTabs, IonTabBar, IonTabButton],
  providers: [TabsService],
  declarations: [TabsComponent, TabButtonComponent],
  exports: [TabsComponent, TabButtonComponent],
})
export class TabsModule {}
