import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-flag-example-colors',
  template: `<kirby-flag themeColor="success">Success</kirby-flag>
<kirby-flag themeColor="warning">Warning</kirby-flag>
<kirby-flag themeColor="danger">Danger</kirby-flag>
<kirby-flag themeColor="semi-light">Semi-Light</kirby-flag>
<kirby-flag themeColor="transparent" title="(default)">Transparent</kirby-flag>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./flag-examples.shared.scss'],
})
export class FlagExampleColorsComponent {
  template: string = config.template;
}
