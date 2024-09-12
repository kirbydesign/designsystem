import { MockModule } from 'ng-mocks';
import { createHostFactory, Spectator } from '@ngneat/spectator';

import { IconModule } from '@kirbydesign/designsystem/icon';
import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

import { TableSortableComponent } from './sortable.component';

const getFontWeight = DesignTokenHelper.fontWeight;

describe('TableSortableComponent', () => {
  let spectator: Spectator<TableSortableComponent>;

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
    spectator = createHost(`
    <table class="kirby-table">
      <th [sortable]="true">Data1</th>
    </table>
    `);
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
      spectator.setInput('sortable', false);

      expect(spectator.element.firstChild.nodeType).toBe(Node.TEXT_NODE);
    });
  });

  describe('sortDirection', () => {
    it('should render an "arrow-up" icon, when sortDirection is "asc"', () => {
      spectator.setInput('sortDirection', 'asc');

      const icon = spectator.query('kirby-icon');

      expect(icon.attributes.getNamedItem('ng-reflect-name').value).toBe('arrow-up-fill');
    });

    it('should render an "arrow-down" icon, when sortDirection is "desc"', () => {
      spectator.setInput('sortDirection', 'desc');

      const icon = spectator.query('kirby-icon');

      expect(icon.attributes.getNamedItem('ng-reflect-name').value).toBe('arrow-down-fill');
    });
  });

  describe('when active', () => {
    it('should get the "active" class when the active input is set to true', () => {
      spectator.setInput('active', true);

      expect(spectator.element).toHaveClass('active');
    });

    it('should make the text bold', () => {
      spectator.setInput('active', true);

      expect(spectator.element).toHaveComputedStyle({
        'font-weight': getFontWeight('bold'),
      });
    });
  });

  describe('align', () => {
    it('should left-align content when align is set to "start"', () => {
      spectator.setInput('alignment', 'start');

      const button = spectator.query('button');

      expect(button).toHaveComputedStyle({
        'justify-content': 'flex-start',
      });
    });

    it('should center-align content when align is set to "center"', () => {
      spectator.setInput('alignment', 'center');

      const button = spectator.query('button');

      expect(button).toHaveComputedStyle({
        'justify-content': 'center',
      });
    });

    it('should right-align content when align is set to "end"', () => {
      spectator.setInput('alignment', 'end');

      const button = spectator.query('button');

      expect(button).toHaveComputedStyle({
        'justify-content': 'flex-end',
      });
    });
  });
});
