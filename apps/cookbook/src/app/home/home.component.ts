import { Component } from '@angular/core';

@Component({
  selector: 'cookbook-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  title = 'Kirby Design System';
  isMenuOpen = false;

  onMenuClick() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onMenuToggle(isOpen: boolean) {
    this.isMenuOpen = isOpen;
  }
}
