import { Component } from '@angular/core';
import { ItemComponent } from '@kirbydesign/designsystem/item';
import {
  ListComponent,
  ListItemTemplateDirective,
  ListSectionHeaderComponent,
  ListSectionHeaderDirective,
} from '@kirbydesign/designsystem/list';
import { ToggleComponent } from '@kirbydesign/designsystem/toggle';

const config = {
  selector: 'cookbook-toggle-item-example',
  template: `<kirby-list [items]="items" [getSectionName]="getSectionName">
  <kirby-list-section-header
    *kirbyListSectionHeader="let section"
    [title]="section">
  </kirby-list-section-header>
  <kirby-item *kirbyListItemTemplate="let item">
    <kirby-toggle slot="end">{{item.title}}</kirby-toggle>
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
export class ToggleItemExampleComponent {
  template: string = config.template;

  items = [
    { id: 0, title: 'Use option' },
    { id: 1, title: 'Show option' },
    { id: 3, title: 'Use option' },
  ];

  getSectionName = () => 'Label for the group below';
}
