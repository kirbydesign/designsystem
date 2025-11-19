import { computed, Injectable, Signal, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  readonly #menuHeight = signal<number>(0);
  readonly #containerHeight = signal<number>(0);
  readonly #scrollDistance = signal<number>(0);

  readonly #scrollableDistance = computed(() =>
    Math.max(0, this.#menuHeight() - this.#containerHeight())
  );
  readonly #hasScrollbar = computed(() => this.#scrollableDistance() > 0);
  readonly #notAtBottom = computed(() => this.#scrollDistance() < this.#scrollableDistance());
  readonly #showHeaderBottomBorder = computed(() => this.#scrollDistance() > 0);
  readonly #showFooterTopBorder = computed(() => this.#hasScrollbar() && this.#notAtBottom());

  get showHeaderBottomBorder(): Signal<boolean> {
    return this.#showHeaderBottomBorder;
  }

  get showFooterTopBorder(): Signal<boolean> {
    return this.#showFooterTopBorder;
  }

  set menuHeight(height: number) {
    this.#menuHeight.set(height);
  }

  set containerHeight(height: number) {
    this.#containerHeight.set(height);
  }

  set scrollDistance(distance: number) {
    this.#scrollDistance.set(distance);
  }
}
