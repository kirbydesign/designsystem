import { Component } from '@angular/core';
import { SimpleSlideButtonExampleComponent } from './examples/simple';
import { ExpandBlockSlideButtonExampleComponent } from './examples/expand-block';

@Component({
  selector: 'cookbook-slide-button-example',
  templateUrl: './slide-button-example.component.html',
  styleUrl: './slide-button-example.component.scss',
  imports: [SimpleSlideButtonExampleComponent, ExpandBlockSlideButtonExampleComponent],
})
export class SlideButtonExampleComponent {}
