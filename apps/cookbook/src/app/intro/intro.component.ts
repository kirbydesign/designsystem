import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  AllCommunityModule,
  type ColDef,
  type GridReadyEvent,
  ModuleRegistry,
} from 'ag-grid-community';

import { KirbyCheckboxCellRendererComponent } from './kirby-checkbox-cell-renderer.component';

ModuleRegistry.registerModules([AllCommunityModule]);

interface RowData {
  make: string;
  model: string;
  price: number;
}

@Component({
  selector: 'cookbook-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  imports: [AgGridAngular],
})
export class IntroComponent {
  rowData: RowData[] = [
    { make: 'Tesla', model: 'Model Y', price: 64950 },
    { make: 'Tesla', model: 'Model 3', price: 42990 },
    { make: 'Ford', model: 'F-Series', price: 33850 },
    { make: 'Ford', model: 'Mustang Mach-E', price: 45995 },
    { make: 'Toyota', model: 'Corolla', price: 29600 },
    { make: 'Toyota', model: 'RAV4 Prime', price: 41515 },
    { make: 'BMW', model: 'iX', price: 87100 },
    { make: 'BMW', model: '3 Series', price: 43800 },
    { make: 'Mercedes', model: 'EQS', price: 104400 },
    { make: 'Mercedes', model: 'C-Class', price: 46550 },
  ];

  colDefs: ColDef<RowData>[] = [
    {
      headerName: '',
      width: 72,
      maxWidth: 72,
      cellRenderer: KirbyCheckboxCellRendererComponent,
      sortable: false,
      filter: false,
      suppressMovable: true,
      resizable: false,
      lockPosition: 'left',
      cellRendererParams: {
        suppressMouseEventHandling: () => true,
      },
    },
    { field: 'make', headerName: 'Make' },
    { field: 'model', headerName: 'Model' },
    {
      field: 'price',
      headerName: 'Price',
      valueFormatter: (params) => (params.value != null ? `$${params.value.toLocaleString()}` : ''),
    },
  ];

  defaultColDef: ColDef = {
    flex: 1,
    sortable: true,
    filter: true,
  };

  rowSelection: {
    mode: 'multiRow';
    checkboxes: boolean;
    headerCheckbox: boolean;
    enableClickSelection: boolean;
  } = {
    mode: 'multiRow',
    checkboxes: false,
    headerCheckbox: false,
    enableClickSelection: false,
  };

  onGridReady(event: GridReadyEvent): void {
    event.api.sizeColumnsToFit();
  }
}
