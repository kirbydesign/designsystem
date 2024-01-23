import { Component } from '@angular/core';

@Component({
  selector: 'cookbook-list-no-shape-example',
  templateUrl: './list-no-shape-example.component.html',
  styleUrls: ['./list-no-shape-example.component.scss'],
})
export class ListNoShapeExampleComponent {
  items: any[] = [
    {
      title: 'Holiday with friends',
      amount: -37445.02325,
    },
    {
      title: 'Savings',
      amount: 923367.2356,
    },
    {
      title: 'Expenses',
      amount: 65128.45,
      shadowAccounts: [
        {
          title: 'Food',
          amount: 376.12,
        },
        {
          title: 'Car',
          amount: 62376.12,
        },
        {
          title: 'Misc',
          amount: 2376.12,
        },
      ],
    },
  ];
}
