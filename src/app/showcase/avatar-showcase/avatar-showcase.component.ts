import { Component, OnInit } from '@angular/core';
declare var require: any;

@Component({
  selector: 'kirby-avatar-showcase',
  templateUrl: './avatar-showcase.component.html',
  styleUrls: ['./avatar-showcase.component.scss']
})
export class AvatarShowcaseComponent implements OnInit {
  exampleHtml: string = require('../../examples/avatar-example/avatar-example.component.html');

  constructor() { }

  ngOnInit() {
  }

}

