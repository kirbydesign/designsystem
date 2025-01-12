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
  standalone: false,
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
  standalone: false,
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
  standalone: false,
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
  standalone: false,
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
  standalone: false,
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
  standalone: false,
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
  standalone: false,
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
  standalone: false,
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
  standalone: false,
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
  standalone: false,
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
  standalone: false,
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
