import { Component } from '@angular/core';

const template = `
<kirby-list [items]="items" [swipeActions]="[action]">
    <kirby-item *kirbyListItemTemplate="let item">
        <h3>{{item.title}}</h3>
        <data slot="end">{{item.amount}}</data>
   </kirby-item>
</kirby-list>
`;

@Component({
  selector: 'cookbook-list-action-one-action-example',
  template: template,
})
export class ListActionOneActionExampleComponent {
  public items = [
    {
      title: 'A singel action item',
      amount: '5.587.218.309 DKK',
    },
  ];

  public action = {
    title: 'Action',
    icon: 'person',
    onSelected: () => {
      alert('you get me!');
      console.log('you get me!');
    },
  };
}
