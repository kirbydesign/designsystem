import { Component, Directive, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import {
  PageActionsComponent,
  PageActionsDirective,
  PageComponent,
  PageContentComponent,
  PageContentDirective,
  PageProgressComponent,
  PageStickyContentDirective,
  PageSubtitleDirective,
  PageTitleComponent,
  PageTitleDirective,
  PageToolbarTitleDirective,
  PullToRefreshEvent,
} from '@kirbydesign/designsystem/page';

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
  selector: '[kirbyPageSubtitle]',
  providers: [
    {
      provide: PageSubtitleDirective,
      useExisting: forwardRef(() => MockPageSubtitleDirective),
    },
  ],
})
export class MockPageSubtitleDirective {}

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
  // eslint-disable-next-line @angular-eslint/no-input-rename
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
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('kirbyPageContent') config: fixedConfig;
}

@Directive({
  selector: '[kirbyPageStickyContent]',
  providers: [
    {
      provide: PageStickyContentDirective,
      useExisting: forwardRef(() => MockPageStickyContentDirective),
    },
  ],
})
export class MockPageStickyContentDirective {}

@Component({
  selector: 'kirby-page-progress',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
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
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
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
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
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
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
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
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { mock: 'mock' },
  providers: [
    {
      provide: PageComponent,
      useExisting: forwardRef(() => MockPageComponent),
    },
  ],
})
export class MockPageComponent {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() toolbarTitle: string;
  @Input() titleAlignment: 'left' | 'center' | 'right';
  @Input() defaultBackHref: string;
  @Input() hideBackButton: boolean;
  @Input() titleMaxLines: number;
  @Input() maxWidth: 'default' | 'lg' | 'xl' | 'full';
  @Input() tabBarBottomHidden: boolean;
  @Output() enter = new EventEmitter<void>();
  @Output() leave = new EventEmitter<void>();
  @Output() refresh = new EventEmitter<PullToRefreshEvent>();
  @Output() backButtonClick = new EventEmitter<Event>();
}

// #endregion
