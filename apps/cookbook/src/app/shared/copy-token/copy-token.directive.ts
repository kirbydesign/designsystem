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
    const cell = row?.querySelectorAll('td')[1];
    if (cell) {
      cell.classList.add('copied');
      window.setTimeout(() => {
        cell.classList.remove('copied');
      }, 1500);
    }
  }
}
