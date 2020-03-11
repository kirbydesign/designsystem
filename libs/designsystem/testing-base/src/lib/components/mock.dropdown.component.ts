import { Component, Input, Output, EventEmitter } from '@angular/core';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-dropdown',
  template: '<ng-content></ng-content>',
})
export class MockDropdownComponent {
  @Input() items: string[] | any[];
  @Input() selectedIndex: number;
  @Input() itemTextProperty: string;
  @Input() placeholder: string;
  @Input() attentionLevel: '1' | '2' | '3' | '4';
  @Input() expand: 'block';
  @Input() disabled: boolean;
  @Input() tabindex: number;
  @Output() change = new EventEmitter<string | any>();
}

// #endregion
