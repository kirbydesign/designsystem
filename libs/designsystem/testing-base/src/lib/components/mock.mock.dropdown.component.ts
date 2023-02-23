import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import { MockDropdownComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-dropdown',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: MockDropdownComponent,
      useExisting: forwardRef(() => MockMockDropdownComponent),
    },
  ],
})
export class MockMockDropdownComponent {
  @Input() items: string[] | any[];
  @Input() selectedIndex: number;
  @Input() focusedIndex: number;
  @Input() itemTextProperty: string;
  @Input() placeholder: string;
  @Input() popout: HorizontalDirection | `${HorizontalDirection}`;
  @Input() attentionLevel: '1' | '2' | '3';
  @Input() expand: 'block';
  @Input() disabled: boolean;
  @Input() hasError: boolean;
  @Input() size: 'sm' | 'md';
  @Input() tabindex: number;
  @Input() usePopover: boolean;
  @Output() change = new EventEmitter<string | any>();
}

// #endregion
