import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import { RadioGroupComponent } from '@kirbydesign/designsystem/radio';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-radio-group',
  template: '<ng-content></ng-content>',
  host: { mock: 'mock' },
  providers: [
    {
      provide: RadioGroupComponent,
      useExisting: forwardRef(() => MockRadioGroupComponent),
    },
  ],
})
export class MockRadioGroupComponent {
  @Input() disabled: boolean;
  @Input() hasError: boolean;
  @Output() hasErrorChange = new EventEmitter<boolean>();
  @Input() items: string[] | any[];
  @Input() itemTextProperty: string;
  @Input() itemDisabledProperty: string;
  @Input() selectedIndex: number;
  @Input() value: string | any;
  @Output() valueChange = new EventEmitter<string | any>();
}

// #endregion
