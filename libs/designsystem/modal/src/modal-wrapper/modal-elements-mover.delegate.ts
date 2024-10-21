import { ElementRef, Renderer2 } from '@angular/core';

/*
  The ModalWrapperComponent class was growing large. 

  Hence the functions responsible for moving modal elements around 
  has been encapsulated in this class. 
*/

export class ModalElementsMoverDelegate {
  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef<HTMLElement>
  ) {}

  public addFooter(footerElementRef: ElementRef<HTMLElement>) {
    // Move the footer next to ion-content
    this.moveChild(footerElementRef, this.elementRef);
  }

  public removeFooter(footerElementRef: ElementRef<HTMLElement>) {
    this.removeChild(footerElementRef);
  }

  public addPageProgress(
    pageProgressElementRef: ElementRef<HTMLElement>,
    ionToolbarElement: ElementRef<HTMLIonToolbarElement>
  ) {
    this.moveChild(pageProgressElementRef, ionToolbarElement);
  }

  public removePageProgress(pageProgressElementRef: ElementRef<HTMLElement>) {
    this.removeChild(pageProgressElementRef);
  }

  /* 
     contentTitleElement & ionTitleElement has to be passed
     as arguments to the method; not part of the constructor, as they 
     might reference completely different elements between calls. 

     For example in a multi-page routed modal where the elements are destroyed 
     and recreated.
  */
  public addTitle(
    titleElementRef: ElementRef<HTMLElement>,
    contentTitleElement: ElementRef<HTMLElement>,
    hasCollapsibleTitle: boolean,
    ionTitleElement: ElementRef<HTMLIonTitleElement>
  ) {
    this.moveChild(titleElementRef, ionTitleElement);
    // If title is collapsible append it to content area; required by ionic implementation.
    if (hasCollapsibleTitle) {
      const titleElementClone = titleElementRef.nativeElement.cloneNode(true) as HTMLElement;
      this.moveChild(new ElementRef(titleElementClone), contentTitleElement);
    }
  }

  public removeTitle(
    titleElementRef: ElementRef<HTMLElement>,
    hasCollapsibleTitle: boolean,
    contentTitleElement: ElementRef<HTMLElement>
  ) {
    this.removeChild(titleElementRef);
    if (hasCollapsibleTitle) {
      const kirbyPageTitleElement: HTMLElement =
        contentTitleElement.nativeElement.querySelector('kirby-page-title');
      this.removeChild(new ElementRef(kirbyPageTitleElement));
    }
  }

  private moveChild(
    childElementRef: ElementRef<HTMLElement>,
    newParentElementRef: ElementRef<HTMLElement>
  ) {
    const child = childElementRef.nativeElement;
    const newParent = newParentElementRef.nativeElement;
    this.renderer.removeChild(child.parentElement, child);
    this.renderer.appendChild(newParent, child);
  }

  private removeChild(
    childElementRef: ElementRef<HTMLElement>,
    parentElement?: HTMLElement | ElementRef<HTMLElement>
  ) {
    const child = childElementRef.nativeElement;
    if (child) {
      this.renderer.removeChild(parentElement || child.parentElement, child);
    }
  }
}
