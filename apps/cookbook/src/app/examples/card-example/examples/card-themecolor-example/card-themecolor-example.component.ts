import { Component } from '@angular/core';
import { noop } from 'rxjs';

@Component({
  selector: 'cookbook-card-themecolor-example',
  templateUrl: './card-themecolor-example.component.html',
  styleUrls: ['./card-themecolor-example.component.scss'],
})
export class CardThemecolorExampleComponent {
  noop: () => void = noop;
}
