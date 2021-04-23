import { Component, ViewChild } from '@angular/core';

import { ListItemComponent } from '../list-item/list-item.component';
import { ListComponent } from '../list.component';

@Component({
  selector: 'kirby-normal-list',
  templateUrl: './normal-list.component.html',
  styleUrls: ['../list.component.scss'],
})
export class NormalListComponent {
  @ViewChild(ListItemComponent) listItem: ListItemComponent;
  constructor(public listComponent: ListComponent) {}
}
