import { Component, forwardRef, Input } from '@angular/core';

import { ActionGroupComponent } from '@kirbydesign/designsystem/action-group';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-action-group',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: ActionGroupComponent,
      useExisting: forwardRef(() => MockActionGroupComponent),
    },
  ],
})
export class MockActionGroupComponent {
  @Input() visibleActions?: number;
  @Input() emphasizeActions?: boolean;
  @Input() align: 'start' | 'end';
}

// #endregion
