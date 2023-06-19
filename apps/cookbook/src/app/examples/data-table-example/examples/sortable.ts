import { Component } from '@angular/core';
import { Heading, Person, tableExampleData, tableExampleHeadingData } from '../table_example_data';

const config = {
  selector: 'cookbook-data-table-sortable-example',
  template: `<kirby-card>
  <table class="kirby-table">
    <thead>
      <tr>
        <th *ngFor="let heading of headings; let i = index" 
          [sortable]="heading.sortable"  
          [sortDirection]="heading.sortDirection"
          [iconAlignment]="heading.iconAlignment"
          [textAlignment]="heading.textAlignment"
          [active]="heading.active"
          (click)="onClickSort(i)"
        >
         {{heading.title}}
        </th>
            
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let rowData of tableData; let i = index">
          <td>{{rowData.name}}</td>
          <td>{{rowData.eye_color}}</td>
          <td>{{rowData.gender}}</td>
          <td>{{rowData.hair_color}}</td>
          <td>{{rowData.skin_color}}</td>
          <td>{{rowData.birth_year}}</td>
          <td class="text-align-right">{{rowData.height}}</td>
          <td class="text-align-right">{{rowData.mass}}</td>
      </tr>
    </tbody>
  </table>
</kirby-card>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class DataTableSortableExampleComponent {
  tableData: Person[] = tableExampleData;
  headings: Heading[] = tableExampleHeadingData;
  template: string = config.template;

  onClickSort(index: number) {
    this.headings[index].active = this._activeHelper(index);

    this.headings[index].sortDirection =
      this.headings[index].sortDirection == 'asc' ? 'desc' : 'asc';

    this.tableData.sort((personA: Person, personB: Person) => {
      switch (index) {
        case 0:
          return this._sortHelper(personA.name, personB.name, this.headings[index].sortDirection);
        case 6:
          return this._sortHelper(
            +personA.height,
            +personB.height,
            this.headings[index].sortDirection
          );
        case 7:
          return this._sortHelper(+personA.mass, +personB.mass, this.headings[index].sortDirection);
      }
    });
  }

  private _sortHelper(a, b, direction: 'asc' | 'desc') {
    if (direction == 'asc') {
      if (a > b) return 1;
      else if (a < b) return -1;
      else return 0;
    } else {
      if (a < b) return 1;
      else if (a > b) return -1;
      else return 0;
    }
  }
  private _activeHelper(index: number): boolean {
    if (this.headings[index].active) return true;
    else {
      this.headings.forEach((h) => {
        h.active = false;
      });
      return true;
    }
  }
}
