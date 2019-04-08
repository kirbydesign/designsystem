import { createTestComponentFactory, Spectator } from '@netbasal/spectator';

import { LoadOnDemandEvent } from './list.event';
import { GroupByPipe } from './pipes/group-by.pipe';
import { ListComponent } from './list.component';
import { SpinnerComponent } from '~/kirby';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { ListRowClassService } from '~/kirby/components/list/list-row-class.service';
import { ListHelper } from '~/kirby/components/list/helpers/list-helper';

describe('ListComponent', () => {
  let spectator: Spectator<ListComponent>;
  let component: ListComponent;

  function runNgOnChanges() {
    // Forces ngOnChanges to run (since that won't happen, when inputs are changed programmatically)
    component.ngOnChanges();
    // Detect changes, since ngOnChanges altered state of component
    spectator.detectChanges();
  }

  const createHost = createTestComponentFactory({
    component: ListComponent,
    declarations: [ListComponent, GroupByPipe, SpinnerComponent, InfiniteScrollDirective],
    providers: [ListHelper],
    componentProviders: [
      {
        provide: ListRowClassService,
        useValue: jasmine.createSpyObj('ListRowClassService', ['getCssClasses', 'update']),
      },
    ],
  });

  beforeEach(() => {
    spectator = createHost({});
    component = spectator.component;
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('sections', () => {
    it('should be disabled if no section callback is defined', () => {
      spectator.setInput({
        getSectionName: undefined,
      });
      runNgOnChanges();

      expect(spectator.component.isSectionsEnabled).toBeFalsy();
    });

    it('should be enabled if a section callback is defined', () => {
      spectator.setInput({
        getSectionName: (item: any) => 'this is a test',
      });
      runNgOnChanges();

      expect(spectator.component.isSectionsEnabled).toBeTruthy();
    });

    it('should render one li element for each item, if the list is not sectioned', () => {
      spectator.setInput({
        items: [1, 2, 3],
      });
      runNgOnChanges();

      const liElements = spectator.queryAll('li');
      expect(liElements.length).toEqual(component.items.length);
    });

    it('should render one li element for each item and one for each section, if sections are enabled', () => {
      spectator.setInput({
        items: [0, 1, 2],
        getSectionName: (item: number) => (item % 2 === 0 ? 'even' : 'odd'),
      });
      runNgOnChanges();

      const liElements = spectator.queryAll('li');
      expect(liElements.length).toEqual(component.items.length + 2);
    });
  });

  describe('divider', () => {
    it('should set class "divider" on all li elements when showDivider is true', () => {
      spectator.setInput({
        items: [1, 2, 3],
        showDivider: true,
      });
      runNgOnChanges();

      const liElements = spectator.queryAll('li');
      liElements.forEach((liElement) => {
        expect(liElement.getAttribute('class')).toContain('divider');
      });
    });

    it('should not set class "divider" on any li elements when showDivider is false', () => {
      spectator.setInput({
        items: [1, 2, 3],
        showDivider: false,
      });
      runNgOnChanges();

      const liElements = spectator.queryAll('li');
      liElements.forEach((liElement) => {
        expect(liElement.getAttribute('class')).not.toContain('divider');
      });
    });
  });

  describe('function: onItemSelect', () => {
    it('should emit the selected item', () => {
      spyOn(component.itemSelect, 'emit');
      const itemToBeSelected = { value: 'this is a dummy item' };

      component.onItemSelect(itemToBeSelected);

      expect(component.itemSelect.emit).toHaveBeenCalledTimes(1);
      expect(component.itemSelect.emit).toHaveBeenCalledWith(itemToBeSelected);
    });
  });

  describe('function: ngOnInit', () => {
    it('should enable load more, if there is a subscriber to the loadMore event emitter', () => {
      component.loadOnDemand.subscribe((loadMoreEvent: LoadOnDemandEvent) => {});

      runNgOnChanges();

      expect(component.isLoadOnDemandEnabled).toBeTruthy();
    });

    it('should disable load more, if there is no subscriber to the loadMore event emitter', () => {
      runNgOnChanges();

      expect(component.isLoadOnDemandEnabled).toBeFalsy();
    });
  });
});
