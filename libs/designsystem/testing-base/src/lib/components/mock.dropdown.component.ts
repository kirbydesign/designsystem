import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import { DropdownComponent } from '@kirbydesign/designsystem/dropdown';
import { HorizontalDirection } from '@kirbydesign/designsystem/popover';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-dropdown',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: DropdownComponent,
      useExisting: forwardRef(() => MockDropdownComponent),
    },
  ],
})
export class MockDropdownComponent {
  @Input() items: string[] | any[];
  @Input() selectedIndex: number;
  @Input() focusedIndex: number;
  @Input() itemTextProperty: string;
  @Input() placeholder: string;
  @Input() popout: HorizontalDirection | `${HorizontalDirection}`;
  @Input() attentionLevel: '1' | '2' | '3';
  @Input() expand?: 'block';
  @Input() disabled: boolean;
  @Input() hasError: boolean;
  @Input() size: 'sm' | 'md';
  @Input() tabindex: number;
  @Input() usePopover: boolean;
  @Output() change = new EventEmitter<string | any>();
}

// #endregion
