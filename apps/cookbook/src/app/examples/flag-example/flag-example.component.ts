import { Component } from '@angular/core';
import { FlagExampleColorsComponent } from './examples/colors';
import { FlagExampleSizesComponent } from './examples/sizes';

@Component({
  selector: 'cookbook-flag-example',
  templateUrl: './flag-example.component.html',
  styleUrls: ['./flag-example.component.scss'],
  imports: [FlagExampleColorsComponent, FlagExampleSizesComponent],
})
export class FlagExampleComponent {}
