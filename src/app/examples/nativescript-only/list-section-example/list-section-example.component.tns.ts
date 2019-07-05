import { Component } from '@angular/core';

import { BaseListComponent } from '../../list/base-list.component';

@Component({
  selector: 'kirby-list-section-example',
  templateUrl: './list-section-example.component.tns.html',
  styleUrls: ['./list-section-example.component.tns.scss'],
})
export class ListSectionExampleComponent extends BaseListComponent {
  getSectionName(item: any): string {
    if (item.id < 5) return '1st section';
    if (item.id < 10) return '2nd section';
    if (item.id < 15) return '3rd section';
    if (item.id < 30) return '4th section';
    if (item.id < 60) return '5th section';
    return 'Large section';
  }
}
