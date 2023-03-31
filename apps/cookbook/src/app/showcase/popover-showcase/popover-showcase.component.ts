import { Component } from '@angular/core';

import exampleHtml from '../../examples/divider-example/divider-example.component.html?raw';

@Component({
  selector: 'cookbook-popover-showcase',
  templateUrl: './popover-showcase.component.html',
})
export class PopoverShowcaseComponent {
  exampleHtml = exampleHtml;
}
