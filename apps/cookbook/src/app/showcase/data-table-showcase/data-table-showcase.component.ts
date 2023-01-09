import { Component } from '@angular/core';
import { dataTableApi } from './data-table-api';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

interface Test {
  subData: number;
}

@Component({
  selector: 'cookbook-data-table-showcase',
  templateUrl: './data-table-showcase.component.html',
  styleUrls: ['./data-table-showcase.component.scss'],
})
export class DataTableShowcaseComponent {
  _apiDescriptionPropertiesTable: ApiDescriptionProperty[] = [...dataTableApi];

  sortDirection: 'asc' | 'desc' = 'asc';

  data: Test[] = [{ subData: 1 }, { subData: 1 }];
  sortFunction(object: any) {
    this.sortDirection = this.sortDirection == 'asc' ? 'desc' : 'asc';
    this.data.sort((a, b) => {
      if (a.subData > b.subData) return 1;
      if (a.subData < b.subData) return -1;
      if (a.subData == b.subData) return 0;
    });
  }

  rowClick(object: any) {
    alert(`row, also: ${object}`);
  }
}
