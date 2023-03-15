import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'kirby-carousel-slide',
  template: `
    <swiper-slide #carousel>
      <ng-content></ng-content>
    </swiper-slide>
  `,
})
export class CarouselSlideComponent implements OnInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @ViewChild('carousel', { static: true, read: ElementRef })
  sliderElement: ElementRef<HTMLElement>;

  ngOnInit(): void {
    this.removeWrapper();
  }

  private removeWrapper() {
    const parent = this.elementRef.nativeElement.parentNode;
    this.renderer.removeChild(parent, this.elementRef.nativeElement);
    this.renderer.appendChild(parent, this.sliderElement.nativeElement);
  }
}
