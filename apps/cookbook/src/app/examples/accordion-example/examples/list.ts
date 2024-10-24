import { Component } from '@angular/core';
import { BaseListComponent } from '../../list-shared/base-list.component';

const config = {
  selector: 'cookbook-accordion-with-list-example',
  template: `<kirby-accordion>
  <kirby-accordion-item title="Transactions" [isExpanded]="true">
    <kirby-list [items]="itemsFullList.slice(0,4)">
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
    <kirby-list [items]="itemsFullList.slice(4,7)">
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
export class AccordionWithListExampleComponent extends BaseListComponent {
  template: string = config.template;
}
