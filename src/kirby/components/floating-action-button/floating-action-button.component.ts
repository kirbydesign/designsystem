import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kirby-floating-action-button',
  templateUrl: './floating-action-button.component.html',
  styleUrls: ['./floating-action-button.component.scss'],
})

// TODO: add shadows
// TODO: dynamically add image/icon
// TODO: add same properties as ionic floating action button, as described in the docs
// TODO: add unit tests for everything (example/component/showcase)
// TODO: add documentation
// TODO: make sure that proper formatting and TS Linting is in place 
// TODO: create pull-request

export class FloatingActionButtonComponent implements OnInit {
  iconSrc: string = "~/assets/icons/add/add@3x.png";

  constructor() { }

  ngOnInit() {}

  onTap(): void {
    console.log('tapped on the floating action button');
  }
}
