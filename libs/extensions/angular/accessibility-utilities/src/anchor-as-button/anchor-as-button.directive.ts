import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: 'a[anchorAsButton]',
  standalone: true,
})
export class AnchorAsButtonDirective implements OnInit {
  @HostBinding('attr.role') role = 'button';
  @HostBinding('attr.tabindex') tabIndex = '0';

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    const anchor = this.element.nativeElement as HTMLAnchorElement;
    this.renderer.setStyle(anchor, 'cursor', 'pointer');
    this.renderer.setStyle(anchor, 'text-decoration', 'underline');
  }

  @HostListener('keydown.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent) {
    event.preventDefault();
    (event.target as HTMLElement).click();
  }
}
