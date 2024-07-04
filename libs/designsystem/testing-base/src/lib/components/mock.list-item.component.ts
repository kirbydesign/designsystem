import { Component, EventEmitter, forwardRef, Input, Output, TemplateRef } from '@angular/core';

import {
  BoundaryClass,
  ListItemComponent,
  ListSwipeAction,
  ThemeColor,
} from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-list-item',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: ListItemComponent,
      useExisting: forwardRef(() => MockListItemComponent),
    },
  ],
})
export class MockListItemComponent {
  @Input() item: any;
  @Input() boundaryClass: BoundaryClass | BoundaryClass[];
  @Input() swipeActions: ListSwipeAction[];
  @Input() itemTemplate: TemplateRef<any>;
  @Input() isSelected: boolean;
  @Input() isSelectable: boolean;
  @Input() getItemColor: (item: any) => ThemeColor;
  @Output() itemSelect = new EventEmitter<any>();
  @Output() swipeActionSelect = new EventEmitter<any>();
}

// #endregion
