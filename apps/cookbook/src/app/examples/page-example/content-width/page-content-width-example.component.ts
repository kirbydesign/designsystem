import { Component } from '@angular/core';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';
const getMaxWidth = DesignTokenHelper.pageContentMaxWidth;

import { BasePageExampleComponent } from '../base-page-example.component';

const fieldsetHtml = `
  <fieldset>
    <legend>Max Width</legend>
    <kirby-dropdown
      [items]="maxWidthOptions"
      [selectedIndex]="0"
      size="sm"
      (change)="onMaxWidthChange($event.value)">
      <kirby-item
        *kirbyListItemTemplate="let item; let selected = selected; let focused = focused"
        selectable="true"
        [selected]="selected"
        [class.focused]="focused"
      >
        <kirby-label>
          <h3>{{ item.text }}</h3>
          <code detail *ngIf="item.value !== 'default'">maxWidth="{{item.value}}"</code>
        </kirby-label>
        <kirby-label slot="end">
          <data detail>{{ item.width }}</data>
        </kirby-label>
      </kirby-item>
    </kirby-dropdown>
  </fieldset>
`;

const config = {
  template: `<kirby-page title="Content Width" [maxWidth]="maxWidth">
  <kirby-page-content>${fieldsetHtml}
    <div [innerHTML]="content"></div>
  </kirby-page-content>
</kirby-page>`,
};
@Component({
  template: config.template,
  styles: [
    `
      fieldset {
        margin-bottom: 16px;
      }
    `,
  ],
})
export class PageContentWidthExampleComponent extends BasePageExampleComponent {
  static readonly template = config.template
    .replace(fieldsetHtml, '')
    .replace('<div [innerHTML]="content"></div>', '...');

  maxWidthOptions = [
    {
      text: 'Default',
      value: 'default',
      width: getMaxWidth('default'),
    },
    {
      text: 'Large',
      value: 'lg',
      width: getMaxWidth('lg'),
    },
    {
      text: 'X-Large',
      value: 'xl',
      width: getMaxWidth('xl'),
    },
    {
      text: 'Full',
      value: 'full',
      width: getMaxWidth('full'),
    },
  ];

  maxWidth: string = this.maxWidthOptions[0].value;

  onMaxWidthChange(value: string) {
    this.maxWidth = value;
  }
}
