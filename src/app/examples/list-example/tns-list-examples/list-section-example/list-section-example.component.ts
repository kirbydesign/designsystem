import { Component } from '@angular/core';
import { BaseListComponent } from '../../base-list.component';

@Component({
  templateUrl: './list-section-example.component.html',
  styleUrls: ['./list-section-example.component.scss']
})
export class ListSectionExampleComponent extends BaseListComponent {
  getSectionName(item: any): string {
    return item.detail > 0 ? 'Positive' : 'Negative';
  }
}
