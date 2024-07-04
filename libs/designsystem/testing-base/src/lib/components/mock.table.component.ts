import { Component, forwardRef, Input } from '@angular/core';

import { TableComponent } from '@kirbydesign/designsystem/data-table';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'table[kirby-table]',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: TableComponent,
      useExisting: forwardRef(() => MockTableComponent),
    },
  ],
})
export class MockTableComponent {
  @Input() fixedLayout: boolean;
}

// #endregion
