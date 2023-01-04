import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  QueryList,
  ViewChild,
} from '@angular/core';
import { filter, fromEvent } from 'rxjs';
import { WindowRef } from '@kirbydesign/designsystem/types';
import { TabNavigationItemComponent } from '../tab-navigation-item/tab-navigation-item.component';

const KEY_ENTER = 'Enter';

@Component({
  selector: 'kirby-tab-navigation',
  templateUrl: './tab-navigation.component.html',
  styleUrls: ['./tab-navigation.component.scss'],
})
export class TabNavigationComponent implements AfterViewInit {
  @ContentChildren(TabNavigationItemComponent, { read: ElementRef })
  private tabItems: QueryList<ElementRef<HTMLElement>>;

  @ViewChild('tabBar')
  private tabBar: ElementRef<HTMLElement>;

  private tabBarElement: HTMLElement;
  private tabItemElements = new Array<HTMLElement>();

  constructor(private window: WindowRef) {
    /**/
  }

  ngAfterViewInit(): void {
    console.log('--- Tab Items: ' + this.tabItems.length + ' ---');
    //this.tabItems.forEach((tabItem) => console.log('#', tabItem));
    this.tabBarElement = this.tabBar.nativeElement;

    this.tabItems.forEach((tabItem) => this.tabItemElements.push(tabItem.nativeElement));

    this.tabItemElements.forEach((tabItemElement, index) => {
      fromEvent(tabItemElement, 'click').subscribe(() => this.setSelectedTabItem(index));
      fromEvent(tabItemElement, 'keydown')
        .pipe(filter((e: KeyboardEvent) => e.key === KEY_ENTER))
        .subscribe(() => this.setSelectedTabItem(index));
    });
  }

  private setSelectedTabItem(tabItemIndex: number): void {
    const tabItemSelectedClassName = 'selected';
    this.tabItemElements.forEach((tabItemElement, index) => {
      tabItemElement.classList.remove(tabItemSelectedClassName);
      if (tabItemIndex === index) {
        tabItemElement.classList.add(tabItemSelectedClassName);
      }
    });
    this.scrollToTab(tabItemIndex);
  }

  private scrollToTab(tabItemIndex: number): void {
    const selectedTabElement = this.tabItemElements[tabItemIndex];
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
