import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { ReorderEvent } from './reorder-event';
import { ReorderListComponent } from './reorder-list.component';

describe('ReorderListComponent', () => {
  let spectator: Spectator<ReorderListComponent>;
  let component: ReorderListComponent;
  const items = [
    { title: '1', subItems: [{ title: '1a' }, { title: '1b' }, { title: '1c' }] },
    { title: '2' },
    { title: '3' },
  ];

  function runNgOnChanges() {
    // Forces ngOnChanges to run (since that won't happen, when inputs are changed programmatically)
    component.ngOnChanges();
    // Detect changes, since ngOnChanges altered state of component
    spectator.detectChanges();
  }

  const createHost = createComponentFactory({
    component: ReorderListComponent,
  });

  beforeEach(() => {
    spectator = createHost({
      props: {
        items: items,
        subItemsName: 'subItems',
        getItemTextDefault: (item: any) => {
          return item.title;
        },
      },
    });
    component = spectator.component;
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('items', () => {
    it('should render a card for each item in array', () => {
      expect(spectator.queryAll('kirby-card').length).toBe(items.length);
    });

    it('should accept null items without errors', () => {
      spectator.setInput({
        items: null,
      });
      runNgOnChanges();

      expect(spectator.component.items).toBe(null);
    });
  });

  describe('event: itemReorder', () => {
    it('should emit event', () => {
      spyOn(spectator.component.itemReorder, 'emit');

      const customEvent = new CustomEvent('itemReorder test', { detail: {} });

      spectator.component.doReorder(customEvent);

      expect(spectator.component.itemReorder.emit).toHaveBeenCalledTimes(1);
      expect(spectator.component.itemReorder.emit).toHaveBeenCalledWith(jasmine.any(ReorderEvent));
    });
  });

  describe('event: subItemReorder', () => {
    it('should emit event with parentItem', () => {
      spyOn(spectator.component.subItemReorder, 'emit');

      const customEvent = new CustomEvent('subItemReorder test', { detail: {} });
      spectator.component.doSubReorder(customEvent, items[0]);

      expect(spectator.component.subItemReorder.emit).toHaveBeenCalledTimes(1);
      expect(spectator.component.subItemReorder.emit).toHaveBeenCalledWith(
        jasmine.any(ReorderEvent)
      );
      const arg: any = (spectator.component.subItemReorder.emit as any).calls.mostRecent().args[0];
      expect(arg.parentItem).toEqual(items[0]);
    });
  });

  describe('while reordering items', () => {
    beforeEach(() => {
      spectator.setInput({
        items: [
          { title: '1', subItems: [{ title: '1a' }, { title: '1b' }] },
          { title: '2', subItems: [{ title: '2a' }, { title: '2b' }] },
        ],
        subItemsName: 'subItems',
      });
    });

    it('should not shift the sub items of other cards when reordering cards', () => {
      const outerReorderGroup = spectator.element.querySelector(':scope > ion-reorder-group');
      const [, secondCard] = spectator.queryAll('kirby-card');
      const lastSubItem = secondCard.querySelector('ion-reorder-group').lastElementChild;
      const topBefore = lastSubItem.getBoundingClientRect().top;

      outerReorderGroup.classList.add('reorder-list-active');

      expect(lastSubItem.getBoundingClientRect().top).toBe(topBefore);
    });

    it('should not shift the sub items when reordering inside a group', () => {
      const [firstCard] = spectator.queryAll('kirby-card');
      const subReorderGroup = firstCard.querySelector('ion-reorder-group');
      const lastSubItem = subReorderGroup.lastElementChild;
      const topBefore = lastSubItem.getBoundingClientRect().top;

      subReorderGroup.classList.add('reorder-list-active');

      expect(lastSubItem.getBoundingClientRect().top).toBe(topBefore);
    });
  });

  describe('subItems', () => {
    it('should render a kirby-item for each item in subitems array', () => {
      expect(spectator.queryAll('kirby-card ion-reorder-group kirby-item').length).toBe(
        items[0].subItems.length
      );
    });

    it('should accept invalid name, but not show anything', () => {
      spectator.setInput({
        items: items,
        subItemsName: 'invalidName',
      });
      runNgOnChanges();

      expect(spectator.queryAll('kirby-card ion-reorder-group kirby-item').length).toBe(0);
    });

    it('should not show anything, if subitems array is empty', () => {
      items[0].subItems = [];
      spectator.setInput({
        items: items,
        subItemsName: 'subItems',
      });
      runNgOnChanges();

      expect(spectator.queryAll('kirby-card ion-reorder-group kirby-item').length).toBe(0);
    });
  });
});
