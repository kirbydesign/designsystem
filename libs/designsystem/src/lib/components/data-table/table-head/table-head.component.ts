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
  template: `<button [disabled]="!sortable">
    <ng-container *ngIf="textAlignment === 'end'; then arrow"></ng-container>
    <ng-content></ng-content>
    <ng-container
      *ngIf="textAlignment === 'start' || textAlignment === 'center'; then arrow"
    ></ng-container>

    <ng-template #arrow>
      <svg
        *ngIf="sortable"
        xmlns="http://www.w3.org/2000/svg"
        height="12px"
        width="12px"
        viewBox="0 0 24 24"
      >
        <use
          *ngIf="sortDirection === 'asc'"
          xlink:href="assets/kirby/icons/svg/arrow-up.svg#arrow-up"
        ></use>
        <use
          *ngIf="sortDirection === 'desc'"
          xlink:href="assets/kirby/icons/svg/arrow-down.svg#arrow-down"
        ></use>
      </svg>
    </ng-template>
  </button>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableHeadComponent {
  /**
   * Sets the header to sortable
   */
  @HostBinding('class.kirby-sortable-head') @Input() sortable: boolean = false;

  /**
   * Sets the current direction that is sortet, i.e. what direction the arrow is pointed
   * @param 'asc' | 'desc'
   */
  @Input() sortDirection: 'asc' | 'desc';

  /**
   * Sets alignment of the text within the header.
   * @param 'start' | 'center' | 'end'
   */
  @Input() textAlignment?: 'start' | 'center' | 'end';

  @HostBinding('class.kirby-header-active') @Input() active = false;

  @HostBinding('class') get HeadingClass() {
    return this.textAlignment ? `kirby-align-heading-text ${this.textAlignment}` : '';
  }
}
