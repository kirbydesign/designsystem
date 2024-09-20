import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-accordion-with-list-example',
  template: `<kirby-accordion>
  <kirby-accordion-item title="Transactions">
    <kirby-list [items]="transactions.slice(0,4)">
      <kirby-item *kirbyListItemTemplate="let item">
        <kirby-label>
          <h3>{{item.title}}</h3>
          <p subtitle>{{item.subTitle}}</p>
        </kirby-label>
        <kirby-label slot="end">
          <data [value]="item.amount">{{item.amount}}</data>
          <data [value]="item.detail" detail>{{item.detail}}</data>
        </kirby-label>
      </kirby-item>
    </kirby-list>
  </kirby-accordion-item>
  <kirby-accordion-item title="More Transactions">
    <kirby-list [items]="transactions.slice(4)">
      <kirby-item *kirbyListItemTemplate="let item">
        <kirby-label>
          <h3>{{item.title}}</h3>
          <p subtitle>{{item.subTitle}}</p>
        </kirby-label>
        <kirby-label slot="end">
          <data [value]="item.amount">{{item.amount}}</data>
          <data [value]="item.detail" detail>{{item.detail}}</data>
        </kirby-label>
      </kirby-item>
    </kirby-list>
  </kirby-accordion-item>
</kirby-accordion>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class AccordionWithListExampleComponent {
  template: string = config.template;

  transactions = [
    {
      id: 0,
      title: 'Vestas Wind Systems has a very long name',
      subTitle: '2000 pcs',
      amount: '5.587.218.309 DKK',
      detail: 225,
    },
    {
      id: 1,
      title: 'Cypress Semiconductor Corporation',
      subTitle: '1827 pcs',
      amount: '76.980 DKK',
      detail: -3,
    },
    {
      id: 2,
      title: 'Ultragenyx Pharmaceutical Inc.',
      subTitle: '787 pcs',
      amount: '83.004 DKK',
      detail: -115,
    },
    {
      id: 3,
      title: 'Trans World Entertainment Corp.',
      subTitle: '467 pcs',
      amount: '60.963 DKK',
      detail: 6,
    },
    {
      id: 4,
      title: 'Astronics Corporation',
      subTitle: '791 pcs',
      amount: '33.830 DKK',
      detail: -154,
    },
    {
      id: 5,
      title: 'Riverview Bancorp Inc',
      subTitle: '206 pcs',
      amount: '60.775 DKK',
      detail: 98,
    },
    {
      id: 6,
      title: 'Haemonetics Corporation',
      subTitle: '988 pcs',
      amount: '61.196 DKK',
      detail: 220,
    },
  ];
}
