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
  @Input() sortDirection: 'asc' | 'desc';
  @Input() sortable: boolean;
  @Input() iconAlignment: 'start' | 'end' = 'end';

  @HostBinding('class.kirby-header-active') @Input() active = false;
}
