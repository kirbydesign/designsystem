import { Component } from '@angular/core';
import { ToastController } from '@kirbydesign/designsystem';
import { Person, table_example_data } from '../table_example_data';

const config = {
  selector: 'cookbook-data-table-card-example',
  template: `<kirby-card>
  <table kirby-table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Eyes</th>
        <th>Gender</th>
        <th>Hair</th>
        <th>Skin</th>
        <th>Birth year</th>
        <th style="text-align:right;">Height (cm)</th>
        <th style="text-align:right;">Weight (kg)</th>
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
  template: string = config.template;

  constructor(private toastController: ToastController) {}

  onClickRow(index: number) {
    this.toastController.showToast({
      message: `You pressed row number ${index}`,
      messageType: 'success',
      durationInMs: 2000,
    });
  }
}
