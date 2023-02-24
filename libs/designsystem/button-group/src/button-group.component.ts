import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  OnDestroy,
  QueryList,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { DropdownComponent, DropdownModule } from '@kirbydesign/designsystem/dropdown';

@Component({
  selector: 'kirby-button-group',
  standalone: true,
  imports: [CommonModule, DropdownModule],
  template: `
    <div class="bounding-box" #boundingBox>
      <div class="hidden-buttons" #hiddenButtons><ng-content></ng-content></div>
      <div class="visible-buttons" #visibleButtons></div>
      <kirby-dropdown
        [items]="['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']"
        popout="left"
        [usePopover]="true"
      ></kirby-dropdown>
    </div>
  `,
  styleUrls: ['./button-group.component.scss'],
})
export class ButtonGroupComponent implements AfterViewInit, OnDestroy {
  @ContentChildren(ButtonComponent, { read: ElementRef }) children!: QueryList<
    ElementRef<HTMLElement>
  >;
  @ViewChild('visibleButtons', { read: ElementRef }) visibleButtons!: ElementRef<HTMLElement>;
  @ViewChild('hiddenButtons', { read: ElementRef }) hiddenButtons!: ElementRef<HTMLElement>;
  @ViewChild('boundingBox', { read: ElementRef }) boundingBox!: ElementRef<HTMLElement>;
  @ViewChild(DropdownComponent, { read: ElementRef }) dropdown!: ElementRef;

  @ContentChildren(ButtonComponent, { read: ElementRef }) buttons!: ElementRef[];

  private visibleButtonsObserver: IntersectionObserver;
  private hiddenButtonsObserver: IntersectionObserver;
  private visibleButtonsObserverOptions;
  private hiddenButtonsObserverOptions;

  constructor(private renderer: Renderer2) {}

  ngOnDestroy(): void {
    this.visibleButtonsObserver.disconnect();
  }

  ngAfterViewInit(): void {
    this.visibleButtonsObserverOptions = {
      root: this.boundingBox.nativeElement,
      rootMargin: '0px',
      threshold: 1.0,
    };

    this.visibleButtonsObserver = new IntersectionObserver(
      this.hideLastVisibleChild,
      this.visibleButtonsObserverOptions
    );

    this.hiddenButtonsObserverOptions = {
      root: this.boundingBox.nativeElement,
      rootMargin: '0px',
      threshold: 1.0,
    };

    this.hiddenButtonsObserver = new IntersectionObserver(
      this.showFirstHiddenChild,
      this.hiddenButtonsObserverOptions
    );

    this.visibleButtonsObserver.observe(this.visibleButtons.nativeElement);

    this.buttons.forEach((button) => {
      this.hiddenButtonsObserver.observe(button.nativeElement);
    });
  }

  hideLastVisibleChild = (entries) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      console.log('hideLastVisibleChild called');
      if (entry.intersectionRatio < 1) {
        console.log('hiding child');

        //this.dropdown.nativeElement.style.display = 'block';
        const buttons = this.visibleButtons.nativeElement.querySelectorAll('button');

        if (buttons.length > 0) {
          const buttonElement = buttons[buttons.length - 1];
          this.renderer.appendChild(this.hiddenButtons.nativeElement, buttonElement);
          this.hiddenButtonsObserver.observe(buttonElement);
        }
      }
    });
  };

  showFirstHiddenChild = (entries) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      console.log('showFirstHiddenChild called', entry);

      if (entry.intersectionRatio === 1) {
        console.log('showing child');

        const buttons = this.hiddenButtons.nativeElement.querySelectorAll('button');

        this.hiddenButtonsObserver.unobserve(entry.target);

        if (buttons.length > 0) {
          this.renderer.appendChild(this.visibleButtons.nativeElement, entry.target);
        }
      }
    });
  };
}
