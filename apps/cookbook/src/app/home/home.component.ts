import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../page/header/header.component';
import { SideNavComponent } from '../page/side-nav/side-nav.component';
import { FooterComponent } from '../page/footer/footer.component';

@Component({
  selector: 'cookbook-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [HeaderComponent, SideNavComponent, RouterOutlet, FooterComponent],
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
