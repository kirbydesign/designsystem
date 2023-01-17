import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconModule } from '@kirbydesign/designsystem/icon';
import { KirbyIonicModule } from '@kirbydesign/designsystem/kirby-ionic-module';

import { TabsComponent } from './tabs.component';
import { TabButtonComponent } from './tab-button/tab-button.component';
import { TabsService } from './tabs.service';

@NgModule({
  imports: [KirbyIonicModule, IconModule, CommonModule],
  providers: [TabsService],
  declarations: [TabsComponent, TabButtonComponent],
  exports: [TabsComponent, TabButtonComponent],
})
export class TabsModule {}
