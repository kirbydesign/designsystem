import { Component, OnInit } from '@angular/core';

import { Heading, Person, tableExampleData, tableExampleHeadingData } from '../example-data';

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
          [alignment]="heading.textAlignment"
          [active]="heading.active"
          (click)="sortData(i, heading.title)"
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
  importSnippet: `import { TableSortableComponent } from '@kirbydesign/designsystem/data-table';

@Component({
  selector: 'my-component'
  standalone: true
  imports: [TableSortableComponent],
})
export class MyComponent {}

// OR

@NgModule({
  imports: [TableSortableComponent],
})
export class MyModule {}`,
  sortingSnippet: `headings = [
  { title: 'Name', sortable: true, sortDirection: 'asc', active: true },
  { title: 'Eyes' },
  ...
]`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class DataTableSortableExampleComponent implements OnInit {
  tableData: Person[] = tableExampleData;
  headings: Heading[] = tableExampleHeadingData;
  template: string = config.template;
  importSnippet: string = config.importSnippet;
  sortingSnippet = config.sortingSnippet;

  ngOnInit(): void {
    this.headings[0].sortDirection = 'desc';
    this.sortData(0, 'Name');
  }

  sortData(index: number, headingTitle: string) {
    this.headings[index].active = this._activeHelper(index);

    this.headings[index].sortDirection =
      this.headings[index].sortDirection == 'asc' ? 'desc' : 'asc';

    this.tableData.sort((personA: Person, personB: Person) => {
      switch (headingTitle) {
        case 'Name':
          return this._sortHelper(personA.name, personB.name, this.headings[index].sortDirection);
        case 'Height (cm)':
          return this._sortHelper(
            personA.height,
            personB.height,
            this.headings[index].sortDirection
          );
        case 'Weight (kg)':
          return this._sortHelper(personA.mass, personB.mass, this.headings[index].sortDirection);
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
