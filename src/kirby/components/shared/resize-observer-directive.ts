import { Directive, ElementRef, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
declare var ResizeObserver;

const entriesMap = new WeakMap();

const ro = new ResizeObserver(entries => {
  for (const entry of entries) {
    if (entriesMap.has(entry.target)) {
      const comp = entriesMap.get(entry.target);
      comp._resizeCallback(entry);
    }
  }
});

@Directive({ selector: '[kirbyResizeObserver]' })
export class ResizeObserverDirective implements OnDestroy {
  @Output()
  resize = new EventEmitter();

  constructor(private el: ElementRef) {
    console.log('New ResizeObserverDirective made...');
    const target = this.el.nativeElement;
    entriesMap.set(target, this);
    ro.observe(target);
  }

  _resizeCallback(entry) {
    this.resize.emit(entry);
  }

  ngOnDestroy() {
    const target = this.el.nativeElement;
    ro.unobserve(target);
    entriesMap.delete(target);
  }
}
