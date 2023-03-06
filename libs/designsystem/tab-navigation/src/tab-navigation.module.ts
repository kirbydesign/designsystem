import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabNavigationComponent } from './tab-navigation/tab-navigation.component';
import { TabNavigationItemComponent } from './tab-navigation-item/tab-navigation-item.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TabNavigationComponent, TabNavigationItemComponent],
  exports: [TabNavigationComponent, TabNavigationItemComponent],
})
export class TabNavigationModule {}
