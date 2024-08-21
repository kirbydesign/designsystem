import { Component } from '@angular/core';
import { ThemeColor } from '@kirbydesign/designsystem/helpers';

const config = {
  selector: 'cookbook-accordion-with-items-example',
  template: `
  <kirby-accordion>
    <kirby-accordion-item title="Burgers">
      <kirby-list [items]="burgers">
        <kirby-item *kirbyListItemTemplate="let item" size="sm">
          <h3>{{item.title}}</h3>
          <data slot="end" class="kirby-text-bold">{{item.price}}</data>
        </kirby-item>
      </kirby-list>
    </kirby-accordion-item>
    <kirby-accordion-item title="Coin Offers">
      <kirby-list [items]="coinOffers">
        <kirby-item *kirbyListItemTemplate="let item" size="sm">
          <h3>{{item.title}}</h3>
          <data slot="end" class="kirby-text-bold">{{item.price}}</data>
        </kirby-item>
      </kirby-list>
    </kirby-accordion-item>
  </kirby-accordion>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class AccordionWithItemsExampleComponent {
  template: string = config.template;

  burgers: { title: string; price: string }[] = [
    { title: 'Big Mac', price: '32 DKK' },
    { title: 'Big Tasty Bacon', price: '45  DKK' },
    { title: 'McFeast', price: '37 DKK' },
  ];

  coinOffers: { title: string; price: string }[] = [
    { title: 'Hamburger', price: '15 DKK' },
    { title: 'Chesseburger', price: '15 DKK' },
    { title: 'Tasty Cheese', price: '15 DKK' },
    { title: 'Chicken Salsa Cheese', price: '20 DKK' },
  ];
}
