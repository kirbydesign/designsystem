import { MockComponent } from 'ng-mocks';
import { createHostFactory, Spectator } from '@ngneat/spectator';
import { TableComponent } from '../table/table.component';
import { TableHeadComponent } from './table-head.component';

describe('TableRowComponent', () => {
  let spectator: Spectator<TableHeadComponent>;
  let element: HTMLElement;

  const createHost = createHostFactory({
    component: TableHeadComponent,
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
