import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { DropdownComponent, DropdownModule } from '@kirbydesign/designsystem/dropdown';

// // eslint-disable-next-line
// @Directive({ selector: '[buttonGroupElement]' })
// export class ButtonGroupElementDirective {}

@Component({
  selector: 'kirby-button-group',
  standalone: true,
  imports: [CommonModule, DropdownModule],
  template: `
    <div class="button-container" #buttonContainer>
      <ng-content></ng-content>
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
export class ButtonGroupComponent implements AfterContentInit, AfterViewInit {
  @ContentChildren(ButtonComponent, { read: ElementRef }) children!: ElementRef[];
  @ViewChild('buttonContainer', { read: ElementRef }) buttonContainer!: ElementRef;
  @ViewChild(DropdownComponent, { read: ElementRef }) dropdown!: ElementRef;

  private observerOptions;

  ngAfterContentInit(): void {
    console.log(this.children);
  }

  ngAfterViewInit(): void {
    console.log(this.buttonContainer);

    this.observerOptions = {
      root: this.buttonContainer.nativeElement,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(this.callback, this.observerOptions);

    this.children.forEach((button) => {
      observer.observe(button.nativeElement);
    });
  }

  callback = (entries) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.intersectionRatio < 1) {
        (entry.target as HTMLElement).style.visibility = 'hidden';
        this.dropdown.nativeElement.style.display = 'block';
      }
      if (entry.intersectionRatio === 1) {
        (entry.target as HTMLElement).style.visibility = 'visible';
      }
    });
  };
}
