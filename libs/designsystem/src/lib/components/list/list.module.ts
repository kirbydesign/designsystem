import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { IconModule } from '../icon/icon.module';
import { SpinnerModule } from '../spinner/spinner.module';

import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { ListItemColorDirective } from './directives/list-item-color.directive';
import { ListHeaderComponent } from './list-header/list-header.component';
import { ListItemComponent } from './list-item/list-item.component';
import { ListSectionHeaderComponent } from './list-section-header/list-section-header.component';
import { ListComponent } from './list.component';
import {
  ListFlexItemDirective,
  ListFooterDirective,
  ListHeaderDirective,
  ListItemDirective,
  ListItemTemplateDirective,
  ListSectionHeaderDirective,
} from './list.directive';
import { NormalListComponent } from './normal-list/normal-list.component';
import { VirtualScrollListComponent } from './virtual-scroll-list/virtual-scroll-list.component';

const exportedDeclarations = [
  ListComponent,
  ListItemDirective,
  ListFlexItemDirective,
  ListItemTemplateDirective,
  ListSectionHeaderComponent,
  ListSectionHeaderDirective,
  ListHeaderDirective,
  ListHeaderComponent,
  ListFooterDirective,
];

const declarations = [
  ...exportedDeclarations,
  ListItemColorDirective,
  VirtualScrollListComponent,
  NormalListComponent,
  InfiniteScrollDirective,
  ListItemComponent,
];

@NgModule({
  declarations: declarations,
  imports: [CommonModule, IconModule, IonicModule, SpinnerModule],
  exports: exportedDeclarations,
  providers: [],
})
export class ListModule {}
