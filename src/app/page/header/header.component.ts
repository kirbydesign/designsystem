import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kirby-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  items = [
    {name: 'Design', selected: false, path: '/designer'},
    {name: 'Components', selected: true, path: '/home'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
