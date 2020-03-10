import { Component, Input } from '@angular/core';

type horisontalAlignment = 'left' | 'center' | 'right' | 'space-between' | 'space-around';
type verticalAlignment = 'top' | 'center' | 'bottom' | 'stretch' | 'baseline';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-list-cell',
  template: '<ng-content></ng-content>',
})
export class MockListCellComponent {
  @Input() horisontalAlignment: horisontalAlignment;
  @Input() verticalAlignment: verticalAlignment;
  @Input() width: number;
}

// #endregion
