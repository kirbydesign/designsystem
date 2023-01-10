import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import { LocalNavigationItem, PageLocalNavigationComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-page-local-navigation',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: PageLocalNavigationComponent,
      useExisting: forwardRef(() => MockPageLocalNavigationComponent),
    },
  ],
})
export class MockPageLocalNavigationComponent {
  @Input() items: LocalNavigationItem[];
  @Input() selectedIndex: number;
  @Output() selectedIndexChange = new EventEmitter<number>();
}

// #endregion
