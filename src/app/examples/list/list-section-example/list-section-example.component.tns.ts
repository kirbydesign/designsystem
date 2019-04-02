import { Component } from '@angular/core';

import { BaseListComponent } from '../base-list.component';

@Component({
  templateUrl: './list-section-example.component.tns.html',
  styleUrls: ['./list-section-example.component.tns.scss'],
})
export class ListSectionExampleComponent extends BaseListComponent {
  getSectionName(item: any): string {
    if (item.detail > 0) {
      return 'Positive';
    } else if (item.detail < 0) {
      return 'Negative';
    } else {
      return 'Nul';
    }
  }
}
