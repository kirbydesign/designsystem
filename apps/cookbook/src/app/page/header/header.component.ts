import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { RouterLink } from '@angular/router';
import { BrandSelectorComponent } from '../../shared/brand/brand-selector.component';
@Component({
  selector: 'cookbook-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [ButtonComponent, IconModule, RouterLink, BrandSelectorComponent],
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
