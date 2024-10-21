import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-button-example-icon-only',
  template: `<button kirby-button size="xs">
  <kirby-icon name="close"></kirby-icon>
</button>
<button kirby-button size="sm">
  <kirby-icon name="close"></kirby-icon>
</button>
<button kirby-button>
  <kirby-icon name="close"></kirby-icon>
</button>
<button kirby-button size="lg">
  <kirby-icon name="close"></kirby-icon>
</button>

<button kirby-button size="xs" attentionLevel="2">
  <kirby-icon name="search"></kirby-icon>
</button>
<button kirby-button size="sm" attentionLevel="2">
  <kirby-icon name="search"></kirby-icon>
</button>
<button kirby-button attentionLevel="2">
  <kirby-icon name="search"></kirby-icon>
</button>
<button kirby-button size="lg" attentionLevel="2">
  <kirby-icon name="search"></kirby-icon>
</button>

<button kirby-button size="xs" attentionLevel="3" [showIconOnly]="true">
  More settings
  <kirby-icon name="more"></kirby-icon>
</button>
<button kirby-button size="sm" attentionLevel="3" [showIconOnly]="true">
  More settings
  <kirby-icon name="more"></kirby-icon>
</button>
<button kirby-button attentionLevel="3" [showIconOnly]="true">
  <kirby-icon name="more"></kirby-icon>
  More settings
</button>
<button kirby-button size="lg" attentionLevel="3" [showIconOnly]="true">
  <kirby-icon name="more"></kirby-icon>
  More settings
</button>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrl: './_grid-layout.scss',
})
export class ButtonExampleIconOnlyComponent {
  template: string = config.template;
}
