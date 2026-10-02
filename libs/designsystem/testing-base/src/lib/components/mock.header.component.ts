import { Component, Directive, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import {
  HeaderActionsDirective,
  HeaderComponent,
  HeaderCustomFlagDirective,
  HeaderCustomSectionDirective,
  HeaderTitleActionIconDirective,
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

@Directive({
  selector: '[kirbyHeaderTitleActionIcon]',
  providers: [
    {
      provide: HeaderTitleActionIconDirective,
      useExisting: forwardRef(() => MockHeaderTitleActionIconDirective),
    },
  ],
})
export class MockHeaderTitleActionIconDirective {}

@Directive({
  selector: '[kirbyHeaderCustomFlag]',
  providers: [
    {
      provide: HeaderCustomFlagDirective,
      useExisting: forwardRef(() => MockHeaderCustomFlagDirective),
    },
  ],
})
export class MockHeaderCustomFlagDirective {}

@Component({
  selector: 'kirby-header',
  template: '<ng-content></ng-content>',
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
  @Input() title?: string | null;
  @Input() value?: string | null;
  @Input() valueUnit?: string | null;
  @Input() subtitle1?: string | string[] | null;
  @Input() subtitle2?: string | string[] | null;
  @Input() hasInteractiveTitle?: boolean;
  @Output() titleClick = new EventEmitter<PointerEvent>();
}

// #endregion
