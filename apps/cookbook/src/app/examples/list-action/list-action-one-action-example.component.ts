import { Component } from '@angular/core';
import { KirbyModule, ListSwipeAction } from '@kirbydesign/designsystem';
import { stringifyProp, templateUrl } from './list-action-example';
const config = {
  selector: 'cookbook-list-action-one-action-example',
  template: templateUrl,
};

@Component({
  standalone: true,
  imports: [KirbyModule],
  selector: config.selector,
  template: config.template,
  styleUrls: ['./list-action-example.component.scss'],
})
export class ListActionOneActionExampleComponent {
  template: string = config.template;
  public items = [
    {
      title: 'A single action item',
      amount: '5.587.218.309 DKK',
    },
    {
      title: 'Money',
      amount: '5.387.218.309 DKK',
    },
  ];

  public itemsExample = `items = ${stringifyProp(this.items)}`;

  public actions: Partial<ListSwipeAction>[] = [
    {
      position: 'left',
      title: 'Archive',
      type: 'warning',
      onSelected: (item) => alert('Archive selected'),
      icon: 'add',
    },
  ];

  public actionsExample = `actions = ${stringifyProp(this.actions)}`;

  public actionsAndItemsExample = `
  ${this.itemsExample}
  ${this.actionsExample}`;
}
