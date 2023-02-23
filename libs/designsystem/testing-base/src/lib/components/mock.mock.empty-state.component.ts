import { Component, forwardRef, Input } from '@angular/core';

import { MockEmptyStateComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-empty-state',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: MockEmptyStateComponent,
      useExisting: forwardRef(() => MockMockEmptyStateComponent),
    },
  ],
})
export class MockMockEmptyStateComponent {
  @Input() iconName: string;
  @Input() customIconName: string;
  @Input() title: string;
  @Input() subtitle: string;
}

// #endregion
