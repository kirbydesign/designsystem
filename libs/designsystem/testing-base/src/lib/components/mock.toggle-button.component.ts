import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import { ToggleButtonComponent } from '@kirbydesign/designsystem/toggle-button';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-toggle-button',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: ToggleButtonComponent,
      useExisting: forwardRef(() => MockToggleButtonComponent),
    },
  ],
})
export class MockToggleButtonComponent {
  @Input() checked: boolean;
  @Output() checkChanged = new EventEmitter<boolean>();
}

// #endregion
