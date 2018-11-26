import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kirby-dummy-card',
  templateUrl: './dummy-card.component.html',
  styleUrls: ['./dummy-card.component.scss']
})
export class DummyCardComponent implements OnInit {
  title: string;

  constructor() {
    this.title = Math.random().toString().replace('0.', '');
  }

  ngOnInit() {
  }

}
