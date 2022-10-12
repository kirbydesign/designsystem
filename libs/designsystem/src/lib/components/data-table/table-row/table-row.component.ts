import { ChangeDetectorRef, Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tr[kirby-tr]',
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./table-row.component.scss'],
})
export class TableRowComponent implements OnInit {
  @HostBinding('class.selectable') @Input() selectable: boolean = false;

  constructor(private readonly cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cdRef.detach();
  }
}
