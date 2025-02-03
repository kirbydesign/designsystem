import { Component } from '@angular/core';
import { IconDefaultExampleComponent } from './examples/default';
import { IconSizesExampleComponent } from './examples/sizes';
import { IconCustomExampleComponent } from './examples/custom';

@Component({
  selector: 'cookbook-icon-example',
  templateUrl: './icon-example.component.html',
  styleUrls: ['./icon-example.component.scss'],
  imports: [IconDefaultExampleComponent, IconSizesExampleComponent, IconCustomExampleComponent],
})
export class IconExampleComponent {}
