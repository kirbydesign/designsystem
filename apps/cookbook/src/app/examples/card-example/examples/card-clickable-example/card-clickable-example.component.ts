import { Component } from '@angular/core';
import { noop } from 'rxjs';

@Component({
  selector: 'cookbook-card-clickable-example',
  templateUrl: './card-clickable-example.component.html',
  styleUrls: ['./card-clickable-example.component.scss'],
})
export class CardClickableExampleComponent {
  noop: () => void = noop;
}
