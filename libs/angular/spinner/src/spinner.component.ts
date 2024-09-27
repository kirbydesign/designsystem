import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'kirby-spinner',
  template: '<ng-content></ng-content>',
  standalone: true,
  imports: [CommonModule],
})
export class KirbySpinnerComponent {}
