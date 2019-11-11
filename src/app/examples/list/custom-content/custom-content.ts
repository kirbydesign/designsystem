import { Component } from '@angular/core';

import { BaseListComponent } from '../base-list.component';

export const ListWithCustomContentExampleTemplate = `<kirby-list [items]="items" (itemSelect)="onItemSelect($event)">
  <!-- Cells can also take arbitrary markup (client specific) as cell-lines -->
  <kirby-list-flex-item *kirbyListFlexItem="let item">
    <kirby-list-cell>
      <section style="flex-direction: row; display: flex; padding-top: 10px;">
        <kirby-avatar [imageSrc]="imageSrc" [size]="'small'">
          <kirby-badge themeColor="danger">1</kirby-badge>
        </kirby-avatar>
        <div style="margin-left: 10px; flex-direction: column; display: flex;">
          <kirby-list-cell-line [primary]="true" [text]="item.title"></kirby-list-cell-line>
          <kirby-list-cell-line [text]="item.detail"></kirby-list-cell-line>
        </div>
      </section>
    </kirby-list-cell>

    <kirby-list-cell verticalAlignment="top" horisontalAlignment="right">
      <kirby-list-cell-line [primary]="true" [text]="item.amount"></kirby-list-cell-line>
    </kirby-list-cell>
  </kirby-list-flex-item>
</kirby-list>`;

@Component({
  // tslint:disable-next-line
  selector: 'list-with-custom-content-example',
  template: `
    <kirby-page title="List with custom content">
      <kirby-page-content>
        ${ListWithCustomContentExampleTemplate}
      </kirby-page-content>
    </kirby-page>
  `,
})
export class ListWithCustomContentExampleComponent extends BaseListComponent {
  imageSrc =
    'https://www.jyskebank.dk/portletcontext-employeesuggest/EmployeePictureServlet' +
    '?large=true&employeeId=40501db73fd6677b9671ebb934f3f2e0';
}
