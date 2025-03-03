import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardModule } from '@kirbydesign/designsystem/card';

@Component({
  selector: 'cookbook-component-display',
  templateUrl: './component-display.component.html',
  styleUrls: ['./component-display.component.scss'],
  imports: [RouterLink, CardModule],
})
export class ComponentDisplayComponent {
  @Input() title: string;
  @Input() paragraph: string;
  @Input() svgPath: string;
  @Input() route: string;
}
