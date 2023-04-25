import { Component, ViewChild } from '@angular/core';
import { ListSwipeAction } from '../list-swipe-action.type';
import { ListItemComponent } from './list-item.component';

export const mockPlatformServiceIsTouchTrue = {
  isTouch: () => true,
  isTablet: () => false,
};

export const mockPlatformServiceIsTouchFalse = {
  isTouch: () => false,
  isTablet: () => false,
};

@Component({
  selector: 'kirby-mock-item',
  template: `
    <ng-template #MockKirbyItem>
      <kirby-item>
        {{ item.text }}
      </kirby-item>
    </ng-template>
    <kirby-list-item
      #sutComponentRef
      [item]="item"
      [itemTemplate]="MockKirbyItem"
      [boundaryClass]="'first'"
      (swipeActionSelect)="onItemSelected($event)"
    ></kirby-list-item>
  `,
})
export class MockKirbyItemComponent {
  @ViewChild('sutComponentRef') public sutComponentRef: ListItemComponent;
  public item = { text: 'I am an item' };

  public onItemSelected(item: any) {}
}

export const testSwipeActions: ListSwipeAction[] = [
  {
    position: 'left',
    icon: 'archive',
    title: 'Archive',
    type: 'warning',
    onSelected: (item) => {},
    isDisabled: (item) => item.archived || item.id === 3,
  },
  {
    position: 'left',
    title: (item) => (item.flagged ? 'Remove flag' : 'Flag'),
    icon: (item) => (item.flagged ? null : 'flag'),
    type: 'success',
    onSelected: (item) => {},
    isDisabled: (item) => item.id === 3,
  },
  {
    position: 'right',
    title: (item) => (item.deleted ? 'Restore' : 'Delete'),
    icon: (item) => (item.deleted ? 'swap' : 'trash'),
    type: (item) => (item.deleted ? 'warning' : 'danger'),
    onSelected: (item) => {},
    isDisabled: (item) => item.id === 3,
  },
];
