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
        <tbody id="tbody">
          <tr kirby-tr>
            <td>Data1</td>
            <td>Data2</td>
          </tr>
        </tbody>
      </table>`);
      element = spectator.element as HTMLElement;
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });
  });

  describe('with selectable rows', () => {
    beforeEach(() => {
      spectator = createHost(`
      <table kirby-table>
        <tbody id="tbody">
          <tr kirby-tr [selectable]=true>
            <td>Data1</td>
            <td>Data2</td>
          </tr>
        </tbody>
      </table>`);
      element = spectator.element as HTMLElement;
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should have selectable rows', () => {
      expect(element).toHaveClass('kirby-selectable-row');
    });
  });
});
