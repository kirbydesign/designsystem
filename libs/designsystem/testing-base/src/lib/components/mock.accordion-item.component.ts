import { forwardRef, Component, Input } from '@angular/core';

import { AccordionItemComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-accordion-item',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: AccordionItemComponent,
      useExisting: forwardRef(() => MockAccordionItemComponent),
    },
  ],
})
export class MockAccordionItemComponent {
  @Input() title: string;
}

// #endregion
