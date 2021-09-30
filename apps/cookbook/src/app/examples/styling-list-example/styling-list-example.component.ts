import { Component, OnInit } from '@angular/core';

const config = {
  template: `<div class="menu-items-container">
  <ul class="menu-items">
    <li>
      <a
        class="menu-item">"Menu Item 1"</a
      >
    </li>`,
  styles: [
    `li::before { 
  display: none; 
}`,
  ],
};

@Component({
  selector: 'cookbook-styling-list-example',
  templateUrl: './styling-list-example.component.html',
  styleUrls: ['./styling-list-example.component.scss'],
})
export class StylingListExampleComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
  //   template: string = config.template;
  //   styles: string = config.styles.join(`
  // `);
}
