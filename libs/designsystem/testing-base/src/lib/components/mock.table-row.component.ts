import { Component, forwardRef, Input } from '@angular/core';

import { TableRowComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tr[kirby-tr]',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: TableRowComponent,
      useExisting: forwardRef(() => MockTableRowComponent),
    },
  ],
})
export class MockTableRowComponent {
  @Input() selectable: boolean;
}

// #endregion
