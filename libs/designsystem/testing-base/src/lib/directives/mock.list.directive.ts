import { Directive, forwardRef } from '@angular/core';

import {
  ListFooterDirective,
  ListHeaderDirective,
  ListItemTemplateDirective,
  ListSectionHeaderDirective,
} from '@kirbydesign/designsystem/list';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Directive({
  selector: '[kirbyListItemTemplate]',
  providers: [
    {
      provide: ListItemTemplateDirective,
      useExisting: forwardRef(() => MockListItemTemplateDirective),
    },
  ],
  standalone: false,
})
export class MockListItemTemplateDirective {}

@Directive({
  selector: '[kirbyListHeader], [kirbyListHeaderTemplate]',
  providers: [
    {
      provide: ListHeaderDirective,
      useExisting: forwardRef(() => MockListHeaderDirective),
    },
  ],
  standalone: false,
})
export class MockListHeaderDirective {}

@Directive({
  selector: '[kirbyListSectionHeader], [kirbyListSectionHeaderTemplate]',
  providers: [
    {
      provide: ListSectionHeaderDirective,
      useExisting: forwardRef(() => MockListSectionHeaderDirective),
    },
  ],
  standalone: false,
})
export class MockListSectionHeaderDirective {}

@Directive({
  selector: '[kirbyListFooter], [kirbyListFooterTemplate]',
  providers: [
    {
      provide: ListFooterDirective,
      useExisting: forwardRef(() => MockListFooterDirective),
    },
  ],
  standalone: false,
})
export class MockListFooterDirective {}

// #endregion
