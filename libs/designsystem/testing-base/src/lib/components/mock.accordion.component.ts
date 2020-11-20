import { forwardRef, Component, Input } from '@angular/core';

import { AccordionComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-accordion',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: AccordionComponent,
      useExisting: forwardRef(() => MockAccordionComponent),
    },
  ],
})
export class MockAccordionComponent {
  @Input() title: string;
}

// #endregion
