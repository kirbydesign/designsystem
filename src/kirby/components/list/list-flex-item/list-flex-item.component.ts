import { Component, OnInit, AfterViewInit } from '@angular/core';

import { ListComponent } from '../list.component';

@Component({
  selector: 'kirby-list-flex-item',
  templateUrl: './list-flex-item.component.html',
  styleUrls: ['./list-flex-item.component.scss'],
  // Using host property decorator is fine for static values:
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    class: 'kirby-list-flex-item',
  },
})
export class ListFlexItemComponent implements OnInit, AfterViewInit {
  public showDivider = this.listComponent.showDivider;
  public isSelectable = this.listComponent.isSelectable;

  constructor(private listComponent: ListComponent) {}

  ngAfterViewInit(): void {}

  ngOnInit() {}
}
