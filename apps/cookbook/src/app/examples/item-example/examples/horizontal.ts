import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-horizontal',
  template: `<kirby-item>
  <kirby-avatar slot="start" overlay="true" imageSrc="/assets/images/woman.png">
    <kirby-badge>
      <kirby-icon name="attach"></kirby-icon>
    </kirby-badge>
  </kirby-avatar>
  <kirby-label>
    <kirby-label direction="horizontal">
      <h3>Lorem ipsum quam notem andamus gepulowitzh onga bonga bimmelon sid est insula</h3>
      <time detail>20.12.2017</time>
    </kirby-label>
    <p>Die Marvin, your papers have arrived and you should be able to sign these within 1 week from today if you follow the instructions below.</p>
  </kirby-label>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemExampleHorizontalComponent {
  template: string = config.template;
}
