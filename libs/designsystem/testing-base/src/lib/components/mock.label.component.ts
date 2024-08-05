import { Component, forwardRef, Input } from '@angular/core';

import { LabelComponent } from '@kirbydesign/designsystem/item';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-label',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: LabelComponent,
      useExisting: forwardRef(() => MockLabelComponent),
    },
  ],
})
export class MockLabelComponent {
  @Input() direction: 'vertical' | 'horizontal';
}

// #endregion
