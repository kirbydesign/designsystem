import { Component } from '@angular/core';

import { BasePageExampleComponent } from '../base-page-example.component';

const fieldsetHtml = `
  <fieldset>
    <legend>Max Width</legend>
    <select (change)="onMaxWidthChange($event.target.value)">
      <option
        *ngFor="let option of maxWidthOptions"
        value="{{ option.value }}"
        [attr.selected]="maxWidthOptions === option.value ? true : null"
      >
        {{ option.text }}
      </option>
    </select>
  </fieldset>
  <br />
`;

const config = {
  template: `<kirby-page title="Content Width" defaultBackHref="/" [maxWidth]="maxWidth">
  <kirby-page-content>${fieldsetHtml}
    <div [innerHTML]="content"></div>
  </kirby-page-content>
</kirby-page>`,
};
@Component({
  template: config.template,
})
export class PageContentWidthExampleComponent extends BasePageExampleComponent {
  static readonly template = config.template
    .replace(' defaultBackHref="/"', '')
    .replace(fieldsetHtml, '')
    .replace('<div [innerHTML]="content"></div>', '...');

  maxWidth: string = '';

  maxWidthOptions = [
    {
      text: 'default',
      value: 'default',
    },
    {
      text: 'optimized',
      value: 'optimized',
    },
    {
      text: 'full',
      value: 'full',
    },
  ];

  onMaxWidthChange(value) {
    this.maxWidth = value;
  }
}
