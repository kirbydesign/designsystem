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
  @Input() itemTextProperty: string;
  @Input() itemDisabledProperty: string;
  @Input() value: any;
  @Output() change = new EventEmitter<string | any>();
}

// #endregion
