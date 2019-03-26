import { Component, Input } from '@angular/core';

@Component({
  selector: 'kirby-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  @Input() name? = 'happy';
  @Input() size? = 'small';
  @Input() src?;
}
