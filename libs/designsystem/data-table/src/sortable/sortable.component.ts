import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'th[sortable]',
  template: `
    <button>
      <ng-content></ng-content>
    </button>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableSortableComponent {
  /**
   * Sets the header to sortable
   */
  @HostBinding('class.kirby-sortable-head') @Input() sortable: boolean = false;

  @Input() sortDirection: 'asc' | 'desc';

  @Input() textAlignment?: 'start' | 'center' | 'end';

  @HostBinding('class.kirby-header-active') @Input() active = false;

  @HostBinding('class') get HeadingClass() {
    return this.textAlignment ? `kirby-align-heading-text ${this.textAlignment}` : '';
  }
}
