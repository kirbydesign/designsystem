import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SpinnerModule } from '@kirbydesign/designsystem/spinner';

import { IconModule } from '../icon/icon.module';

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
];

@NgModule({
  declarations: declarations,
  imports: [CommonModule, IconModule, IonicModule, SpinnerModule],
  exports: exportedDeclarations,
  providers: [],
})
export class ListModule {}
