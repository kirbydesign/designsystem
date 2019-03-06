import { BaseListComponent } from './../list-example/base-list.component';
import { Component } from '@angular/core';

@Component({
  selector: 'kirby-list-loadmore-example',
  templateUrl: './list-loadmore-example.component.html',
  styleUrls: ['./list-loadmore-example.component.scss'],
})
export class ListLoadmoreExampleComponent extends BaseListComponent {
  constructor() {
    super();
  }
}
