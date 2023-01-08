import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

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
  @HostBinding('class.kirby-table-layout-fixed') @Input() fixedLayout: boolean = false;

  /**
   * Emits an index of the column that is clicked.
   * Implement with a simple sort method as consumer, fx.:
   *```ts
   * sort(){
   *   this.data.sort((a, b)=>{
   *     a.subData > b.subData ? return
   *   });
   * }
   * ```
   */
  @Output() sort = new EventEmitter<number>();

  @Output() selectRow = new EventEmitter<number>();

  constructor(private el: ElementRef) {}

  /**
   * Handles all click events on the table through the click HostListener.
   * @param target Target element that is clicked on
   */
  @HostListener('click', ['$event.target'])
  onClick(target: Element) {
    // If header click
    if (target.closest('thead')) this.headerClick(target);

    // If body click
    if (target.closest('tbody')) this.bodyClick(target);
  }

  /**
   * Handles headerclicks
   * @param clickedElement The element that was clicked
   *
   * If the row in the thead is clicked the element clicked will be found and
   * the index of the header will be emitted through the sort EventEmitter
   */
  headerClick(clickedElement: Element) {
    // Define the th element
    const tableHeadElement: Element = clickedElement.closest('th[kirby-th]');

    // Is the headerElement sortable?
    if (!tableHeadElement.outerHTML.includes('kirby-sortable-head')) return;

    // Define the thead row as an array of th elements
    const tableHeadRow: Element[] = Array.prototype.slice.call(
      tableHeadElement.parentElement.children
    );

    // Find the the position of the header element in the row
    const headIndex = tableHeadRow.findIndex((x) => {
      return x == tableHeadElement;
    });

    // Emit the position
    this.sort.emit(headIndex);
  }

  /**
   * Handles headerclicks
   * @param clickedElement The element that was clicked
   *
   * If the row in the thead is clicked the element clicked will be found and
   * the index of the header will be emitted through the sort EventEmitter
   */
  bodyClick(clickedElement: Element) {
    // Define the row element
    const tableRowElement: Element = clickedElement.closest('tr[kirby-tr]');

    // Is the headerElement clickable?
    if (!tableRowElement.outerHTML.includes('kirby-selectable-row"')) return;

    // Define the array of row elements in the body
    const tableBody: Element[] = Array.prototype.slice.call(tableRowElement.parentElement.children);

    // Find the the position of the row clicked
    const rowIndex = tableBody.findIndex((x) => {
      return x == tableRowElement;
    });

    // Emit the position
    this.selectRow.emit(rowIndex);
  }
}
