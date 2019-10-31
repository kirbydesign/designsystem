import { Component } from '@angular/core';

const config = {
  selector: 'kirby-item-ex2',
  template: `
    <kirby-item>
        <kirby-label>
            <h3>Title</h3>
        </kirby-label>
        <kirby-value>
            Value
        </kirby-value>
    </kirby-item>
    `,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemTwoColumnsSingleLineComponent {
  template: string = config.template;
}
