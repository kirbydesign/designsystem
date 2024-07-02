import { Component, forwardRef, Input } from '@angular/core';

import { TabNavigationItemComponent } from '@kirbydesign/designsystem/tab-navigation';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-tab-navigation-item',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: TabNavigationItemComponent,
      useExisting: forwardRef(() => MockTabNavigationItemComponent),
    },
  ],
})
export class MockTabNavigationItemComponent {
  @Input() label: string;
}

// #endregion
