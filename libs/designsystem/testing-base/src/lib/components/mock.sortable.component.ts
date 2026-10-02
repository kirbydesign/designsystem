import { Component, forwardRef, Input } from '@angular/core';

import { TableSortableComponent } from '@kirbydesign/designsystem/data-table';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'th[sortable]',
  template: '<ng-content></ng-content>',
  host: { mock: 'mock' },
  providers: [
    {
      provide: TableSortableComponent,
      useExisting: forwardRef(() => MockTableSortableComponent),
    },
  ],
})
export class MockTableSortableComponent {
  @Input() sortable: boolean;
  @Input() active: boolean;
  @Input() sortDirection: 'asc' | 'desc';
  @Input() iconAlignment: 'start' | 'end';
  @Input() alignment: 'start' | 'center' | 'end';
}

// #endregion
