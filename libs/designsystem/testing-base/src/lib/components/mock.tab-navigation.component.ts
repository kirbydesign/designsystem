import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';

import { TabNavigationComponent } from '@kirbydesign/designsystem/tab-navigation';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-tab-navigation',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: '<ng-content></ng-content>',
  host: { mock: 'mock' },
  providers: [
    {
      provide: TabNavigationComponent,
      useExisting: forwardRef(() => MockTabNavigationComponent),
    },
  ],
})
export class MockTabNavigationComponent {
  @Input() selectedIndex: number;
  @Output() selectedIndexChange = new EventEmitter<number>();
}

// #endregion
