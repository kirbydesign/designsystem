import { Component } from '@angular/core';

import { BaseListComponent } from '../list-shared/base-list.component';

@Component({
  selector: 'cookbook-list-example',
  templateUrl: './list-example.component.html',
  styleUrls: ['./list-example.component.scss'],
})
export class ListExampleComponent extends BaseListComponent {}
