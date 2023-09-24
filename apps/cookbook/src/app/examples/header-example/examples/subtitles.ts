import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-header-example-subtitle-list',
  template: `<kirby-header [title]="'Title'" [subtitle1]="['Mrs. Lady Like Tiff Tuff Escargoon Tokkori', '&', 'Mr. Chef Kawasaki Tokkori']">
</kirby-header>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: [
    `
      :host {
        border: 1px dashed var(--kirby-medium);
        margin: 12px;
        /* white triangle at lower right corner to emphasize drag handle */
        background: linear-gradient(135deg, transparent 0, transparent 95%, #fff 96%);
        display: block;
        overflow: hidden;
        width: 620px;
        max-width: 100%;
        resize: horizontal;
      }
    `,
  ],
})
export class HeaderExampleSubtitleListComponent {
  template: string = config.template;
}
