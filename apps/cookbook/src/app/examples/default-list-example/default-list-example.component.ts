import { Component } from '@angular/core';

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
  selector: 'cookbook-default-list-example',
  template: config.template,
  styles: config.styles,
})
export class DefaultListExampleComponent {
  template: string = config.template;
  styles: string = config.styles.join(`
`);
}
