import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { TabsComponent } from '@kirbydesign/designsystem/components/tabs/tabs.component';
import { TabButtonComponent } from '@kirbydesign/designsystem/components/tabs/tab-button/tab-button.component';
import { IconModule } from '@kirbydesign/designsystem/components/icon/icon.module';

@NgModule({
  imports: [IonicModule, IconModule],
  declarations: [TabsComponent, TabButtonComponent],
  providers: [],
  exports: [TabsComponent, TabButtonComponent],
})
export class TabsModule {}
