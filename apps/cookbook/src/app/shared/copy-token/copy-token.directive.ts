import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[cookbookCopyToken]',
})
export class CopyTokenDirective {
  @Input('cookbookCopyToken') cssVar: string;

  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('click')
  async onClick() {
    await navigator.clipboard.writeText(`var(${this.cssVar})`);
    const row = this.el.nativeElement.closest('tr');
    const target = row ? row.querySelectorAll('td')[1] : this.el.nativeElement;
    if (target) {
      target.classList.add('copied');
      window.setTimeout(() => {
        target.classList.remove('copied');
      }, 1500);
    }
  }
}
