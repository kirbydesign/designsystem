import { MockComponent } from 'ng-mocks';
import { createHostFactory, Spectator } from '@ngneat/spectator';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { TableComponent } from '../table/table.component';
import { TableSortableComponent } from './sortable.component';

describe('TableSortableComponent', () => {
  let spectator: Spectator<TableSortableComponent>;
  let element: HTMLElement;

  const createHost = createHostFactory({
    component: TableSortableComponent,
    declarations: [MockComponent(TableComponent), MockComponent(IconComponent)],
  });

  describe('by default', () => {
    beforeEach(() => {
      spectator = createHost(`<th [sortable]="true">Data1</th>`);
      element = spectator.element as HTMLElement;
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should render a button, when sortable is true', () => {
      const button = spectator.query('button');

      expect(button).toBeTruthy();
    });

    it('should render a span, when sortable is false', () => {
      spectator.setInput('sortable', false);

      const span = spectator.query('span');

      expect(span).toBeTruthy();
    });

    it('should render an "arrow-up" icon, when sortDirection is "asc"', () => {
      spectator.setInput('sortDirection', 'asc');

      const icon = spectator.query('kirby-icon');

      expect(icon.attributes['name'].value).toBe('arrow-up');
    });

    it('should render an "arrow-down" icon, when sortDirection is "desc"', () => {
      spectator.setInput('sortDirection', 'desc');

      const icon = spectator.query('kirby-icon');

      expect(icon.attributes['name'].value).toBe('arrow-down');
    });
  });
});
