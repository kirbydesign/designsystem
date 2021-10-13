import { Directive, forwardRef, Input } from '@angular/core';

import { FitHeadingConfig, FitHeadingDirective } from '@kirbydesign/designsystem';

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
  // tslint:disable-next-line:no-input-rename
  @Input('kirbyFitHeading') config?: FitHeadingConfig;
}
