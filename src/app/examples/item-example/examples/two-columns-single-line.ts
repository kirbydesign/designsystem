import { Component } from '@angular/core';

const config = {
  selector: 'kirby-item-ex2',
  template: `
    <kirby-item>
        <kirby-label>
            <font>Title</font>
        </kirby-label>
       <time>12.12.1212</time>
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
