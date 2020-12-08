import { forwardRef, Component, Input, Output, EventEmitter } from '@angular/core';

import { ReorderListComponent } from '@kirbydesign/designsystem';
import { ReorderEvent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
// Please note: To keep custom members (e.g. methods) when auto-generating mocks,
// wrap the custom code within a CUSTOM region - as in:
// #region CUSTOM
// YourCustomCodeHere() {
//   ...
// }
// #endregion
@Component({
  selector: 'kirby-reorder-list',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: ReorderListComponent,
      useExisting: forwardRef(() => MockReorderListComponent),
    },
  ],
})
// start class MockReorderListComponent
export class MockReorderListComponent {
  @Input() items: any[];
  @Input() subItemsName: string;
  @Input() getItemTextDefault: (item: any) => string;
  @Output() itemReorder = new EventEmitter<ReorderEvent>();
  @Output() subItemReorder = new EventEmitter<ReorderEvent>();
} // end class MockReorderListComponent

// #endregion
