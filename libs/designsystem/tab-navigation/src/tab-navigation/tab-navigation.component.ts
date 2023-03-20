import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChild,
} from '@angular/core';
import { filter, fromEvent, map, Subject, takeUntil, tap } from 'rxjs';
import { WindowRef } from '@kirbydesign/designsystem/types';
import { KeyboardHandlerService } from '@kirbydesign/designsystem/dropdown';
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
  private _focusIndex = -1;

  @Output()
  selectedIndexChange = new EventEmitter<number>();

  constructor(private window: WindowRef, private keyboardHandlerService: KeyboardHandlerService) {
    /**/
  }

  ngAfterViewInit(): void {
    this.tabBarElement = this.tabBar.nativeElement;
    this.tabs.forEach((tab) => this.tabElements.push(tab.nativeElement));
    this.tabElements.forEach((tabElement) =>
      this.tabButtonElements.push(tabElement.querySelector('[role="tab"]'))
    );

    setTimeout(() => {
      this.selectTab(this.selectedIndex);
      this.scrollToTab(this.selectedIndex);
      this.focusTab(this.selectedIndex);
    }, this.DEBOUNCE_TIME_MS);
  }

  @HostListener('click', ['$event'])
  @HostListener('keydown.enter', ['$event'])
  onItemSelect(event: PointerEvent) {
    const targetTabNavItem: HTMLElement = (event.target as HTMLElement).closest('button');
    this.selectedIndex = this.tabButtonElements.indexOf(targetTabNavItem);
  }

  @HostListener('keydown.home', ['$event'])
  @HostListener('keydown.end', ['$event'])
  @HostListener('keydown.arrowright', ['$event'])
  @HostListener('keydown.arrowleft', ['$event'])
  onKeydown(event: KeyboardEvent) {
    event.preventDefault();
    const newFocusIndex = this.keyboardHandlerService.handle(
      event,
      this.tabElements,
      this._focusIndex,
      true
    );

    this.focusTab(newFocusIndex);
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

  private focusTab(focusIndex: number): void {
    this._focusIndex = focusIndex;

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
