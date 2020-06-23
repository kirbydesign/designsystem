import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ListComponent } from './list.component';
import { ListItemColorDirective } from './directives/list-item-color.directive';
import {
  ListFlexItemDirective,
  ListItemDirective,
  ListItemTemplateDirective,
  ListSectionHeaderDirective,
  ListHeaderDirective,
  ListFooterDirective,
} from './list.directive';
import { ListSectionHeaderComponent } from './list-section-header/list-section-header.component';
import { ListHeaderComponent } from './list-header/list-header.component';
import { VirtualScrollListComponent } from './components/virtual-scroll-list/virtual-scroll-list.component';
import { IconModule } from '../icon/icon.module';
import { SpinnerModule } from '../spinner/spinner.module';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { NormalListComponent } from './components/normal-list/normal-list.component';

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
];

@NgModule({
  declarations: declarations,
  imports: [CommonModule, IconModule, IonicModule, SpinnerModule],
  exports: exportedDeclarations,
  providers: [],
})
export class ListModule {}
