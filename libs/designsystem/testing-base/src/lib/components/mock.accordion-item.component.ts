import { Component, forwardRef, Input } from '@angular/core';

import { AccordionItemComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-accordion-item',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: AccordionItemComponent,
      useExisting: forwardRef(() => MockAccordionItemComponent),
    },
  ],
})
export class MockAccordionItemComponent {
  @Input() title: string;
  @Input() isExpanded: boolean;
  @Input() isDisabled: boolean;
  @Input() disabledTitle: string;
}

// #endregion
