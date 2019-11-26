import { Directive } from '@angular/core';

@Directive({
  selector: '[kirbyListItem]',
})
export class ListItemDirective {}

@Directive({
  selector: '[kirbyListFlexItem]',
})
export class ListFlexItemDirective {}

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
