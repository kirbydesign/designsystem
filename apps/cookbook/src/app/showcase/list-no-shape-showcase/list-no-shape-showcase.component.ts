import { Component } from '@angular/core';

@Component({
  selector: 'cookbook-list-no-shape-showcase',
  templateUrl: './list-no-shape-showcase.component.html',
})
export class ListNoShapeShowcaseComponent {
  exampleHtml: string =
    require('!raw-loader!../../examples/list-no-shape-example/list-no-shape-example.component.html')
      .default;
}
