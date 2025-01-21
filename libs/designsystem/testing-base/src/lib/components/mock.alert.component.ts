import { Component, forwardRef, Input } from '@angular/core';
import { ThemeColor } from '@kirbydesign/core';
import { AlertComponent } from '@kirbydesign/designsystem/modal';
import { Observable } from 'rxjs/internal/Observable';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-alert',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
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
  @Input() message: string & Observable<string>;
  @Input() iconName: string;
  @Input() iconThemeColor: ThemeColor | `${ThemeColor}`;
  @Input() okBtn: string;
  @Input() okBtnIsDestructive: boolean;
  @Input() cancelBtn: string;
}

// #endregion
