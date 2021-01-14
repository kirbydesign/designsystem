import { forwardRef, Component, Input, Output, EventEmitter } from '@angular/core';

import { RadioGroupComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-radio-group',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: RadioGroupComponent,
      useExisting: forwardRef(() => MockRadioGroupComponent),
    },
  ],
})
export class MockRadioGroupComponent {
  @Input() items: string[] | any[];
  @Input() selectedIndex: number;
  @Input() value: any;
  @Input() itemTextProperty: string;
  @Input() itemDisabledProperty: string;
  @Input() disabled: boolean;
  @Output() valueChange = new EventEmitter<string | any>();
}

// #endregion
