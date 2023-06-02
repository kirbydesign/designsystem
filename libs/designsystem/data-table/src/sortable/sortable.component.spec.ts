import { MockComponent } from 'ng-mocks';
import { createHostFactory, Spectator } from '@ngneat/spectator';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';
import { TableComponent } from '../table/table.component';
import { TableSortableComponent } from './sortable.component';

const getFontWeight = DesignTokenHelper.fontWeight;

describe('TableSortableComponent', () => {
  let spectator: Spectator<TableSortableComponent>;

  const createHost = createHostFactory({
    component: TableSortableComponent,
    declarations: [MockComponent(TableComponent), MockComponent(IconComponent)],
  });

  beforeEach(() => {
    spectator = createHost(`<th [sortable]="true">Data1</th>`);
  });

  describe('by default', () => {
    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });
  });

  describe('sortable', () => {
    it('should render a button, when sortable is true', () => {
      const button = spectator.query('button');

      expect(button).toBeTruthy();
    });

    it('should render a span, when sortable is false', () => {
      spectator.setInput('sortable', false);

      const span = spectator.query('span');

      expect(span).toBeTruthy();
    });
  });

  describe('sortDirection', () => {
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

  describe('when active', () => {
    it('should get the "header-active" class when active is set to true', () => {
      spectator.setInput('active', true);

      expect(spectator.element).toHaveClass('header-active');
    });

    it('should make the text bold', () => {
      spectator.setInput('active', true);

      expect(spectator.element).toHaveComputedStyle({
        'font-weight': getFontWeight('bold'),
      });
    });
  });

  describe('textAlign', () => {
    it('should apply the "button-content-start" class if textAlignment is set to "start"', () => {
      spectator.setInput('textAlignment', 'start');

      const button = spectator.query('button');

      expect(button).toHaveClass('button-content-start');
    });

    it('should apply the "button-content-center" class if textAlignment is set to "center"', () => {
      spectator.setInput('textAlignment', 'center');

      const button = spectator.query('button');

      expect(button).toHaveClass('button-content-center');
    });

    it('should apply the "button-content-end" class if textAlignment is set to "end"', () => {
      spectator.setInput('textAlignment', 'end');

      const button = spectator.query('button');

      expect(button).toHaveClass('button-content-end');
    });
  });
});
