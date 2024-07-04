import { Component, forwardRef, Input } from '@angular/core';

import { CardComponent } from '@kirbydesign/designsystem/card';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-card',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: CardComponent,
      useExisting: forwardRef(() => MockCardComponent),
    },
  ],
})
export class MockCardComponent {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() backgroundImageUrl: string;
  @Input() hasPadding: boolean;
  @Input() sizes: { [size: string]: number };
  @Input() flat: boolean;
}

// #endregion
