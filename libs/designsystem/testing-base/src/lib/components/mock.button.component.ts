import { Component, Input } from '@angular/core';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'button[kirby-button],Button[kirby-button]',
  template: '<ng-content></ng-content>',
})
export class MockButtonComponent {
  @Input() attentionLevel: '1' | '2' | '3' | '4';
  @Input() isDestructive: boolean;
  @Input() expand: 'full' | 'block';
  @Input() text: string;
  @Input() isFloating: boolean;
}

// #endregion
