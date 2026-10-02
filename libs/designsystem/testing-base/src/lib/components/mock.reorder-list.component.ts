import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import { ReorderEvent, ReorderListComponent } from '@kirbydesign/designsystem/reorder-list';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-reorder-list',
  template: '<ng-content></ng-content>',
  host: { mock: 'mock' },
  providers: [
    {
      provide: ReorderListComponent,
      useExisting: forwardRef(() => MockReorderListComponent),
    },
  ],
})
export class MockReorderListComponent {
  @Input() items: any[];
  @Input() subItemsName: string;
  @Input() getItemTextDefault: (item: any) => string;
  @Output() itemReorder = new EventEmitter<ReorderEvent>();
  @Output() subItemReorder = new EventEmitter<ReorderEvent>();
}

// #endregion
