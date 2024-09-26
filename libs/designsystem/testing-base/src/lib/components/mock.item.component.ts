import { Component, forwardRef, Input } from '@angular/core';

import { ItemComponent, ItemSize } from '@kirbydesign/designsystem/item';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-item',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: ItemComponent,
      useExisting: forwardRef(() => MockItemComponent),
    },
  ],
})
export class MockItemComponent {
  @Input() disabled: boolean;
  @Input() selected: boolean;
  @Input() disclosure: 'link' | 'arrow-more' | 'arrow-down' | 'arrow-up' | null;
  @Input() selectable: boolean;
  @Input() reorderable: boolean;
  @Input() size: ItemSize | `${ItemSize}`;
}

// #endregion
