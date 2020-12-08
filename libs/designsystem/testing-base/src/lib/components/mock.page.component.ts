import { forwardRef, Component, Directive, Input, Output, EventEmitter } from '@angular/core';

import {
  PageTitleDirective,
  PageToolbarTitleDirective,
  PageActionsDirective,
  PageContentDirective,
  PageContentComponent,
  PageActionsComponent,
  PageComponent,
  PageTitleComponent,
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
// start class MockPageTitleDirective
export class MockPageTitleDirective {} // end class MockPageTitleDirective

@Directive({
  selector: '[kirbyPageToolbarTitle]',
  providers: [
    {
      provide: PageToolbarTitleDirective,
      useExisting: forwardRef(() => MockPageToolbarTitleDirective),
    },
  ],
})
// start class MockPageToolbarTitleDirective
export class MockPageToolbarTitleDirective {} // end class MockPageToolbarTitleDirective

@Directive({
  selector: '[kirbyPageActions]',
  providers: [
    {
      provide: PageActionsDirective,
      useExisting: forwardRef(() => MockPageActionsDirective),
    },
  ],
})
// start class MockPageActionsDirective
export class MockPageActionsDirective {
  @Input('kirbyPageActions') config: stickyConfig | fixedConfig;
} // end class MockPageActionsDirective

@Directive({
  selector: '[kirbyPageContent]',
  providers: [
    {
      provide: PageContentDirective,
      useExisting: forwardRef(() => MockPageContentDirective),
    },
  ],
})
// start class MockPageContentDirective
export class MockPageContentDirective {
  @Input('kirbyPageContent') config: fixedConfig;
} // end class MockPageContentDirective

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
// start class MockPageTitleComponent
export class MockPageTitleComponent {} // end class MockPageTitleComponent

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
// start class MockPageContentComponent
export class MockPageContentComponent {} // end class MockPageContentComponent

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
// start class MockPageActionsComponent
export class MockPageActionsComponent {} // end class MockPageActionsComponent

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
// start class MockPageComponent
export class MockPageComponent {
  @Input() title: string;
  @Input() toolbarTitle: string;
  @Input() titleAlignment: 'left' | 'center' | 'right';
  @Input() defaultBackHref: string;
  @Input() hideBackButton: boolean;
  @Input() titleMaxLines: number;
  @Output() enter = new EventEmitter<void>();
  @Output() leave = new EventEmitter<void>();
} // end class MockPageComponent

// #endregion
