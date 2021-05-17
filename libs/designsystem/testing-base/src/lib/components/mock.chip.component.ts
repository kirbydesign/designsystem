import { Component, forwardRef, Input } from '@angular/core';

import { ChipComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-chip',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: ChipComponent,
      useExisting: forwardRef(() => MockChipComponent),
    },
  ],
})
export class MockChipComponent {
  @Input() text: string;
  @Input() isSelected: boolean;
  @Input() size: 'sm' | 'md';
}

// #endregion
