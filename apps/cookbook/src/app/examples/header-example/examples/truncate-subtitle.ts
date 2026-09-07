import { Component } from '@angular/core';
import { HeaderComponent } from '@kirbydesign/designsystem/header';

const config = {
  selector: 'cookbook-header-example-truncate-subtitle',
  template: `      <kirby-header
        title="Title"
        subtitle1="A long subtitle that should be truncated with ellipsis instead of wrapping to the next line. A long subtitle that should be truncated with ellipsis instead of wrapping to the next line. A long subtitle that should be truncated with ellipsis instead of wrapping to the next line."
        subtitle2="Second subtitle also truncated when too long for the available width. Second subtitle also truncated when too long for the available width. Second subtitle also truncated when too long for the available width."
        [truncateSubtitle]="true"
      ></kirby-header>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [HeaderComponent],
})
export class HeaderExampleTruncateSubtitleComponent {
  template: string = config.template;
}
