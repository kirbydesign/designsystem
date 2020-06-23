import { Component, Input, TemplateRef } from '@angular/core';

import { ListComponent } from '../../list.component';

@Component({
  selector: 'kirby-virtual-scroll-list',
  templateUrl: './virtual-scroll-list.component.html',
  styleUrls: ['../../list.component.scss'],
})
export class VirtualScrollListComponent {
  @Input() slidingItemTemplate: TemplateRef<any>;

  constructor(public listComponent: ListComponent) {}
}
