import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { CdkScrollable } from '@angular/cdk/overlay';
import { HeightObserverDirective } from '../../directives/height-observer';
import { SidebarService } from '../../services/sidebar';

type ViewModel = {
  showHeaderBottomBorder: Signal<boolean>;
  showFooterTopBorder: Signal<boolean>;
  setContainerHeight: (height: number) => void;
  setScroll: (scroll: Event) => void;
};

@Component({
  selector: 'aside[kirby-x-sidebar-container]',
  templateUrl: './sidebar-container.component.html',
  styleUrls: ['./sidebar-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [HeightObserverDirective, CdkScrollable],
})
export class SidebarContainerComponent {
  readonly #sidebarService = inject(SidebarService);

  #setContainerHeight(height: number): void {
    this.#sidebarService.containerHeight = height;
  }

  #setScrollDistance(event: Event): void {
    const target = event.target as HTMLElement | null;
    if (target) {
      this.#sidebarService.scrollDistance = target.scrollTop;
    }
  }

  readonly vm: ViewModel = {
    showHeaderBottomBorder: this.#sidebarService.showHeaderBottomBorder,
    showFooterTopBorder: this.#sidebarService.showFooterTopBorder,
    setContainerHeight: this.#setContainerHeight.bind(this),
    setScroll: this.#setScrollDistance.bind(this),
  };
}
