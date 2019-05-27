import { Component } from '@angular/core';

import { BaseListComponent } from '../../list/base-list.component';

@Component({
  selector: 'kirby-list-section-example',
  templateUrl: './list-section-example.component.tns.html',
  styleUrls: ['./list-section-example.component.tns.scss'],
})
export class ListSectionExampleComponent extends BaseListComponent {
  getSectionName(item: any): string {
    // return item.detail > 0 ? 'Positive' : 'Negative';
    if (item.id < 20) return '<20';
    if (item.id < 40) return '<40';
    if (item.id < 60) return '<60';
    if (item.id < 80) return '<80';
    if (item.id < 80) return '<80';
    return '>80';
  }
}
