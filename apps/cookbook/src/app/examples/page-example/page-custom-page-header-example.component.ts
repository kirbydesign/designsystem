import { Component } from '@angular/core';

import { ActionSheetConfig, ModalController } from '@kirbydesign/designsystem';

import { BasePageExampleComponent } from './base-page-example.component';

const config = {
  template: `<kirby-page defaultBackHref="/">
  <kirby-page-actions *kirbyPageActions="{stickyOnly: true, stickyTarget: buttonGroup }">
    <button kirby-button (click)="showActionSheet()">
      <kirby-icon name="more"></kirby-icon>
    </button>
  </kirby-page-actions>
  <div *kirbyPageToolbarTitle>
    <div style="display: flex; justify-content: center; align-items: center;">
      Privatkonto
      <kirby-icon name="arrow-down"></kirby-icon>
    </div>
    <div style="font-weight: normal; font-size: 12px">Til rådighed: 85.000,00</div>
  </div>
  <kirby-page-header>
    <h1 kirbyPageTitle style="display: flex">Privatkonto <kirby-icon name="arrow-down"></kirby-icon></h1>
    <h2>25.000,00</h2>
    <h3>Til rådighed 85.000,00</h3>
    <div class="button-group" #buttonGroup>
      <button kirby-button size="sm">
        <kirby-icon name="swap"></kirby-icon>
        Overfør
      </button>
      <button kirby-button size="sm" attentionLevel="3">
        <kirby-icon name="search"></kirby-icon>
        Søg
      </button>
      <button kirby-button size="sm" attentionLevel="3">
        <kirby-icon name="edit"></kirby-icon>
        Omdøb
      </button>
    </div>
  </kirby-page-header>
  <kirby-page-content>
    <div [innerHTML]="content"></div>
  </kirby-page-content>
</kirby-page>`,
};
@Component({
  template: config.template,
  styles: [
    `
      :host {
        background-color: white;
        /* background-image: url('https://images.unsplash.com/photo-1496737018672-b1a6be2e949c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80'); */
      }

      h1,
      h2,
      h3 {
        margin: 0;
      }

      h1 {
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
      }

      h2 {
        font-size: 32px;
        font-weight: 900;
      }

      h3 {
        font-size: 14px;
        font-weight: 400;
      }
    `,
  ],
})
export class PageCustomPageHeaderExampleComponent extends BasePageExampleComponent {
  static readonly template = config.template
    .replace(' defaultBackHref="/"', '')
    .replace('<div [innerHTML]="content"></div>', '...');

  constructor(private modalController: ModalController) {
    super();
  }

  showActionSheet() {
    const config: ActionSheetConfig = {
      header: 'Your action sheet header',
      subheader: 'Your action sheet subheader',
      items: [
        { id: '1', text: 'Option 1' },
        { id: '2', text: 'Option 2' },
        { id: '3', text: 'Option 3' },
      ],
      cancelButtonText: 'Custom cancel',
    };
    this.modalController.showActionSheet(config);
  }
}
