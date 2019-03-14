import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kirby-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  @Input() item: any = {};

  @Input()
  set title(t: string) {
    this.item.title = t;
  }

  get title(): string {
    return this.item.title ? this.item.title : null;
  }

  @Input()
  set detail(d: string | number) {
    this.item.detail = d;
  }

  get detail(): string | number {
    return this.item.detail ? this.item.detail : null;
  }

  @Input()
  set amount(a: string | number) {
    this.item.amount = a;
  }

  get amount(): string | number {
    return this.item.amount ? this.item.amount : null;
  }

  @Input()
  set subTitle(s: string) {
    this.item.subTitle = s;
  }

  get subTitle(): string {
    return this.item.subTitle ? this.item.subTitle : null;
  }

  constructor() {}

  ngOnInit() {}
}
