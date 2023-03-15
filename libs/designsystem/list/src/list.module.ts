import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SpinnerModule } from '@kirbydesign/designsystem/spinner';

import { IconModule } from '@kirbydesign/designsystem/icon';

import { ItemModule } from '@kirbydesign/designsystem/item';
import { AvatarComponent } from '@kirbydesign/designsystem/avatar';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
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
import { ListItemMobileComponent } from './list-item-mobile/list-item-mobile.component';
import { ListItemDesktopComponent } from './list-item-desktop/list-item-desktop.component';
import { HasActionsPipe } from './list-item/pipes/has-actions/has-actions.pipe';
import { GetActionsPipe } from './list-item/pipes/get-actions/get-actions.pipe';
import { GetActionIconPipe } from './list-item/pipes/get-action-icon/get-action-icon.pipe';

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
  ListItemMobileComponent,
  ListItemDesktopComponent,
  HasActionsPipe,
  GetActionsPipe,
  GetActionIconPipe,
];

@NgModule({
  declarations: declarations,
  imports: [
    CommonModule,
    IconModule,
    IonicModule,
    SpinnerModule,
    ItemModule,
    AvatarComponent,
    ButtonComponent,
  ],
  exports: exportedDeclarations,
  providers: [],
})
export class ListModule {}
