import { Component } from '@angular/core';
declare var require: any;

@Component({
  selector: 'cookbook-layout-recipes',
  templateUrl: './layout-recipes.component.html',
  styleUrls: ['./layout-recipes.component.scss'],
})
export class LayoutRecipesComponent {
  exampleHtml: string = require('!raw-loader!../examples/grid-layout-example/grid-layout-core-example/grid-layout-core-example.component.html')
    .default;
}
