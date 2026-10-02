import { Component, forwardRef, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { ThemeColor } from '@kirbydesign/designsystem/helpers';
import { AlertComponent } from '@kirbydesign/designsystem/modal';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-alert',
  template: '<ng-content></ng-content>',
  host: { mock: 'mock' },
  providers: [
    {
      provide: AlertComponent,
      useExisting: forwardRef(() => MockAlertComponent),
    },
  ],
})
export class MockAlertComponent {
  @Input() title: string | Observable<string>;
  @Input() message: string | Observable<string>;
  @Input() iconName: string;
  @Input() iconThemeColor: ThemeColor | `${ThemeColor}`;
  @Input() okBtn: string | Observable<string>;
  @Input() okBtnIsDestructive: boolean;
  @Input() cancelBtn: string | Observable<string>;
}

// #endregion
