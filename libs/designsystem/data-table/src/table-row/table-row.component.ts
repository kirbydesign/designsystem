import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

const KIRBY_TABLE_ROW_DEPRECATION_WARNING =
  'Deprecation warning: The support for "kirby-tr" as a directive will be removed in the next major version. We recommend to use the global CSS class "kirby-table" on your HTML table tag, which will automatically style table rows.';

const KIRBY_TABLE_ROW_SELECTABLE_DEPRECATION_WARNING =
  'Deprecation warning: The "kirby-tr" support for using the input property "selectable" will be removed in the next major release. We recommend to use the global CSS class "kirby-selectable-row".';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tr[kirby-tr]',
  template: `
    <ng-content></ng-content>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableRowComponent {
  static hasWarnedAboutTableRowDeprecation: boolean = false;
  static hasWarnedAboutSelectableDeprecation: boolean = false;

  constructor() {
    if (TableRowComponent.hasWarnedAboutTableRowDeprecation) return;
    TableRowComponent.hasWarnedAboutTableRowDeprecation = true;
    console.warn(KIRBY_TABLE_ROW_DEPRECATION_WARNING);
  }

  private _selectable?: boolean;

  @HostBinding('class.kirby-selectable-row')
  get isSelectable(): boolean {
    return this._selectable;
  }

  @Input() set selectable(selectable: boolean) {
    this._selectable = selectable;

    if (TableRowComponent.hasWarnedAboutSelectableDeprecation) return;
    TableRowComponent.hasWarnedAboutSelectableDeprecation = true;
    console.warn(KIRBY_TABLE_ROW_SELECTABLE_DEPRECATION_WARNING);
  }
}
