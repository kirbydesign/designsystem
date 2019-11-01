import { Component } from '@angular/core';

const config = {
  selector: 'kirby-item-ex14',
  template: `
  <kirby-item>
  <kirby-avatar overlay="true" slot="start">
    <kirby-icon name="cog"></kirby-icon>
    <kirby-badge>
      <kirby-icon name="attach"></kirby-icon>
    </kirby-badge>
  </kirby-avatar>
  <kirby-label expand>
    <h3>Køb af bolig fordi jeg</h3>
    <time>i dag</time>
  </kirby-label>
  <kirby-label>
    <p>Hey Marvin, så er der nye papire klar til
      underskrift, men du skal lige kigge</p>
  </kirby-label>
</kirby-item>
    `,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemThreeColumnsWithNoteComponent {
  template: string = config.template;
}
