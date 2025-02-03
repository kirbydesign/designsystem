import { Directive } from '@angular/core';

@Directive({
  selector: '[kirbyListItemTemplate]',
  standalone: false,
})
export class ListItemTemplateDirective {}

@Directive({
  selector: '[kirbyListHeader], [kirbyListHeaderTemplate]',
  standalone: false,
})
export class ListHeaderDirective {}

@Directive({
  selector: '[kirbyListSectionHeader], [kirbyListSectionHeaderTemplate]',
  standalone: false,
})
export class ListSectionHeaderDirective {}

@Directive({
  selector: '[kirbyListFooter], [kirbyListFooterTemplate]',
  standalone: false,
})
export class ListFooterDirective {}
