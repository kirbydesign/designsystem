import { Component, Directive, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import {
  PageActionsComponent,
  PageActionsDirective,
  PageComponent,
  PageContentComponent,
  PageContentDirective,
  PageHeaderComponent,
  PageTitleComponent,
  PageTitleDirective,
  PageToolbarTitleDirective,
} from '@kirbydesign/designsystem';

type stickyConfig = { sticky: boolean };
type fixedConfig = { fixed: boolean };

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Directive({
  selector: '[kirbyPageTitle]',
  providers: [
    {
      provide: PageTitleDirective,
      useExisting: forwardRef(() => MockPageTitleDirective),
    },
  ],
})
export class MockPageTitleDirective {}

@Directive({
  selector: '[kirbyPageToolbarTitle]',
  providers: [
    {
      provide: PageToolbarTitleDirective,
      useExisting: forwardRef(() => MockPageToolbarTitleDirective),
    },
  ],
})
export class MockPageToolbarTitleDirective {}

@Directive({
  selector: '[kirbyPageActions]',
  providers: [
    {
      provide: PageActionsDirective,
      useExisting: forwardRef(() => MockPageActionsDirective),
    },
  ],
})
export class MockPageActionsDirective {
  @Input('kirbyPageActions') config: stickyConfig | fixedConfig;
}

@Directive({
  selector: '[kirbyPageContent]',
  providers: [
    {
      provide: PageContentDirective,
      useExisting: forwardRef(() => MockPageContentDirective),
    },
  ],
})
export class MockPageContentDirective {
  @Input('kirbyPageContent') config: fixedConfig;
}

@Component({
  selector: 'kirby-page-progress',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: PageProgressComponent,
      useExisting: forwardRef(() => MockPageProgressComponent),
    },
  ],
})
export class MockPageProgressComponent {}

@Component({
  selector: 'kirby-page-title',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: PageTitleComponent,
      useExisting: forwardRef(() => MockPageTitleComponent),
    },
  ],
})
export class MockPageTitleComponent {}

@Component({
  selector: 'kirby-page-content',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: PageContentComponent,
      useExisting: forwardRef(() => MockPageContentComponent),
    },
  ],
})
export class MockPageContentComponent {}

@Component({
  selector: 'kirby-page-actions',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: PageActionsComponent,
      useExisting: forwardRef(() => MockPageActionsComponent),
    },
  ],
})
export class MockPageActionsComponent {}

@Component({
  selector: 'kirby-page',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: PageComponent,
      useExisting: forwardRef(() => MockPageComponent),
    },
  ],
})
export class MockPageComponent {
  @Input() title: string;
  @Input() toolbarTitle: string;
  @Input() titleAlignment: 'left' | 'center' | 'right';
  @Input() defaultBackHref: string;
  @Input() hideBackButton: boolean;
  @Input() titleMaxLines: number;
  @Input() tabBarBottomHidden: boolean;
  @Output() enter = new EventEmitter<void>();
  @Output() leave = new EventEmitter<void>();
}

// #endregion
