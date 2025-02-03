import { Component } from '@angular/core';
import { ButtonExampleDefaultComponent } from './examples/default';
import { ButtonExampleAttentionLevelComponent } from './examples/attention-level';
import { ButtonExampleSizesComponent } from './examples/sizes';
import { ButtonExampleBlockComponent } from './examples/block';
import { ButtonExampleIconsComponent } from './examples/icons';
import { ButtonExampleIconOnlyComponent } from './examples/icon-only';
import { ButtonExampleUndecoratedComponent } from './examples/undecorated';
import { ButtonExampleDisabledComponent } from './examples/disabled';
import { ButtonExampleAriaDisabledComponent } from './examples/aria-disabled';
import { ButtonExampleLinkComponent } from './examples/link';

@Component({
  selector: 'cookbook-button-example',
  templateUrl: './button-example.component.html',
  styleUrls: ['../_examples.shared.scss'],
  imports: [
    ButtonExampleDefaultComponent,
    ButtonExampleAttentionLevelComponent,
    ButtonExampleSizesComponent,
    ButtonExampleBlockComponent,
    ButtonExampleIconsComponent,
    ButtonExampleIconOnlyComponent,
    ButtonExampleUndecoratedComponent,
    ButtonExampleDisabledComponent,
    ButtonExampleAriaDisabledComponent,
    ButtonExampleLinkComponent,
  ],
})
export class ButtonExampleComponent {}
