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
  selector: '[kirbyListHeader]',
})
export class ListHeaderDirective {}

@Directive({
  selector: '[kirbyListSectionHeader]',
})
export class ListSectionHeaderDirective {}

@Directive({
  selector: '[kirbyListFooter]',
})
export class ListFooterDirective {}
