import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import { MockRangeComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-range',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: MockRangeComponent,
      useExisting: forwardRef(() => MockMockRangeComponent),
    },
  ],
})
export class MockMockRangeComponent {
  @Input() minLabel: string;
  @Input() maxLabel: string;
  @Input() debounce: number;
  @Input() max: number;
  @Input() min: number;
  @Input() pin: boolean;
  @Input() step: number;
  @Input() ticks: boolean;
  @Input() disabled: boolean;
  @Input() value: number;
  @Output() change = new EventEmitter<number>();
}

// #endregion
