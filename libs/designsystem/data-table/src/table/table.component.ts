import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

const KIRBY_TABLE_DEPRECATION_WARNING =
  'Deprecation warning: The support for "kirby-table" as a directive will be removed in the next major version. We recommend to use the global CSS class "kirby-table".';

const KIRBY_TABLE_LAYOUT_FIXED_DEPRECATION_WARNING =
  'Deprecation warning: The "kirby-table" support for using the input property "fixedLayout" will be removed in the next major version. We recommend to use the global CSS class "layout-fixed" in combination with the "kirby-table" class';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'table[kirby-table]',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  constructor() {
    console.warn(KIRBY_TABLE_DEPRECATION_WARNING);
  }

  private _fixedLayout?: boolean;

  @HostBinding('class.kirby-table-layout-fixed')
  get hasFixedLayout(): boolean {
    return this._fixedLayout;
  }

  @Input() set fixedLayout(fixed: boolean) {
    this._fixedLayout = fixed;
    console.warn(KIRBY_TABLE_LAYOUT_FIXED_DEPRECATION_WARNING);
  }
}
