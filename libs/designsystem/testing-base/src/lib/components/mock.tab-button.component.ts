import { forwardRef, Component, Input, Output, EventEmitter } from '@angular/core';

import { TabButtonComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-tab-button',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: TabButtonComponent,
      useExisting: forwardRef(() => MockTabButtonComponent),
    },
  ],
})
export class MockTabButtonComponent {
  @Input() routerLink: string;
  @Output() click = new EventEmitter<Event>();
}

// #endregion
