import { Component } from '@angular/core';
import { ItemComponent } from '@kirbydesign/designsystem/item';
import {
  ListComponent,
  ListItemTemplateDirective,
  ListSectionHeaderComponent,
  ListSectionHeaderDirective,
} from '@kirbydesign/designsystem/list';
import { ToggleComponent } from '@kirbydesign/designsystem/toggle';
import { BaseToggleComponent } from '../base-toggle.component';

const config = {
  selector: 'cookbook-toggle-item-example',
  template: `
 <kirby-list [items]="items" [getSectionName]="getSectionName">
   <kirby-list-section-header
    *kirbyListSectionHeader="let section"
    [title]="section">
  </kirby-list-section-header>
   <kirby-item *kirbyListItemTemplate="let item">
     <p class="kirby-item-title">{{item.title}}</p>
     <kirby-toggle slot="end"></kirby-toggle>
   </kirby-item>
</kirby-list>
`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./toggle-examples.shared.scss'],
  imports: [
    ItemComponent,
    ToggleComponent,
    ListSectionHeaderComponent,
    ListItemTemplateDirective,
    ListComponent,
    ListSectionHeaderComponent,
    ListItemTemplateDirective,
    ListSectionHeaderDirective,
  ],
})
export class ToggleItemExampleComponent extends BaseToggleComponent {
  template: string = config.template;

  onCheckedChange(checked: boolean) {
    console.log('Checked changed:', checked);
  }

  getSectionName(item: any): string {
    return item.id < 4 ? 'Label for the group below' : 'Label for another the group';
  }
}
