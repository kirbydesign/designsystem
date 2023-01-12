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
import { filter, fromEvent, map, Subject, takeUntil } from 'rxjs';
import { WindowRef } from '../../../types';
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
  @ViewChild('tabBar')
  private tabBar: ElementRef<HTMLElement>;

  @ContentChildren(TabNavigationItemComponent, { read: ElementRef })
  private tabs: QueryList<ElementRef<HTMLElement>>;

  private readonly DEBOUNCE_TIME_MS = 250;
  private readonly tabSelectedClassName = 'selected';
  private tabBarElement: HTMLElement;
  private tabElements = new Array<HTMLElement>();
  private destroyed$ = new Subject<void>();

  @Input()
  get selectedIndex(): number {
    return this._selectedIndex;
  }

  set selectedIndex(index: number) {
    if (index !== this._selectedIndex) {
      this._selectedIndex = index;

      setTimeout(() => {
        this.selectTab(this.selectedIndex);
        this.scrollToTab(this.selectedIndex);
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

    this.initTabListeners();
    setTimeout(() => {
      this.scrollToTab(this.selectedIndex);
    }, this.DEBOUNCE_TIME_MS);
  }

  initTabListeners(): void {
    this.tabElements.forEach((tabElement, index) => {
      fromEvent(tabElement, 'click')
        .pipe(takeUntil(this.destroyed$))
        .subscribe(() => (this.selectedIndex = index));
      fromEvent(tabElement, 'keydown')
        .pipe(
          filter((e: KeyboardEvent) => e.key === ARROW_LEFT || e.key === ARROW_RIGHT),
          map((e: KeyboardEvent) =>
            e.key === ARROW_LEFT
              ? (index - 1 + this.tabElements.length) % this.tabElements.length
              : (index + 1) % this.tabElements.length
          ),
          takeUntil(this.destroyed$)
        )
        .subscribe((focusIndex: number) => {
          this.focusTab(focusIndex);
          this.scrollToTab(focusIndex);
        });
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private focusTab(tabIndex: number): void {
    if (0 <= tabIndex && tabIndex < this.tabElements.length) {
      this.tabElements[tabIndex].focus();
    }
  }

  private selectTab(tabIndex: number): void {
    this.tabElements.forEach((tabElement, index) => {
      tabElement.classList.remove(this.tabSelectedClassName);
      if (tabIndex === index) {
        tabElement.classList.add(this.tabSelectedClassName);
      }
    });
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
