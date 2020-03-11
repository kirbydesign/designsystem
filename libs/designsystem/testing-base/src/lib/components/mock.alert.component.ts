import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-alert',
  template: '<ng-content></ng-content>',
})
export class MockAlertComponent {
  @Input() title: string | Observable<string>;
  @Input() message: string & Observable<string>;
  @Input() iconName: string;
  @Input() iconThemeColor: string;
  @Input() okBtnText: string;
  @Input() okBtnIsDestructive: boolean;
  @Input() cancelBtnText: string;
}

// #endregion
