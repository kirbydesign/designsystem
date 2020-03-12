import { forwardRef, Component, Input, Output, EventEmitter } from '@angular/core';

import { ToolbarComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-toolbar',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: ToolbarComponent,
      useExisting: forwardRef(() => MockToolbarComponent),
    },
  ],
})
export class MockToolbarComponent {
  @Input() title: string;
  @Input() hideBackButton: boolean;
  @Output() back = new EventEmitter();
  @Output() primarySelect = new EventEmitter();
  @Output() secondarySelect = new EventEmitter();
}

// #endregion
