import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'cookbook-popover-example',
  templateUrl: './popover-example.component.html',
})
export class PopoverExampleComponent {
  @ViewChild('trigger') triggerElement: ElementRef<HTMLElement>;
  @ViewChild('arrow') arrowElement: ElementRef<HTMLElement>;

  isOpen = false;

  open() {
    this.isOpen = true;
  }
  close() {
    this.isOpen = false;
  }
  isNestedOpen = false;
  openNested() {
    this.isNestedOpen = true;
  }
  didPresent() {
    // TODO: Fix setTimeout
    setTimeout(() => {
      const triggerElement = this.triggerElement.nativeElement;
      const arrowElement = this.arrowElement.nativeElement;
      const modalWrapperElement = triggerElement.closest('ion-modal').querySelector('.ion-page');

      const triggerRect = triggerElement.getBoundingClientRect();
      const arrowRect = arrowElement.getBoundingClientRect();
      const wrapperRect = modalWrapperElement.getBoundingClientRect();

      const popoverWidth = 320;

      // Placement relative to modal
      const translateX = wrapperRect.width / 2 + popoverWidth / 2;

      // Placement relative to trigger
      const translateXForTrigger = triggerRect.x + triggerRect.width;

      // Css varible is place on body
      document.body.style.setProperty('--kirby-popover-trans-x', `${translateXForTrigger}px`);

      arrowElement.style.top = `${
        triggerRect.y -
        arrowRect.y +
        (triggerRect.height - arrowRect.height) / 2 +
        parseInt(arrowElement.style.top.replace('px', ''))
      }px`;
    });
  }
  closeNested() {
    this.isNestedOpen = false;
  }
}
