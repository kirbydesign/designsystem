import { Directive, forwardRef, Input } from '@angular/core';

import { SizeDirective, Sizes } from '@kirbydesign/designsystem';

@Directive({
  // don't worry. I know what i am doing!
  // tslint:disable-next-line:directive-selector
  selector: 'button[size], kirby-icon[size], kirby-avatar[size], kirby-item[size]',
  providers: [
    {
      provide: SizeDirective,
      useExisting: forwardRef(() => MockSizeDirective),
    },
  ],
})
export class MockSizeDirective {
  @Input() size: Sizes;
}
