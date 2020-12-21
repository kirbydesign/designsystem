import { Component } from '@angular/core';

@Component({
  selector: 'kirby-inline-footer',
  template: '<ng-content></ng-content>',
  styles: [
    `
      :host {
        display: block;
        margin-top: var(--margin-top, 0px);
        padding: 8px 16px;
      }
    `,
  ],
})
export class InlineFooterComponent {}
