import { Directive, forwardRef } from '@angular/core';

import { AccordionDirective } from '@kirbydesign/designsystem';

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
