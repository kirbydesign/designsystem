import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { DropdownComponent, DropdownModule } from '@kirbydesign/designsystem/dropdown';
import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

@Component({
  selector: 'kirby-button-group',
  standalone: true,
  imports: [CommonModule, DropdownModule],
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss'],
})
export class ButtonGroupComponent implements OnDestroy, AfterViewInit, AfterViewChecked {
  @ViewChild('buttonContainer', { read: ElementRef }) buttonContainer!: ElementRef<HTMLElement>;
  @ViewChild('hiddenButtonContainer', { read: ElementRef })
  hiddenButtonContainer!: ElementRef<HTMLElement>;
  @ViewChild('boundingBox', { read: ElementRef }) boundingBox!: ElementRef<HTMLElement>;
  @ViewChild(DropdownComponent, { read: ElementRef }) dropdown!: ElementRef;

  @ContentChildren(ButtonComponent, { read: ElementRef }) buttons: ElementRef<HTMLButtonElement>[];

  private buttonContainerObserver: IntersectionObserver;
  private hiddenButtonsObserver: IntersectionObserver;
  private visibleContainerObserverOptions;
  private hiddenButtonsObserverOptions;

  constructor(private renderer: Renderer2) {}

  ngAfterViewChecked(): void {
    this.toggleDropdown();
  }

  ngAfterViewInit(): void {
    this.initializeDynamicResizing();
  }

  ngOnDestroy(): void {
    this.buttonContainerObserver.disconnect();
    this.hiddenButtonsObserver.disconnect();
  }

  toggleDropdown() {
    if (!this.hiddenButtonContainer) return;
    if (this.hiddenButtonContainer) {
      if (this.hiddenButtonContainer.nativeElement.childElementCount === 0) {
        this.renderer.setStyle(this.dropdown.nativeElement, 'display', 'none');
      } else {
        this.renderer.setStyle(this.dropdown.nativeElement, 'display', 'block');
      }
    }
  }

  private handleVisibleContainerIntersection = (entries) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.intersectionRatio >= 1.0) {
        return;
      }

      const buttons = this.buttonContainer.nativeElement.querySelectorAll('button');

      if (buttons.length > 0) {
        this.hideLastVisibleButton(buttons);
      }
    });
  };

  private handleHiddenButtonIntersection = (entries) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.intersectionRatio !== 1) return;

      this.showButton(entry.target);
    });
  };

  private hideLastVisibleButton(buttons: NodeListOf<HTMLButtonElement>) {
    const lastVisibleButton = buttons[buttons.length - 1];
    this.hiddenButtonContainer.nativeElement.appendChild(lastVisibleButton);
    this.hiddenButtonsObserver.observe(lastVisibleButton);
  }

  private showButton(button: Element) {
    this.hiddenButtonsObserver.unobserve(button);
    this.renderer.appendChild(this.buttonContainer.nativeElement, button);
  }

  initializeDynamicResizing() {
    this.visibleContainerObserverOptions = {
      root: this.boundingBox.nativeElement,
      /*
       * rootMargin acts like a buffer to avoid buttons being added and removed again infinitely
       * if a buttons edge aligns perfectly with the bounding box. The value is specifically
       * chosen to matches button margin, meaning a button is moved when it aligns perfectly
       * with the edge.
       */
      rootMargin: DesignTokenHelper.size('xxxs'),
      threshold: 1.0,
    };

    this.buttonContainerObserver = new IntersectionObserver(
      this.handleVisibleContainerIntersection,
      this.visibleContainerObserverOptions
    );

    this.hiddenButtonsObserverOptions = {
      root: this.boundingBox.nativeElement,
      threshold: 1.0,
    };

    this.hiddenButtonsObserver = new IntersectionObserver(
      this.handleHiddenButtonIntersection,
      this.hiddenButtonsObserverOptions
    );

    this.buttons.forEach((button) => {
      this.hiddenButtonsObserver.observe(button.nativeElement);
    });

    this.buttonContainerObserver.observe(this.buttonContainer.nativeElement);
  }
}
