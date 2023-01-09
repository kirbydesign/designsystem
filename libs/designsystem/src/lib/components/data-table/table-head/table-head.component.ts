import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'th[kirby-th]',
  template: `<button>
    <ion-icon
      *ngIf="sortable && textAlignment === 'end'"
      name="{{ sortDirection === 'asc' ? 'arrow-down' : 'arrow-up' }}"
    ></ion-icon>
    <ng-content></ng-content>
    <ion-icon
      *ngIf="sortable && (textAlignment === 'start' || textAlignment === 'center')"
      name="{{ sortDirection === 'asc' ? 'arrow-down' : 'arrow-up' }}"
    ></ion-icon>
  </button>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableHeadComponent {
  /**
   * Sets the header to sortable
   */
  @HostBinding('class.kirby-sortable-head') @Input() sortable: boolean = false;

  @Input() sortDirection: 'asc' | 'desc';

  @HostBinding('class.kirby-text-alignment-head') @Input() textAlignment:
    | 'start'
    | 'center'
    | 'end' = 'start';
}
