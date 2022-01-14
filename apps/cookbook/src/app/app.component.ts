import { Component } from '@angular/core';

@Component({
  selector: 'cookbook-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Kirby design system';
  items: number[] = Array.from(Array(500).keys()).map((i) => (i % 2 ? 50 : 100));
}
