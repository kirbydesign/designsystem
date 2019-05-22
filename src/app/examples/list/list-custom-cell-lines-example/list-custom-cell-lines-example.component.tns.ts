import { Component } from '@angular/core';

import { BaseListComponent } from '../base-list.component';

@Component({
  templateUrl: './list-custom-cell-lines-example.component.tns.html',
  styleUrls: ['./list-custom-cell-lines-example.component.tns.scss'],
})
export class ListCustomCellLinesExampleComponent extends BaseListComponent {
  imageSrc =
    'https://www.jyskebank.dk/portletcontext-employeesuggest/EmployeePictureServlet' +
    '?large=true&employeeId=40501db73fd6677b9671ebb934f3f2e0';
}
