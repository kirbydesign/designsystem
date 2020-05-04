import { Directive } from '@angular/core';

@Directive({
  selector: '[kirbyListItem]',
})
export class ListItemDirective {
  constructor() {
    console.warn(
      '*kirbyListItem directive is deprecated - please use *kirbyListItemTemplate directive instead.'
    );
  }
}

@Directive({
  selector: '[kirbyListFlexItem]',
})
export class ListFlexItemDirective {
  constructor() {
    console.warn(
      '*kirbyListFlexItem directive is deprecated - please use *kirbyListItemTemplate directive instead.'
    );
  }
}

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
