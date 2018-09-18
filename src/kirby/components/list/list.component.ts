import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kirby-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() items: [{title: string, amount: string}];
  constructor() { }

  ngOnInit() {
  }

}
