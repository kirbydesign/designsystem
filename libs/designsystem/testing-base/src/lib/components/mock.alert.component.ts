// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-alert',
  template: '<ng-content></ng-content>',
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
oolean;
  @Input() cancelButton: string;
}

// #endregion
