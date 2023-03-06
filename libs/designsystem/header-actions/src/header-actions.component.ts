import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { DropdownComponent, DropdownModule } from '@kirbydesign/designsystem/dropdown';

@Component({
  selector: 'kirby-header-actions',
  standalone: true,
  imports: [CommonModule, DropdownModule],
  templateUrl: './header-actions.component.html',
  styleUrls: ['./header-actions.component.scss'],
})
export class HeaderActionsComponent implements AfterViewInit {
  @Input() visibleButtons: number;

  @ViewChild(DropdownComponent, { read: ElementRef }) dropdown!: ElementRef;
  @ContentChildren(ButtonComponent, { read: ElementRef }) buttons!: ElementRef<HTMLButtonElement>[];
  @ViewChild('hiddenButtonContainer', { read: ElementRef })
  hiddenButtonContainer!: ElementRef<HTMLElement>;

  hiddenButtons: ElementRef<HTMLButtonElement>[];

  dropdownItems = [];

  buttonToDropdownMap = new Map<string, ElementRef<HTMLButtonElement>>();

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    if (this.buttons.length > this.visibleButtons) {
      this.hideButtons();
      this.populateDropdown();
      this.toggleDropdown();
    }
  }

  toggleDropdown() {
    if (!this.hiddenButtonContainer) return;
    if (this.hiddenButtonContainer.nativeElement.childElementCount === 0) {
      this.renderer.setStyle(this.dropdown.nativeElement, 'display', 'none');
    } else {
      this.renderer.setStyle(this.dropdown.nativeElement, 'display', 'block');
    }
  }

  hideButtons() {
    this.hiddenButtons = this.buttons.filter((button, index) => {
      if (index > this.visibleButtons - 1) {
        return button;
      }
    });

    this.hiddenButtons.forEach((button) => {
      this.hiddenButtonContainer.nativeElement.appendChild(button.nativeElement);
    });
  }

  onDropdownItemSelect(item) {
    const selectedAction = this.buttonToDropdownMap.get(item);
    if (selectedAction) {
      const evt = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      });

      selectedAction.nativeElement.dispatchEvent(evt);
    }
  }

  populateDropdown() {
    this.hiddenButtons.forEach((button) => {
      const buttonText = button.nativeElement.textContent.trim();
      this.buttonToDropdownMap.set(buttonText, button);
      this.dropdownItems.push(buttonText);
    });
  }
}
