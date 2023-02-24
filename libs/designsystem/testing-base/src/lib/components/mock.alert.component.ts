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
  @Input() iconName: string;
  @Input() iconThemeColor: ThemeColor | `${ThemeColor}`;
  @Input() okBtn: string;
  @Input() okBtnIsDestructive: boolean;
  @Input() cancelBtn: string;
}

// #endregion
erimentalComponent {
  @Input() title: string | Observable<string>;
  @Input() message: string & Observable<string>;
  @Input() iconName: string;
  @Input() iconThemeColor: ThemeColor | `${ThemeColor}`;
  @Input() okButton: string;
  @Input() okButtonIsDestructive: boolean;
  @Input() cancelButton: string;
}

// #endregion
