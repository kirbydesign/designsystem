import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { TabsComponent } from '@kirbydesign/designsystem/components/tabs/tabs.component';
import { TabButtonComponent } from '@kirbydesign/designsystem/components/tabs/tab-button/tab-button.component';
import { BadgeComponent } from '@kirbydesign/designsystem';

@NgModule({
  imports: [IonicModule],
  declarations: [TabsComponent, TabButtonComponent],
  providers: [],
  exports: [TabsComponent, TabButtonComponent],
})
export class TabsModule {}
