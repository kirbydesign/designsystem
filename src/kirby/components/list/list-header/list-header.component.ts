import { Component, Input, ContentChildren, TemplateRef, QueryList } from '@angular/core';

import { ListHeaderDirective } from '../list.component';

@Component({
  selector: 'kirby-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.scss'],
})
export class ListHeaderComponent {
  @ContentChildren(ListHeaderDirective, { read: TemplateRef }) listHeaderTemplates: QueryList<any>;

  constructor() {}
}
