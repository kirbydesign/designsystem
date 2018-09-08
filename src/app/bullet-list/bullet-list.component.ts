import { Component, OnInit } from '@angular/core';
import { ITEMS } from './bullet-list-data';

@Component({
  selector: 'kirby-bullet-list',
  templateUrl: './bullet-list.component.html',
  styleUrls: ['./bullet-list.component.scss']
})
export class BulletListComponent implements OnInit {
  items = ITEMS;

  constructor() { }

  ngOnInit() {
  }

}
