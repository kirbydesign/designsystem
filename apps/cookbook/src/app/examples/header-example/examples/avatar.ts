import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-header-example-avatar',
  template: `
  <kirby-header [centered]="true">
    <kirby-avatar *kirbyHeaderAvatar avatar size="lg" text="A" title="lg"></kirby-avatar>
    <ng-container *kirbyHeaderTitle>Title</ng-container>
    <ng-container *kirbyHeaderSubtitle1>Subtitle one</ng-container>
    <ng-container *kirbyHeaderSubtitle2>Subtitle two</ng-container>
  </kirby-header>
  `,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class HeaderExampleAvatarComponent {
  template: string = config.template;
}
