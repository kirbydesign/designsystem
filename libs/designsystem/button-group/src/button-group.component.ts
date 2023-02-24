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
    <div class="collider" #boundingBox>
      <div class="button-container" #buttonContainer>
        <ng-content></ng-content>
      </div>
      <kirby-dropdown
        [items]="['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']"
        popout="left"
        [usePopover]="true"
        class="hide"
      ></kirby-dropdown>
    </div>
  `,
  styleUrls: ['./button-group.component.scss'],
})
export class ButtonGroupComponent implements AfterViewInit, OnDestroy {
  @ContentChildren(ButtonComponent, { read: ElementRef }) children!: QueryList<
    ElementRef<HTMLElement>
  >;
  @ViewChild('buttonContainer', { read: ElementRef }) buttonContainer!: ElementRef<HTMLElement>;
  @ViewChild('boundingBox', { read: ElementRef }) boundingBox!: ElementRef<HTMLElement>;
  @ViewChild(DropdownComponent, { read: ElementRef }) dropdown!: ElementRef;

  private observer;
  private observerOptions;

  constructor(private renderer: Renderer2) {}

  ngOnDestroy(): void {
    this.observer.disconnect();
  }

  ngAfterViewInit(): void {
    this.observerOptions = {
      root: this.boundingBox.nativeElement,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(this.removeLastChild, this.observerOptions);

    observer.observe(this.buttonContainer.nativeElement);
  }

  removeLastChild = (entries) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.intersectionRatio < 1) {
        console.log('intersecting');

        this.dropdown.nativeElement.style.display = 'block';

        const buttons = this.buttonContainer.nativeElement.querySelectorAll('button');

        if (buttons.length > 0)
          this.renderer.removeChild(
            this.buttonContainer.nativeElement,
            buttons[buttons.length - 1]
          );
      }
    });
  };
}
