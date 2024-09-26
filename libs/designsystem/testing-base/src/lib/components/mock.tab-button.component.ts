import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import { TabButtonComponent } from '@kirbydesign/designsystem/tabs';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-tab-button',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: TabButtonComponent,
      useExisting: forwardRef(() => MockTabButtonComponent),
    },
  ],
})
export class MockTabButtonComponent {
  @Input() tab: string;
  @Output() click = new EventEmitter<Event>();
}

// #endregion
