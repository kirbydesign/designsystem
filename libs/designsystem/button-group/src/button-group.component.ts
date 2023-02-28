import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
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
export class ButtonGroupComponent implements AfterViewInit, OnDestroy {
  @ViewChild('buttonContainer', { read: ElementRef }) buttonContainer!: ElementRef<HTMLElement>;
  @ViewChild('hiddenButtonContainer', { read: ElementRef })
  hiddenButtonContainer!: ElementRef<HTMLElement>;
  @ViewChild('boundingBox', { read: ElementRef }) boundingBox!: ElementRef<HTMLElement>;
  @ViewChild(DropdownComponent, { read: ElementRef }) dropdown!: ElementRef;

  @ContentChildren(ButtonComponent, { read: ElementRef }) buttons: ElementRef[];

  private buttonContainerObserver: IntersectionObserver;
  private hiddenButtonsObserver: IntersectionObserver;
  private visibleContainerObserverOptions;
  private hiddenButtonsObserverOptions;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
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

    this.buttonContainerObserver.observe(this.buttonContainer.nativeElement);

    this.buttons.forEach((button) => {
      this.hiddenButtonsObserver.observe(button.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.buttonContainerObserver.disconnect();
    this.hiddenButtonsObserver.disconnect();
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

      const buttons = this.hiddenButtonContainer.nativeElement.querySelectorAll('button');
      if (buttons.length < 1) return;

      // we are about to show the last hidden button, hide dropdown
      if (buttons.length === 1) {
        this.dropdown.nativeElement.style.display = 'none';
      }

      this.showButton(entry.target);
    });
  };

  private hideLastVisibleButton(buttons: NodeListOf<HTMLButtonElement>) {
    const lastVisibleButton = buttons[buttons.length - 1];
    // TODO: determine if we want renderer2 here instead (and make our own small prepend implementation?)
    this.hiddenButtonContainer.nativeElement.prepend(lastVisibleButton);
    this.hiddenButtonsObserver.observe(lastVisibleButton);
    this.dropdown.nativeElement.style.display = 'block';
  }

  private showButton(button: Element) {
    this.hiddenButtonsObserver.unobserve(button);
    this.renderer.appendChild(this.buttonContainer.nativeElement, button);
  }
}
