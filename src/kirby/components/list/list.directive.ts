import { Directive } from '@angular/core';

@Directive({
  selector: '[kirbyListItem]',
})
export class ListItemDirective {}

@Directive({
  selector: '[kirbyListHeader]',
})
export class ListHeaderDirective {}

@Directive({
  selector: '[kirbyListCell]',
})
export class ListCellDirective {}

@Directive({
  selector: '[kirbyListSectionHeader]',
})
export class ListSectionHeaderDirective {}
