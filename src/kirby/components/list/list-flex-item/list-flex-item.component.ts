import { Component, OnInit, AfterViewInit } from '@angular/core';

import { ListComponent } from '../list.component';

@Component({
  selector: 'kirby-list-flex-item',
  templateUrl: './list-flex-item.component.html',
  styleUrls: ['./list-flex-item.component.scss'],
})
export class ListFlexItemComponent implements OnInit, AfterViewInit {
  public showDivider = this.listComponent.showDivider;
  public isSelectable = this.listComponent.isSelectable;

  constructor(private listComponent: ListComponent) {}

  ngAfterViewInit(): void {}

  ngOnInit() {}
}
