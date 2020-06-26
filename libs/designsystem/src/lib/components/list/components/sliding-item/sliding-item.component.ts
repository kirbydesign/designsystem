import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';

import { ListComponent } from '../../list.component';

@Component({
  selector: 'kirby-sliding-item',
  templateUrl: './sliding-item.component.html',
  styleUrls: ['../../list.component.scss', './sliding-item.component.scss'],
})
export class SlidingItemComponent implements OnInit {
  @Input() item: any;
  @ViewChild(IonItemSliding) ionItemSliding: IonItemSliding;
  constructor(public listComponent: ListComponent) {}

  ngOnInit() {}
}
