import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'cookbook-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() isMenuOpen = false;
  @Output() menuToggle = new EventEmitter<boolean>();

  get menuIcon(): string {
    return this.isMenuOpen ? 'close' : 'navigation';
  }

  onToggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.menuToggle.emit(this.isMenuOpen);
  }
}
