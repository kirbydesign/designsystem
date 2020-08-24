import { forwardRef, Component } from '@angular/core';

import { CardFooterComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-card-footer',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: CardFooterComponent,
      useExisting: forwardRef(() => MockCardFooterComponent),
    },
  ],
})
export class MockCardFooterComponent {}

// #endregion
