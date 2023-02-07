import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-header-example-actions',
  template: `
  <kirby-header>
    <ng-container *kirbyHeaderTitle>Title</ng-container>
    <ng-container *kirbyHeaderSubtitle1>Subtitle one</ng-container>
    <ng-container *kirbyHeaderSubtitle2>Subtitle two</ng-container>
    <ng-container *kirbyHeaderActions>
      <button kirby-button>
        <kirby-icon name="edit"></kirby-icon>
        Action 1
      </button>
      <button kirby-button attentionLevel="3">Action 2</button>
      <button kirby-button attentionLevel="3">
        <kirby-icon name="more"></kirby-icon>
      </button>
    </ng-container>
  </kirby-header>
  `,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class HeaderExampleActionsComponent {
  template: string = config.template;
}
