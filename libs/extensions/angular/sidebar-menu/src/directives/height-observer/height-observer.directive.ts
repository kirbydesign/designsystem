import { Directive, ElementRef, inject, OnDestroy, output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Directive({
  selector: '[kirbyXHeightObserver]',
})
export class HeightObserverDirective implements OnDestroy {
  readonly heightChange = output<number>();

  readonly #element = inject(ElementRef).nativeElement;
  readonly #heightChanges = new Subject<number>();

  readonly #observer = new ResizeObserver((entries) => {
    this.#heightChanges.next(entries[0].contentRect.height);
  });

  constructor() {
    this.#observer.observe(this.#element, { box: 'content-box' });
    this.#heightChanges
      .pipe(debounceTime(50), distinctUntilChanged())
      .subscribe(this.heightChange.emit.bind(this.heightChange));
  }

  ngOnDestroy() {
    this.#observer.unobserve(this.#element);
    this.#observer.disconnect();
  }
}
