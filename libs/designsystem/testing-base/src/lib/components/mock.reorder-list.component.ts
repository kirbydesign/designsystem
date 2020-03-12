import { Component, Input, Output, EventEmitter } from '@angular/core';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-reorder-list',
  template: '<ng-content></ng-content>',
})
export class MockReorderListComponent {
  @Input() items: any[];
  @Input() subItemsName: string;
  @Input() getItemTextDefault: (item: any) => string;
  @Output() itemReorder = new EventEmitter<any>();
  @Output() subItemReorder = new EventEmitter<any>();
}

// #endregion
