import { Component } from '@angular/core';
import { Person, table_example_data } from '../table_example_data';

const config = {
  selector: 'cookbook-data-table-default-example',
  template: `<table kirby-table [fixedLayout]="true">
    <thead>
      <tr>
        <th>Name</th>
        <th kirby-th textAlignment="end">Height (cm)</th>
        <th kirby-th textAlignment="end">Weight (kg)</th>
      </tr>
    </thead>
    <tbody>
      <tr kirby-tr *ngFor="let rowData of tableData">
          <td>{{rowData.name}}</td>
          <td>{{rowData.height}}</td>
          <td>{{rowData.mass}}</td>
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
  tableData: Person[] = table_example_data.slice(0, 3);
}
