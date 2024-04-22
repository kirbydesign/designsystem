import { Component } from '@angular/core';
import { IconSize } from '@kirbydesign/designsystem';

const config = {
  selector: 'cookbook-icon-custom-example',
  template: `
  <div class="icon-item-container">
  <div class="icon-item-inner-container">
    <kirby-icon name="football" title="football"></kirby-icon>
    <span class="icon-item-title">football</span>
  </div>
</div>
<div class="icon-item-container">
  <div class="icon-item-inner-container">
    <kirby-icon name="umbrella" title="umbrella"></kirby-icon>
    <span class="icon-item-title">umbrella</span>
  </div>
</div>`,
  htmlSnippet: `<kirby-icon name="football" title="football"></kirby-icon>
  <kirby-icon name="umbrella" title="umbrella"></kirby-icon>
  `,
  codeSnippet: `import { IconRegistryService } from '@kirbydesign/designsystem';

const customIcons = [
    { 
        name: 'customIconName',
        svg: '[PATH_TO_SVG_FILE]',
    },
    ...
];

@NgModule({ ... })
export class MyModule { 
    constructor(iconRegistryService: IconRegistryService) { 
        iconRegistryService.addIcons(customIcons);
    } 
}`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrl: './shared.scss',
})
export class IconCustomExampleComponent {
  static codeSnippet: string = config.codeSnippet;
  static htmlSnippet: string = config.htmlSnippet;
  sizes = IconSize;
}
