import { Component, Input, TemplateRef } from '@angular/core';

import { ListComponent } from '../../list.component';

@Component({
  selector: 'kirby-normal-list',
  templateUrl: './normal-list.component.html',
  styleUrls: ['../../list.component.scss'],
})
export class NormalListComponent {
  @Input() slidingItemTemplate: TemplateRef<any>;

  constructor(public listComponent: ListComponent) {}
}
