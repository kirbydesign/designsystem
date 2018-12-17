import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kirby-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input() item: any = {};

  @Input()
  set title(t: string) {
    this.item.title = t;
  }

  @Input()
  set detail(d: string) {
    this.item.detail = d;
  }

  @Input()
  set amount(a: string | number) {
    this.item.amount = a;
  }

  constructor() { }

  ngOnInit() { }

}
