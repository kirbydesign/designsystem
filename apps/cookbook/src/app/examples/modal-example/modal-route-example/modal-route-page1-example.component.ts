import { Component, Input } from '@angular/core';

import { ModalConfig } from '@kirbydesign/designsystem';

@Component({
  selector: 'cookbook-modal-route-page-1-example',
  template: `
    <kirby-page-title>Modal Page 1/3</kirby-page-title>

    <h4>The standard Lorem Ipsum passage, used since the 1500s</h4>
    <p>
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    </p>
    <button kirby-button (click)="toggleFooter()">Toggle footer</button>

    <kirby-inline-footer>Inline footer content</kirby-inline-footer>

    <kirby-modal-footer *ngIf="showFooter">
      <button kirby-button class="nav" routerLink="../page2">
        Next
        <kirby-icon name="arrow-more"></kirby-icon>
      </button>
    </kirby-modal-footer>
  `,
  styles: [
    'kirby-modal-footer { --kirby-modal-footer-justify-content: flex-end; }',
    'h4 { margin-top: 24px; } ',
  ],
})
export class ModalRoutePage1ExampleComponent {
  showFooter: boolean = true;

  constructor() {}

  toggleFooter() {
    this.showFooter = !this.showFooter;
  }
}
