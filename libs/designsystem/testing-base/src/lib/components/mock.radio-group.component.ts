import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import { RadioGroupComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-radio-group',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
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
  @Input() items: string[] | any[];
  @Input() itemTextProperty: string;
  @Input() itemDisabledProperty: string;
  @Input() selectedIndex: number;
  @Input() value: string | any;
  @Output() valueChange = new EventEmitter<string | any>();
}

// #endregion
