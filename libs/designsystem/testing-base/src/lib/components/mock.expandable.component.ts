import { forwardRef, Component, Input } from '@angular/core';

import { ExpandableComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-expandable',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: ExpandableComponent,
      useExisting: forwardRef(() => MockExpandableComponent),
    },
  ],
})
export class MockExpandableComponent {
  @Input() title: string;
}

// #endregion
