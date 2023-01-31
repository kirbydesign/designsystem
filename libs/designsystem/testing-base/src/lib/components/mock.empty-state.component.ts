import { Component, forwardRef, Input } from '@angular/core';

import { EmptyStateComponent } from '@kirbydesign/designsystem/empty-state';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-empty-state',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: EmptyStateComponent,
      useExisting: forwardRef(() => MockEmptyStateComponent),
    },
  ],
})
export class MockEmptyStateComponent {
  @Input() iconName: string;
  @Input() customIconName: string;
  @Input() title: string;
  @Input() subtitle: string;
}

// #endregion
