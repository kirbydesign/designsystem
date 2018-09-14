import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kirby-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  items = [
    {name: 'Design', selected: false},
    {name: 'Components', selected: true}
  ];

  constructor() { }

  ngOnInit() {
  }

}
