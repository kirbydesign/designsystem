import { Component } from '@angular/core';
import { SlidesHeightExampleComponent } from './examples/height';
import { SlidesSimpleExampleComponent } from './examples/simple';
import { SlidesCustomHeadingExampleComponent } from './examples/custom-heading';

@Component({
  selector: 'cookbook-slides-example',
  templateUrl: './slides-example.component.html',
  styleUrls: ['../_examples.shared.scss'],
  imports: [
    SlidesHeightExampleComponent,
    SlidesSimpleExampleComponent,
    SlidesCustomHeadingExampleComponent,
  ],
})
export class SlidesExampleComponent {}
