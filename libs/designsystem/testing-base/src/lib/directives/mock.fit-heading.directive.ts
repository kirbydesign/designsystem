import { Directive, forwardRef, Input } from '@angular/core';

import { FitHeadingConfig, FitHeadingDirective } from '@kirbydesign/designsystem/shared';

@Directive({
  selector: `h1[kirbyFitHeading],
             h2[kirbyFitHeading],
             h3[kirbyFitHeading]`,
  providers: [
    {
      provide: FitHeadingDirective,
      useExisting: forwardRef(() => MockFitHeadingDirective),
    },
  ],
})
export class MockFitHeadingDirective {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('kirbyFitHeading') config?: FitHeadingConfig;
}
