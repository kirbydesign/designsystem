import { Component, forwardRef, Input } from '@angular/core';

import { CardFooterComponent } from '@kirbydesign/designsystem/card';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-card-footer',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: CardFooterComponent,
      useExisting: forwardRef(() => MockCardFooterComponent),
    },
  ],
})
export class MockCardFooterComponent {
  @Input() hasPadding: boolean;
}

// #endregion
