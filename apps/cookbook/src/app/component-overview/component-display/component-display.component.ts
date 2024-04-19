import { Component, Input } from '@angular/core';

@Component({
  selector: 'cookbook-component-display',
  templateUrl: './component-display.component.html',
  styleUrls: ['./component-display.component.scss'],
})
export class ComponentDisplayComponent {
  @Input() title: string;
  @Input() paragraph: string;
  @Input() svgPath: string;
  @Input() route: string;
}
