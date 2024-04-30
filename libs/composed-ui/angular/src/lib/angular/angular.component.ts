import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'kirby-angular',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './angular.component.html',
  styleUrl: './angular.component.css',
})
export class AngularComponent {
  testObject: { id: number } = { id: 0 };
}
