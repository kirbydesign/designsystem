import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import { AccordionItemComponent } from '@kirbydesign/designsystem/accordion';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-accordion-item',
  template: '<ng-content></ng-content>',
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
  @Input() hasPadding: boolean;
  @Input() headingLevel: 1 | 2 | 3 | 4 | 5 | 6;
  @Output() toggle = new EventEmitter<boolean>();
}

// #endregion
