import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'kirby-input-icon',
  template: `
    <button kirby-button class="input-icon" [ngClass]="cssClass" size="sm">
      <kirby-icon [name]="icon"></kirby-icon>
    </button>
  `,
  styleUrls: ['./input-icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InputIconComponent {
  @Input() cssClass: string;
  @Input() icon: string;
}
