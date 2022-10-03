import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { table_example_data } from '../table_example_data';

interface TableIF {
  name: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  birth_year: string;
  height: string;
  mass: string;
}

const config = {
  selector: 'cookbook-data-table-card-example',
  template: `<kirby-card>
  <table kirbyTable>
    <thead kirbyThead>
      <tr kirbyTr>
        <ng-container *ngIf="tableData">
          <th>Name</th>
          <th>Eyes</th>
          <th>Gender</th>
          <th>Hair</th>
          <th>Birth year</th>
          <th style="text-align:right;">Height (cm)</th>
          <th style="text-align:right;">Weight (kg)</th>
        </ng-container>
      </tr>
    </thead>
    <tbody kirbyTbody>
      <tr kirbyTr *ngFor="let rowData of tableData">
          <td>{{rowData.name}}</td>
          <td>{{rowData.eye_color}}</td>
          <td>{{rowData.gender}}</td>
          <td>{{rowData.hair_color}}</td>
          <td>{{rowData.birth_year}}</td>
          <td style="text-align:right;">{{rowData.height}}</td>
          <td style="text-align:right;">{{rowData.mass}}</td>
      </tr>
    </tbody>
  </table>
</kirby-card>
  `,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class DataTableCardExampleComponent implements OnInit {
  tableData: TableIF[] = [];

  template: string = config.template;

  ngOnInit(): void {
    for (const person of table_example_data) {
      this.tableData.push({
        name: person.name,
        eye_color: person.eye_color,
        gender: person.gender,
        hair_color: person.hair_color,
        birth_year: person.birth_year,
        height: person.height,
        mass: person.mass,
      });
    }
  }
}
