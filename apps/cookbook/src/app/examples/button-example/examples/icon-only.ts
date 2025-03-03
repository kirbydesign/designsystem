import { Component } from '@angular/core';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IconModule } from '@kirbydesign/designsystem/icon';

const config = {
  selector: 'cookbook-button-example-icon-only',
  template: `<button kirby-button size="xs" aria-label="Close">
  <kirby-icon name="close"></kirby-icon>
</button>
<button kirby-button size="sm" aria-label="Close">
  <kirby-icon name="close"></kirby-icon>
</button>
<button kirby-button aria-label="Close">
  <kirby-icon name="close"></kirby-icon>
</button>
<button kirby-button size="lg" aria-label="Close">
  <kirby-icon name="close"></kirby-icon>
</button>

<button kirby-button size="xs" attentionLevel="2" [showIconOnly]="true">
  Search
  <kirby-icon name="search"></kirby-icon>
</button>
<button kirby-button size="sm" attentionLevel="2" [showIconOnly]="true">
  Search
  <kirby-icon name="search"></kirby-icon>
</button>
<button kirby-button attentionLevel="2" [showIconOnly]="true">
  <kirby-icon name="search"></kirby-icon>
  Search
</button>
<button kirby-button size="lg" attentionLevel="2" [showIconOnly]="true">
  <kirby-icon name="search"></kirby-icon>
  Search
</button>

<button kirby-button size="xs" attentionLevel="3" aria-label="More settings">
  <kirby-icon name="more"></kirby-icon>
</button>
<button kirby-button size="sm" attentionLevel="3" aria-label="More settings">
  <kirby-icon name="more"></kirby-icon>
</button>
<button kirby-button attentionLevel="3" aria-label="More settings">
  <kirby-icon name="more"></kirby-icon>
</button>
<button kirby-button size="lg" attentionLevel="3" aria-label="More settings">
  <kirby-icon name="more"></kirby-icon>
</button>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrl: './_grid-layout.scss',
  imports: [ButtonComponent, IconModule],
})
export class ButtonExampleIconOnlyComponent {
  template: string = config.template;
}
