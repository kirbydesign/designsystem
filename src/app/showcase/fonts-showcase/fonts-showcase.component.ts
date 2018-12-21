import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'kirby-fonts-showcase',
  templateUrl: './fonts-showcase.component.html',
  styleUrls: ['./fonts-showcase.component.scss']
})
export class FontsShowcaseComponent implements OnInit {

  @Output() isCTABoxShown = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
