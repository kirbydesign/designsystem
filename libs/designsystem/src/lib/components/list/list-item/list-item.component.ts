import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';

import { ListComponent } from '../list.component';

@Component({
  selector: 'kirby-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['../list.component.scss', './list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  @Input() item: any;
  @Input() orderClass: string;
  @ViewChild(IonItemSliding) ionItemSliding: IonItemSliding;
  constructor(public listComponent: ListComponent) {}

  ngOnInit() {}
}
