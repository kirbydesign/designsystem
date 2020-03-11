import { Component, Input, Output, EventEmitter } from '@angular/core';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-dropdown',
  template: '<ng-content></ng-content>',
})
export class MockDropdownComponent {
  @Input() items: string[] | any[];
  @Input() selectedIndex;
  @Input() itemTextProperty;
  @Input() placeholder;
  @Input() attentionLevel: '1' | '2' | '3' | '4';
  @Input() expand: 'block';
  @Input() disabled;
  @Input() tabindex;
  @Output() change = new EventEmitter<string | any>();
}

// #endregion
