import { MockComponent } from 'ng-mocks';
import { createHostFactory, Spectator } from '@ngneat/spectator';
import { TableComponent } from '../table/table.component';
import { TableSortableComponent } from './sortable.component';

describe('TableSortableComponent', () => {
  let spectator: Spectator<TableSortableComponent>;
  let element: HTMLElement;

  const createHost = createHostFactory({
    component: TableSortableComponent,
    declarations: [MockComponent(TableComponent)],
  });

  describe('by default', () => {
    beforeEach(() => {
      spectator = createHost(`
      <table kirby-table>
        <thead id="tbody">
          <tr kirby-tr>
            <th kirby-th>Data1</th>
            <th kirby-th>Data2</th>
          </tr>
        </thead>
      </table>`);
      element = spectator.element as HTMLElement;
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });
  });
});
