import { Component } from '@angular/core';

import { ItemSwipeAction } from '@kirbydesign/designsystem';
import { ListModule } from '@kirbydesign/designsystem/list';
import { NgFor } from '@angular/common';
import { ItemSlidingComponent } from '@kirbydesign/designsystem/item-sliding';
import { ItemModule } from '@kirbydesign/designsystem/item';

const config = {
  selector: 'cookbook-item-sliding-conditional-example',
  template: `<p>{{text}}</p>
<kirby-list-experimental>
  <kirby-item-sliding
    *ngFor="let item of items; let i = index"
    [swipeActions]="getSwipeActions(i)"
  >
    <kirby-item>{{ item.value }}</kirby-item>
  </kirby-item-sliding>
</kirby-list-experimental>`,
  codeSnippet: `export class ItemSlidingConditionalExampleComponent {
  text = 'Nothing was selected';

  items = [
    {
      value: 'Vestas Wind Systems',
      isDeleteable: true,
    },
    {
      value: 'Cypress Semiconductor Corporation',
      isDeleteable: false,
    },
    {
      value: 'Ultragenyx Pharmaceutical Inc.',
      isDeleteable: false,
    },
    {
      value: 'Astronics Corporation',
      isDeleteable: true,
    },
  ];

  getSwipeActions(index: number): ItemSwipeAction[] {
    const { isDeleteable } = this.items[index];

    return [
      {
        title: 'edit',
        type: 'success',
        onSelected: () => {
          this.text = 'Edit was clicked';
        },
      },
      {
        title: 'archive',
        type: 'warning',
        onSelected: () => {
          this.text = 'Archive was clicked';
        },
      },
      {
        title: 'delete',
        icon: 'trash',
        onSelected: () => {
          this.text = 'Delete was clicked';
        },
        type: 'danger',
        isDisabled: !isDeleteable,
      },
    ];
  }
}`,
};
@Component({
  selector: config.selector,
  template: config.template,
  imports: [ListModule, NgFor, ItemSlidingComponent, ItemModule],
})
export class ItemSlidingConditionalExampleComponent {
  public template = config.template;
  public codeSnippet = config.codeSnippet;

  text = 'Nothing was selected';

  items = [
    {
      value: 'Vestas Wind Systems',
      isDeleteable: true,
    },
    {
      value: 'Cypress Semiconductor Corporation',
      isDeleteable: false,
    },
    {
      value: 'Ultragenyx Pharmaceutical Inc.',
      isDeleteable: false,
    },
    {
      value: 'Astronics Corporation',
      isDeleteable: true,
    },
  ];

  getSwipeActions(index: number): ItemSwipeAction[] {
    const { isDeleteable } = this.items[index];

    return [
      {
        title: 'edit',
        type: 'success',
        onSelected: () => {
          this.text = 'Edit was clicked';
        },
      },
      {
        title: 'archive',
        type: 'warning',
        onSelected: () => {
          this.text = 'Archive was clicked';
        },
      },
      {
        title: 'delete',
        icon: 'trash',
        onSelected: () => {
          this.text = 'Delete was clicked';
        },
        type: 'danger',
        isDisabled: !isDeleteable,
      },
    ];
  }
}
