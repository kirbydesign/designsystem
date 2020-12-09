import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { TabsComponent } from './tabs.component';
import { TabButtonComponent } from './tab-button/tab-button.component';
import { IconModule } from '../icon/icon.module';
import { TabsService } from './tabs.service';

@NgModule({
  imports: [IonicModule, IconModule, CommonModule],
  providers: [TabsService],
  declarations: [TabsComponent, TabButtonComponent],
  exports: [TabsComponent, TabButtonComponent],
})
export class TabsModule {}
