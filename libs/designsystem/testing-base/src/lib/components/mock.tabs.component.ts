import { forwardRef, Component } from '@angular/core';

import { TabsComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-tab-bar',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: TabsComponent,
      useExisting: forwardRef(() => MockTabsComponent),
    },
  ],
})
// start class MockTabsComponent
export class MockTabsComponent {} // end class MockTabsComponent

// #endregion
