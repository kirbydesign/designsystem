import { Component, forwardRef, Input } from '@angular/core';

import { RouterOutletComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-router-outlet',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: RouterOutletComponent,
      useExisting: forwardRef(() => MockRouterOutletComponent),
    },
  ],
})
export class MockRouterOutletComponent {
  @Input() main: boolean;
}

// #endregion
