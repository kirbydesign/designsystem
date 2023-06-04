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
  templateUrl: './sortable.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableSortableComponent {
  @HostBinding('class.sortable-head')
  @Input()
  sortable = false;

  @HostBinding('class.icon-visible')
  @Input()
  active = false;

  @Input() sortDirection: 'asc' | 'desc';
  @Input() iconAlignment: 'start' | 'end' = 'end';
  @Input() textAlignment: 'start' | 'center' | 'end' = 'start';

  @HostBinding('class.header-active')
  get isActive() {
    return this.active && this.sortable;
  }

  _getButtonClass() {
    return `button-content-${this.textAlignment}`;
  }
}
