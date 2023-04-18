import { Directive, forwardRef } from '@angular/core';

import { AccordionDirective } from '@kirbydesign/designsystem/accordion';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Directive({
  selector: '[kirbyAccordion], kirby-accordion',
  exportAs: 'kirby-accordion',
  providers: [
    {
      provide: AccordionDirective,
      useExisting: forwardRef(() => MockAccordionDirective),
    },
  ],
})
export class MockAccordionDirective {}

// #endregion
