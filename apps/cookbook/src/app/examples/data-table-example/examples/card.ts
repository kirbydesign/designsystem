import { Component } from '@angular/core';
import { ToastController } from '@kirbydesign/designsystem';
import {
  Heading,
  Person,
  table_example_data,
  table_example_heading_data,
} from '../table_example_data';

const config = {
  selector: 'cookbook-data-table-card-example',
  template: `<kirby-card>
  <table kirby-table (sort)="sort($event)">
    <thead>
      <tr>
        <th *ngFor="let heading of headings" 
            kirby-th 
            [sortable]="heading.sortable" 
            [textAlignment]="heading.textAlignment" 
            [sortDirection]="heading.sortDirection">
              {{heading.title}}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr kirby-tr *ngFor="let rowData of tableData; let i = index" [selectable]="true" (click)="onClickRow(i)">
          <td>{{rowData.name}}</td>
          <td>{{rowData.eye_color}}</td>
          <td>{{rowData.gender}}</td>
          <td>{{rowData.hair_color}}</td>
          <td>{{rowData.skin_color}}</td>
          <td>{{rowData.birth_year}}</td>
          <td style="text-align:right;">{{rowData.height}}</td>
          <td style="text-align:right;">{{rowData.mass}}</td>
      </tr>
    </tbody>
  </table>
</kirby-card>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class DataTableCardExampleComponent {
  tableData: Person[] = table_example_data;
  headings: Heading[] = table_example_heading_data;
  template: string = config.template;

  constructor(private toastController: ToastController) {}

  onClickRow(index: number) {
    this.toastController.showToast({
      message: `You pressed row number ${index}`,
      messageType: 'success',
      durationInMs: 2000,
    });
  }

  sort(index: number) {
    this.tableData.sort((personA: Person, personB: Person) => {
      switch (index) {
        case 0:
          return this._sortHelper(personA.name, personB.name);
        case 6:
          return this._sortHelper(+personA.height, +personB.height);
        case 7:
          return this._sortHelper(+personA.mass, +personB.mass);
      }
    });
  }

  private _sortHelper(a, b) {
    if (a > b) return 1;
    else if (a < b) return -1;
    else return 0;
  }
}
