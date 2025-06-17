import { Component } from '@angular/core';
import { RouterOutletModule } from '@kirbydesign/designsystem/router-outlet';
import { SlidesHeightExampleComponent } from './examples/slides-height.component';
import { SlidesSimpleExampleComponent } from './examples/slides-simple.component';
import { SlidesCustomHeadingExampleComponent } from './examples/slides-custom-heading.component';

@Component({
  selector: 'cookbook-slides-example',
  templateUrl: './slides-example.component.html',
  styleUrls: ['../_examples.shared.scss'],
  imports: [
    SlidesHeightExampleComponent,
    SlidesSimpleExampleComponent,
    SlidesCustomHeadingExampleComponent,
    RouterOutletModule,
  ],
})
export class SlidesExampleComponent {}
