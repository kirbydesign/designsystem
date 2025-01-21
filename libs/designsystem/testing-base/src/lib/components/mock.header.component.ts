import { Component, Directive, forwardRef, Input } from '@angular/core';

import {
  HeaderActionsDirective,
  HeaderComponent,
  HeaderCustomSectionDirective,
} from '@kirbydesign/designsystem/header';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Directive({
  selector: '[kirbyHeaderActions]',
  providers: [
    {
      provide: HeaderActionsDirective,
      useExisting: forwardRef(() => MockHeaderActionsDirective),
    },
  ],
})
export class MockHeaderActionsDirective {}

@Directive({
  selector: '[kirbyHeaderCustomSection]',
  providers: [
    {
      provide: HeaderCustomSectionDirective,
      useExisting: forwardRef(() => MockHeaderCustomSectionDirective),
    },
  ],
})
export class MockHeaderCustomSectionDirective {}

@Component({
  selector: 'kirby-header',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: HeaderComponent,
      useExisting: forwardRef(() => MockHeaderComponent),
    },
  ],
})
export class MockHeaderComponent {
  @Input() centered?: boolean;
  @Input() titleMaxLines: number;
  @Input() emphasizeActions: boolean;
  @Input() title: string;
  @Input() value: string;
  @Input() valueUnit: string;
  @Input() subtitle1: string;
  @Input() subtitle2: string;
}

// #endregion
