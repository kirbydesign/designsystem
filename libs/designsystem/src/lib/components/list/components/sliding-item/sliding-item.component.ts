import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import { ListComponent } from '../../list.component';

@Component({
  selector: 'kirby-sliding-item',
  templateUrl: './sliding-item.component.html',
  styleUrls: ['../../list.component.scss', './sliding-item.component.scss'],
})
export class SlidingItemComponent implements OnInit {
  @Input() item: any;
  constructor(public listComponent: ListComponent) {}

  ngOnInit() {}
}
