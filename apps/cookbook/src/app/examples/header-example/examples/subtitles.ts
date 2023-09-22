import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-header-example-subtitle-list',
  template: `<kirby-header [title]="'Title'" [subtitle1]="['Mrs. Lady Like Tiff Tuff Escargoon Tokkori ', '&', 'Mr. Chef Kawasaki Tokkori']">
</kirby-header>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class HeaderExampleSubtitleListComponent {
  template: string = config.template;
}
