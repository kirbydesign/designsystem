import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import { MockListItemComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-list-item',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: MockListItemComponent,
      useExisting: forwardRef(() => MockMockListItemComponent),
    },
  ],
})
export class MockMockListItemComponent {
  @Input() item: any;
  @Input() boundaryClass: BoundaryClass;
  @Input() swipeActions: ListSwipeAction[];
  @Input() itemTemplate: TemplateRef<any>;
  @Input() isSelected: boolean;
  @Input() isSelectable: boolean;
  @Input() getItemColor: (item: any) => ThemeColor;
  @Output() itemSelect = new EventEmitter<any>();
  @Output() swipeActionSelect = new EventEmitter<any>();
}

// #endregion
