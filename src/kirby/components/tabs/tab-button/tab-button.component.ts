import { Component, Input } from '@angular/core';

@Component({
  selector: 'kirby-tab-button',
  templateUrl: './tab-button.component.html',
  styleUrls: ['./tab-button.component.scss'],
})
export class TabButtonComponent {
  @Input() routerLink: string;
}
