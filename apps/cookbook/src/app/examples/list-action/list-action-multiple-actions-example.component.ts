import { Component } from '@angular/core';
import { KirbyModule } from '@kirbydesign/designsystem';
import { ListSwipeAction } from '@kirbydesign/designsystem/list';
import { stringifyProp, templateUrl } from './list-action-example';

const config = {
  selector: 'cookbook-list-action-multiple-actions-example',
  template: templateUrl,
};

@Component({
  standalone: true,
  imports: [KirbyModule],
  selector: config.selector,
  template: config.template,
  styleUrls: ['./list-action-example.component.scss'],
})
export class ListActionMultipleActionsExampleComponent {
  template: string = config.template;

  public items = [
    {
      title: 'A multiple action item',
      amount: '5.587.218.309 DKK',
    },
  ];

  public actions: Partial<ListSwipeAction>[] = [
    {
      position: 'left',
      title: 'Archive',
      type: 'warning',
      onSelected: (item) => alert('Archive selected'),
      icon: 'attach',
    },
    {
      position: 'left',
      title: 'Add',
      type: 'success',
      onSelected: (item) => alert('Add selected'),
      icon: 'add',
    },
  ];

  public actionsExample = `actions = ${stringifyProp(this.actions)}`;
}
