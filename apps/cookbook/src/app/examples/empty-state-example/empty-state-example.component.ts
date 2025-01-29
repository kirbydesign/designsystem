import { Component } from '@angular/core';
import { EmptyStateMessageTypesExampleComponent } from './examples/message-types';
import { EmptyStateSimpleExampleComponent } from './examples/simple';
import { EmptyStateButtonsExampleComponent } from './examples/buttons';

@Component({
  selector: 'cookbook-empty-state-example',
  templateUrl: './empty-state-example.component.html',
  styleUrls: ['./empty-state-example.component.scss'],
  imports: [
    EmptyStateMessageTypesExampleComponent,
    EmptyStateSimpleExampleComponent,
    EmptyStateButtonsExampleComponent,
  ],
})
export class EmptyStateExampleComponent {}
