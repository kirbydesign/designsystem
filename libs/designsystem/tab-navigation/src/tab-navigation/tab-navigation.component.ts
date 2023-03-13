import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChild,
} from '@angular/core';
import { filter, fromEvent, map, Subject, takeUntil, tap } from 'rxjs';
import { WindowRef } from '@kirbydesign/designsystem/types';
import { TabNavigationItemComponent } from '../tab-navigation-item/tab-navigation-item.component';

const ARROW_LEFT = 'ArrowLeft';
const ARROW_RIGHT = 'ArrowRight';

@Component({
  selector: 'kirby-tab-navigation',
  templateUrl: './tab-navigation.component.html',
  styleUrls: ['./tab-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabNavigationComponent implements AfterViewInit, OnDestroy {
  public readonly DEBOUNCE_TIME_MS = 250;

  @ViewChild('tabBar')
  private tabBar: ElementRef<HTMLElement>;

  @ContentChildren(TabNavigationItemComponent, { read: ElementRef })
  private tabs: QueryList<ElementRef<HTMLElement>>;

  private tabBarElement: HTMLElement;
  private tabElements = new Array<HTMLElement>();
  private tabButtonElements = new Array<HTMLElement>();
  private destroyed$ = new Subject<void>();

  @Input()
  get selectedIndex(): number {
    return this._selectedIndex;
  }

  set selectedIndex(index: number) {
    if (index !== this._selectedIndex) {
      this._selectedIndex = index;

      setTimeout(() => {
        this.scrollToTab(this.selectedIndex);
        this.focusTab(this.selectedIndex);
        this.selectTab(this.selectedIndex);
        this.selectedIndexChange.emit(this.selectedIndex);
      });
    }
  }
  private _selectedIndex = -1;

  @Output()
  selectedIndexChange = new EventEmitter<number>();

  constructor(private window: WindowRef) {
    /**/
  }

  ngAfterViewInit(): void {
    this.tabBarElement = this.tabBar.nativeElement;
    this.tabs.forEach((tab) => this.tabElements.push(tab.nativeElement));
    this.tabElements.forEach((tabElement) =>
      this.tabButtonElements.push(tabElement.querySelector('[role="tab"]'))
    );
    this.initTabListeners();
    setTimeout(() => {
      this.selectTab(this.selectedIndex);
      this.scrollToTab(this.selectedIndex);
      this.focusTab(this.selectedIndex);
    }, this.DEBOUNCE_TIME_MS);
  }

  initTabListeners(): void {
    this.tabButtonElements.forEach((tabButtonElement, index) => {
      fromEvent(tabButtonElement, 'click')
        .pipe(takeUntil(this.destroyed$))
        .subscribe(() => (this.selectedIndex = index));

      fromEvent(tabButtonElement, 'keydown')
        .pipe(
          filter((e: KeyboardEvent) => e.key === ARROW_LEFT || e.key === ARROW_RIGHT),
          tap((e: KeyboardEvent) => e.preventDefault()),
          map((e: KeyboardEvent) => {
            switch (e.key) {
              case ARROW_LEFT:
                return index === 0 ? this.tabButtonElements.length - 1 : index - 1;
              case ARROW_RIGHT:
                return index === this.tabButtonElements.length - 1 ? 0 : index + 1;
            }
          }),
          filter(
            (focusIndex: number) => 0 <= focusIndex && focusIndex < this.tabButtonElements.length
          ),
          takeUntil(this.destroyed$)
        )
        .subscribe((focusIndex: number) => {
          this.scrollToTab(focusIndex);
          this.focusTab(focusIndex);
        });
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private selectTab(tabIndex: number): void {
    this.tabButtonElements.forEach((tabButtonElement, index) => {
      tabButtonElement.setAttribute('aria-selected', index === tabIndex ? 'true' : 'false');
    });
  }

  private focusTab(tabIndex: number): void {
    const focusIndex = 0 <= tabIndex && tabIndex < this.tabButtonElements.length ? tabIndex : 0;

    this.tabButtonElements.forEach((tabButtonElement, index) => {
      tabButtonElement.setAttribute('tabindex', index === focusIndex ? '0' : '-1');
    });

    this.tabButtonElements[focusIndex].focus();
  }

  private scrollToTab(tabIndex: number): void {
    if (0 <= tabIndex && tabIndex < this.tabElements.length) {
      const selectedTabElement = this.tabElements[tabIndex];
      const selectedTabElementWidth = selectedTabElement.getBoundingClientRect().width;
      const selectedTabElementOffsetLeft = selectedTabElement.offsetLeft;
      const tabBarElementWidth = this.tabBarElement.getBoundingClientRect().width;

      this.window.nativeWindow.requestAnimationFrame(() => {
        this.tabBarElement?.scrollTo({
          behavior: 'smooth',
          left: Math.max(
            0,
            selectedTabElementOffsetLeft - (tabBarElementWidth - selectedTabElementWidth) / 2
          ),
        });
      });
    }
  }
}
