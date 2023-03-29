import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SpinnerModule } from '@kirbydesign/designsystem/spinner';

import { IconModule } from '@kirbydesign/designsystem/icon';

import { MenuComponent } from '@kirbydesign/designsystem/menu';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { DividerComponent } from '@kirbydesign/designsystem/divider';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { ListItemColorDirective } from './directives/list-item-color.directive';
import { ListExperimentalComponent } from './list-experimental/list-experimental.component';
import { ListHeaderComponent } from './list-header/list-header.component';
import { ListItemComponent } from './list-item/list-item.component';
import { ListSectionHeaderComponent } from './list-section-header/list-section-header.component';
import { ListComponent } from './list.component';
import {
  ListFooterDirective,
  ListHeaderDirective,
  ListItemTemplateDirective,
  ListSectionHeaderDirective,
} from './list.directive';
import { ListItemMenuComponent } from './list-item/list-item-menu/list-item-menu.component';
import { ListItemSwipeComponent } from './list-item/list-item-swipe/list-item-swipe.component';

const exportedDeclarations = [
  ListComponent,
  ListItemComponent,
  ListItemTemplateDirective,
  ListSectionHeaderComponent,
  ListSectionHeaderDirective,
  ListHeaderDirective,
  ListHeaderComponent,
  ListFooterDirective,
  ListExperimentalComponent,
];

const declarations = [
  ...exportedDeclarations,
  ListItemColorDirective,
  InfiniteScrollDirective,
  ListItemComponent,
  ListItemMenuComponent,
  ListItemSwipeComponent,
];

@NgModule({
  declarations: declarations,
  imports: [
    CommonModule,
    IconModule,
    IonicModule,
    SpinnerModule,
    MenuComponent,
    ItemModule,
    DividerComponent,
  ],
  exports: exportedDeclarations,
  providers: [],
})
export class ListModule {}
