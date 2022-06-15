import { Directive } from '@angular/core';

@Directive({
  selector: '[kirbyListItemTemplate]',
})
export class ListItemTemplateDirective {}

@Directive({
  selector: '[kirbyListHeader], [kirbyListHeaderTemplate]',
})
export class ListHeaderDirective {}

@Directive({
  selector: '[kirbyListSectionHeader], [kirbyListSectionHeaderTemplate]',
})
export class ListSectionHeaderDirective {}

@Directive({
  selector: '[kirbyListFooter], [kirbyListFooterTemplate]',
})
export class ListFooterDirective {}
