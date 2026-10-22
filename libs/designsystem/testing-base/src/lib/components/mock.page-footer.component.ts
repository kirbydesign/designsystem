import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';

import { PageFooterComponent } from '@kirbydesign/designsystem/page';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-page-footer',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: '<ng-content></ng-content>',
  host: { mock: 'mock' },
  providers: [
    {
      provide: PageFooterComponent,
      useExisting: forwardRef(() => MockPageFooterComponent),
    },
  ],
})
export class MockPageFooterComponent {
  @Input() hasPadding: boolean;
}

// #endregion
