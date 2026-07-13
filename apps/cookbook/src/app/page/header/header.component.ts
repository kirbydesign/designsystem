import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { RouterLink } from '@angular/router';
import { KirbyTooltipElement } from '@kirbydesign/core/tooltip';
import { KirbyPopoverElement } from '@kirbydesign/core/popover';

@Component({
  selector: 'cookbook-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [ButtonComponent, IconModule, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderComponent {
  constructor() {
    KirbyPopoverElement.define();
    KirbyTooltipElement.define();
  }
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
