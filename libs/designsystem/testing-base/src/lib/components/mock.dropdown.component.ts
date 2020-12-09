import { forwardRef, Component, Input, Output, EventEmitter } from '@angular/core';

import { DropdownComponent } from '@kirbydesign/designsystem';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-dropdown',
  template: '<ng-content></ng-content>',
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
  @Input() itemTextProperty: string;
  @Input() placeholder: string;
  @Input() attentionLevel: '1' | '2' | '3' | '4';
  @Input() expand: 'block';
  @Input() disabled: boolean;
  @Input() hasError: boolean;
  @Input() size: 'sm' | 'md';
  @Input() tabindex: number;
  @Output() change = new EventEmitter<string | any>();
}

// #endregion
