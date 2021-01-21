import { Component } from '@angular/core';

import { stringifyPretty } from '~/app/shared/code-viewer/code-viewer.component';

const items = [
  { title: 'Bacon', value: 1, icon: 'menu-outline' },
  { title: 'Salami', value: 1, icon: 'cog' },
  { title: 'Tenderloin', value: 3, icon: 'kirby' },
];

const config = {
  selector: 'cookbook-radio-in-list-example',
  template: `<kirby-radio-group>
  <kirby-list [items]="items">
    <kirby-item *kirbyListItemTemplate="let item">
      <kirby-avatar slot="start" themeColor="light">
        <kirby-icon [name]="item.icon"></kirby-icon>
      </kirby-avatar>
      <kirby-label>{{item.title}}</kirby-label>
      <kirby-radio [value]="item" slot="end"></kirby-radio>
    </kirby-item> 
  </kirby-list>
</kirby-radio-group>`,
  codeSnippet: `items = ${stringifyPretty(items)};`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class RadioInListExampleComponent {
  template: string = config.template;
  codeSnippet: string = config.codeSnippet;

  items = items;
}
