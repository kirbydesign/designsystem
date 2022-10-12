import { ChangeDetectorRef, Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'table[kirby-table]',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @HostBinding('class.--kirby-table-layout-fixed') @Input() fixedLayout: boolean = false;

  constructor(private readonly cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cdRef.detach();
  }
}
