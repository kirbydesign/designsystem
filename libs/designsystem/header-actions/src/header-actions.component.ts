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
  @Input() maxButtons: number;

  @ViewChild(DropdownComponent, { read: ElementRef }) dropdown!: ElementRef;
  @ContentChildren(ButtonComponent, { read: ElementRef }) buttons!: ElementRef<HTMLButtonElement>[];
  @ViewChild('hiddenButtonContainer', { read: ElementRef })
  hiddenButtonContainer!: ElementRef<HTMLElement>;

  hiddenButtons: ElementRef<HTMLButtonElement>;

  dropdownItems = ['Item 1'];

  buttonToDropdownMap = new Map<ElementRef<HTMLButtonElement>, string>();

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    if (this.buttons.length > this.maxButtons) {
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
    this.buttons.forEach((button, index) => {
      if (index > this.maxButtons - 1) {
        this.hiddenButtonContainer.nativeElement.appendChild(button.nativeElement);
      }
    });
  }

  onDropdownItemSelect(item) {
    console.log(item);
  }

  populateDropdown() {
    this.buttons.forEach((button) => {
      console.log(button);
    });
  }
}
