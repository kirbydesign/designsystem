import { Component, Directive, Input, Output, EventEmitter } from '@angular/core';

type stickyConfig = { sticky: boolean };
type fixedConfig = { fixed: boolean };

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Directive({
  selector: '[kirbyPageTitle]',
})
export class MockPageTitleDirective {}

@Directive({
  selector: '[kirbyPageToolbarTitle]',
})
export class MockPageToolbarTitleDirective {}

@Directive({
  selector: '[kirbyPageActions]',
})
export class MockPageActionsDirective {
  @Input() config: stickyConfig | fixedConfig;
}

@Directive({
  selector: '[kirbyPageContent]',
})
export class MockPageContentDirective {
  @Input() config: fixedConfig;
}

@Component({
  selector: 'kirby-page-content',
  template: '<ng-content></ng-content>',
})
export class MockPageContentComponent {}

@Component({
  selector: 'kirby-page-actions',
  template: '<ng-content></ng-content>',
})
export class MockPageActionsComponent {}

@Component({
  selector: 'kirby-page',
  template: '<ng-content></ng-content>',
})
export class MockPageComponent {
  @Input() title: string;
  @Input() toolbarTitle: string;
  @Input() titleAlignment: 'left' | 'center' | 'right';
  @Input() defaultBackHref: string;
  @Input() hideBackButton: boolean;
  @Input() titleMaxLines: number;
  @Output() enter = new EventEmitter<void>();
  @Output() leave = new EventEmitter<void>();
}

// #endregion
