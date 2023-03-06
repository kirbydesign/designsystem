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
  @Input() visibleActions: number;

  @ViewChild(DropdownComponent, { read: ElementRef }) dropdown!: ElementRef;
  @ContentChildren(ButtonComponent, { read: ElementRef }) buttons!: ElementRef<HTMLButtonElement>[];
  @ViewChild('hiddenLayer', { read: ElementRef }) hiddenLayer!: ElementRef<HTMLElement>;

  hiddenButtons: ElementRef<HTMLButtonElement>[];
  collapsedActions: string[] = [];
  dropdownTextToButtonMap = new Map<string, ElementRef<HTMLButtonElement>>();

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    if (this.buttons.length > this.visibleActions) {
      this.hideButtons();
      this.populateDropdown();
      this.toggleDropdown();
    }
  }

  toggleDropdown() {
    if (!this.hiddenLayer) return;
    if (this.hiddenLayer.nativeElement.childElementCount === 0) {
      this.renderer.setStyle(this.dropdown.nativeElement, 'display', 'none');
    } else {
      this.renderer.setStyle(this.dropdown.nativeElement, 'display', 'block');
    }
  }

  hideButtons() {
    this.hiddenButtons = this.buttons.filter((button, index) => {
      if (index > this.visibleActions - 1) {
        return button;
      }
    });

    this.hiddenButtons.forEach((button) => {
      this.hiddenLayer.nativeElement.appendChild(button.nativeElement);
    });
  }

  onDropdownActionSelect(item) {
    const selectedAction = this.dropdownTextToButtonMap.get(item);
    if (selectedAction) {
      const event = new PointerEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      });

      selectedAction.nativeElement.dispatchEvent(event);
    }
  }

  populateDropdown() {
    this.hiddenButtons.forEach((button) => {
      const buttonText = button.nativeElement.textContent.trim();
      this.dropdownTextToButtonMap.set(buttonText, button);
      this.collapsedActions.push(buttonText);
    });
  }
}
