import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import { ListItemComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-list-item',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: ListItemComponent,
      useExisting: forwardRef(() => MockListItemComponent),
    },
  ],
})
export class MockListItemComponent {
  @Input() item: ListItem;
  @Input() endClass: EndClass;
  @Input() swipeActions: ListSwipeAction[];
  @Input() itemTemplate: TemplateRef<any>;
  @Input() isSelected: boolean;
  @Input() isSelectable: boolean;
  @Input() getItemColor: (item: ListItem) => ThemeColor;
  @Output() itemSelect = new EventEmitter<any>();
  @Output() swipeActionSelect = new EventEmitter<any>();
}

// #endregion
