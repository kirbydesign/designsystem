import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-link-example-trailing-icon',
  template: `<a class="trailing-icon-example" target="_blank" href="https://github.com/kirbydesign/designsystem">Trailing icon</a>`,
  style: `@use '@kirbydesign/core/src/scss/utils';
.trailing-icon-example
{
@include utils.trailing-icon("navigation")
/* 
@include utils.trailing-icon("https://cdn.jsdelivr.net/npm/open-iconic@1.1.1/svg/heart.svg")
*/
}`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./link-examples.shared.scss'],
})
export class LinkExampleTrailingIconComponent {
  template: string = config.template;
  style: string = config.style;
}
