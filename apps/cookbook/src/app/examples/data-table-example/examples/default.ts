import { Component } from '@angular/core';

import { Person, tableExampleData } from '../example-data';
import { stringifyPretty } from '~/app/shared/code-viewer/code-viewer.component';

const config = {
  selector: 'cookbook-data-table-default-example',
  template: `<table class="kirby-table layout-fixed">
    <thead>
      <tr>
        <th>Name</th>
        <th style="text-align:right;">Height (cm)</th>
        <th style="text-align:right;">Weight (kg)</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let rowData of tableData">
          <td>{{rowData.name}}</td>
          <td style="text-align:right;">{{rowData.height}}</td>
          <td style="text-align:right;">{{rowData.mass}}</td>
      </tr>
    </tbody>
  </table>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class DataTableDefaultExampleComponent {
  template: string = config.template;
  tableData: Person[] = tableExampleData.slice(0, 3);
  dataSnippet = `tableData = ${stringifyPretty(
    this.tableData.map((data) => {
      const { name, height, mass } = data;
      return { name, height, mass };
    })
  )};`;
}
