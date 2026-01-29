import { Component } from '@angular/core';

import {
  ListComponent,
  ListFooterDirective,
  ListHeaderComponent,
  ListHeaderDirective,
  ListItemTemplateDirective,
} from '@kirbydesign/designsystem/list';
import { ItemComponent, LabelComponent } from '@kirbydesign/designsystem/item';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { FlagComponent } from '@kirbydesign/designsystem/flag';
import { AvatarComponent } from '@kirbydesign/designsystem/avatar';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';
import { BaseListComponent } from '../../list-shared/base-list.component';

export const template = `<kirby-list 
  [items]="items" 
  (itemSelect)="onItemSelect($event)">

    <!-- BODY -->
    <kirby-item 
      *kirbyListItemTemplate="let item" 
      [selectable]="true"
      [disclosure]="'arrow-more'">
 <kirby-badge slot="outside" themeColor="warning" size="sm"></kirby-badge>
@if(item.id >= 4) {
  <kirby-avatar slot="start" themeColor="light">
    <kirby-icon name="person"></kirby-icon>
  </kirby-avatar>
}
        <kirby-label>
          <p class="kirby-item-title">
          {{item.title}}</p>
          <p class="kirby-item-subtitle">
          {{item.subTitle}}</p>
        </kirby-label>
        <kirby-label slot="end">
          <kirby-flag themeColor="success">
          {{item.amount}}</kirby-flag>
          <data
          class="kirby-item-detail">
          385.954,23</data>
        </kirby-label>
    </kirby-item>
</kirby-list>`;

@Component({
  selector: 'cookbook-list-with-header-and-footer-example',
  template: template,
  styles: ['p { margin: 0; }', '.footer { text-align: center; width: 100%; }'],
  imports: [
    ListComponent,
    BadgeComponent,
    FlagComponent,
    AvatarComponent,
    IconComponent,
    ItemComponent,
    ButtonComponent,
    LabelComponent,
    ListHeaderComponent,
    ListItemTemplateDirective,
    ListFooterDirective,
    ListHeaderDirective,
  ],
})
export class ListWithHeaderAndFooterExampleComponent extends BaseListComponent {
  template: string = template;
}
