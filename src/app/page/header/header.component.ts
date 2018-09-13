import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kirby-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  items:string[] = ['Design', 'Components'];

  constructor() { }

  ngOnInit() {
  }

}
