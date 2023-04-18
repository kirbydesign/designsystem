import { Component, forwardRef, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { AlertExperimentalComponent } from '@kirbydesign/designsystem/alert-experimental';
import { ThemeColor } from '@kirbydesign/core';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-alert-experimental',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: AlertExperimentalComponent,
      useExisting: forwardRef(() => MockAlertExperimentalComponent),
    },
  ],
})
export class MockAlertExperimentalComponent {
  @Input() title: string | Observable<string>;
  @Input() message: string & Observable<string>;
  @Input() iconName: string;
  @Input() iconThemeColor: ThemeColor | `${ThemeColor}`;
  @Input() okButton: string;
  @Input() okButtonIsDestructive: boolean;
  @Input() cancelButton: string;
}

// #endregion
