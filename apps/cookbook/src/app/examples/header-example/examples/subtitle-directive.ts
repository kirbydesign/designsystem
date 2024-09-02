import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-header-example-subtitle-directive',
  template: `<kirby-header [title]="'Title'" subtitle1="Subtitle one" subtitle2="Subtitle two">
  <div *kirbyHeaderSubtitle>
    <div>
    subtitle one using directive
    </div>
    <div>
    subtitle two <a href="#">using directive with link</a>
    </div>
  </div>
</kirby-header>`,
  styles: [
    `.custom-flag {
    display: flex;
    align-items: center;
    gap: 6px;
}`,
  ],
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: config.styles,
})
export class HeaderExampleSubtitleDirectiveComponent {
  template: string = config.template;
  styles: string = config.styles.join('\n\n');
}
