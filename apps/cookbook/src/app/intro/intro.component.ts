import { Component } from '@angular/core';
import { KirbyModule } from '@kirbydesign/designsystem';

@Component({
  selector: 'cookbook-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  imports: [KirbyModule],
})
export class IntroComponent {
  items = [{}, {}];
  hoverItems = [{}, { state: 'hover' }];
  activeItems = [{}, { state: 'active' }];
  focusItems = [{}, { state: 'focus' }];
}
