import { Component, OnInit } from '@angular/core';

import { BaseListComponent } from '../../list-shared/base-list.component';

@Component({
  selector: 'cookbook-virtual-scroll-list-example',
  templateUrl: './virtual-scroll-list-example.component.html',
  styleUrls: ['./virtual-scroll-list-example.component.scss'],
})
export class VirtualScrollListExampleComponent extends BaseListComponent {}
