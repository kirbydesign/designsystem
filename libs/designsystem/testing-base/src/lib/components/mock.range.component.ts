import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import { RangeComponent } from '@kirbydesign/designsystem';
import { RangeValue } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-range',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: RangeComponent,
      useExisting: forwardRef(() => MockRangeComponent),
    },
  ],
})
export class MockRangeComponent {
  @Input() color: string;
  @Input() debounce: number;
  @Input() disabled: boolean;
  @Input() max: number;
  @Input() min: number;
  @Input() mode: 'ios' | 'md';
  @Input() name: string;
  @Input() pin: boolean;
  @Input() snaps: boolean;
  @Input() step: number;
  @Input() ticks: number;
  @Output() valueChange = new EventEmitter<RangeValue>();
  @Input() startLabel: string;
  @Input() endLabel: string;
  @Input() value: RangeValue;

  rangeValueChange() {}
  writeValue() {}
  setDisabledState() {}
  registerOnTouched() {}
  registerOnChange() {}
  setLabel() {}
  setLabelFontSize() {}
  setLabelBackground() {}
  setKnobBackground() {}
  setPin() {}
  setPinFontSize() {}
  setPinBackground() {}
  setTick() {}
  setActiveTick() {}
  setBar() {}
  setActiveBar() {}
  setBarBackground() {}
}

// #endregion
