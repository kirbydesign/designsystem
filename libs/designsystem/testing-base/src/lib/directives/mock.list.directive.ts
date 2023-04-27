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
})
export class MockListFooterDirective {}

// #endregion
