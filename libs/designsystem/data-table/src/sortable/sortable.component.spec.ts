import { MockModule } from 'ng-mocks';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { IconModule } from '@kirbydesign/designsystem/icon';
import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

import { TableSortableComponent } from './sortable.component';

const getFontWeight = DesignTokenHelper.fontWeight;

describe('TableSortableComponent', () => {
  let spectator: SpectatorHost<TableSortableComponent>;

  const createHost = createHostFactory({
    component: TableSortableComponent,
    overrideComponents: [
      [
        TableSortableComponent,
        {
          remove: { imports: [IconModule] },
          add: { imports: [[MockModule(IconModule)]] },
        },
      ],
    ],
  });

  beforeEach(() => {
    spectator = createHost(
      `
    <table class="kirby-table">
      <th [sortable]="sortable" [sortDirection]="sortDirection" [active]="active" [alignment]="alignment">Data1</th>
    </table>
    `,
      { hostProps: { sortable: true } }
    );
  });

  describe('by default', () => {
    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should hide the sorting icon', () => {
      const icon = spectator.query('kirby-icon');

      expect(icon).toHaveComputedStyle({
        visibility: 'hidden',
      });
    });
  });

  describe('sortable', () => {
    it('should render a button, when sortable is true', () => {
      const button = spectator.query('button');

      expect(button).toBeTruthy();
    });

    it('should render a text, when sortable is false', () => {
      spectator.setHostInput('sortable', false);

      expect(spectator.element.firstChild.nodeType).toBe(Node.TEXT_NODE);
    });
  });

  describe('sortDirection', () => {
    it('should render an "arrow-up" icon, when sortDirection is "asc"', () => {
      spectator.setHostInput('sortDirection', 'asc');

      const icon = spectator.query('kirby-icon');

      expect(icon.attributes.getNamedItem('ng-reflect-name').value).toBe('arrow-up-fill');
    });

    it('should render an "arrow-down" icon, when sortDirection is "desc"', () => {
      spectator.setHostInput('sortDirection', 'desc');

      const icon = spectator.query('kirby-icon');

      expect(icon.attributes.getNamedItem('ng-reflect-name').value).toBe('arrow-down-fill');
    });
  });

  describe('when active', () => {
    it('should get the "active" class when the active input is set to true', () => {
      spectator.setHostInput('active', true);

      expect(spectator.element).toHaveClass('active');
    });

    it('should make the text bold', () => {
      spectator.setHostInput('active', true);

      expect(spectator.element).toHaveComputedStyle({
        'font-weight': getFontWeight('bold'),
      });
    });
  });

  describe('align', () => {
    it('should left-align content when align is set to "start"', () => {
      spectator.setHostInput('alignment', 'start');

      const button = spectator.query('button');

      expect(button).toHaveComputedStyle({
        'justify-content': 'flex-start',
      });
    });

    it('should center-align content when align is set to "center"', () => {
      spectator.setHostInput('alignment', 'center');

      const button = spectator.query('button');

      expect(button).toHaveComputedStyle({
        'justify-content': 'center',
      });
    });

    it('should right-align content when align is set to "end"', () => {
      spectator.setHostInput('alignment', 'end');

      const button = spectator.query('button');

      expect(button).toHaveComputedStyle({
        'justify-content': 'flex-end',
      });
    });
  });
});
