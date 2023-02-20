import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'kirby-button-group',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>',
  styleUrls: ['./button-group.component.scss'],
})
export class ButtonGroupComponent {}
