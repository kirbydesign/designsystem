import { Component, EventEmitter, forwardRef, Output } from '@angular/core';

import { TabNavigationComponent } from '@kirbydesign/designsystem/tab-navigation';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-tab-navigation',
  template: '<ng-content></ng-content>',
  host: { mock: 'mock' },
  providers: [
    {
      provide: TabNavigationComponent,
      useExisting: forwardRef(() => MockTabNavigationComponent),
    },
  ],
})
export class MockTabNavigationComponent {
  @Output() selectedIndexChange = new EventEmitter<number>();
}

// #endregion
