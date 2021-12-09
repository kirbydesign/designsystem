import { Component } from '@angular/core';

import { ItemSwipeAction } from '@kirbydesign/designsystem';

const config = {
  selector: 'cookbook-item-sliding-simple-example',
  template: `<p>{{text}}</p>
<kirby-list-experimental>
  <kirby-item-sliding
    [swipeActions]="swipeActions"
  >
    <kirby-item>Vestas Wind System</kirby-item>
  </kirby-item-sliding>

  <kirby-item-sliding
    [swipeActions]="swipeActions"
  >
    <kirby-item>Cypress Semiconductor Corporation</kirby-item>
  </kirby-item-sliding>

  <kirby-item-sliding
    [swipeActions]="swipeActions"
  >
    <kirby-item>Ultragenyx Pharmaceutical Inc.</kirby-item>
  </kirby-item-sliding>

  <kirby-item-sliding
    [swipeActions]="swipeActions"
  >
    <kirby-item>Astronics Corporation</kirby-item>
  </kirby-item-sliding>
</kirby-list-experimental>`,
  codeSnippet: `export class ItemSlidingSimpleExampleComponent {
  text = 'Nothing was selected';
  
  swipeActions: ItemSwipeAction[] = [
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
    },
  ];
  }
}`,
};
@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemSlidingSimpleExampleComponent {
  template = config.template;
  codeSnippet = config.codeSnippet;

  text = 'Nothing was selected';

  swipeActions: ItemSwipeAction[] = [
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
    },
  ];
}
