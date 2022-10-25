import { createHostFactory, Spectator } from '@ngneat/spectator';
import { DesignTokenHelper } from '../../../helpers/design-token-helper';
import { TableComponent } from './table.component';

const { fontWeight, fontSize, getTextColor, size, getColor } = DesignTokenHelper;

describe('TableComponent', () => {
  let spectator: Spectator<TableComponent>;
  let element: HTMLTableElement;

  const createHost = createHostFactory({
    component: TableComponent,
    declarations: [],
  });

  describe('by default', () => {
    beforeEach(() => {
      spectator = createHost(`
      <table kirby-table>
        <thead id="thead">
          <tr>
            <th>Heading1</th>
            <th>Heading2</th>
          </tr>
        </thead>
        <tbody id="tbody">
          <tr>
            <td>Data1</td>
            <td>Data2</td>
          </tr>
          <tr>
            <td>Data1</td>
            <td>Data2</td>
          </tr>
        </tbody>
      </table>`);
      element = spectator.element as HTMLTableElement;
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should style table correctly', () => {
      expect(element).toHaveComputedStyle({
        width: `${element.parentElement.clientWidth}px`,
        'border-collapse': 'collapse',
        'table-layout': 'auto',
      });
    });

    it('should style [thead] cells correctly', () => {
      expect(element.children.namedItem('thead').firstChild.firstChild).toHaveComputedStyle({
        'text-align': 'left',
        'font-weight': fontWeight('normal'),
        'font-size': fontSize('xs'),
        color: getTextColor('semi-dark'),
        padding: `${size('xxs')} ${size('s')}`,
      });
    });

    it('should style [tbody] cells correctly', () => {
      expect(element.children.namedItem('tbody').firstChild.firstChild).toHaveComputedStyle({
        padding: `${size('s')}`,
        'font-weight': fontWeight('normal'),
        'font-size': fontSize('s'),
        color: getTextColor('black'),
        'vertical-align': 'middle',
      });
    });

    it('should add divider on header', () => {
      expect(element.children.namedItem('thead').firstChild).toHaveComputedStyle({
        'border-bottom': `1px solid ${getColor('medium').value}`,
      });
    });

    it('should add divider on body rows', () => {
      expect(element.children.namedItem('tbody').firstChild).toHaveComputedStyle({
        'border-bottom': `1px solid ${getColor('medium').value}`,
      });
    });

    it('should not add divider to bottom row', () => {
      expect(element.children.namedItem('tbody').lastChild).not.toHaveComputedStyle({
        'border-bottom': `1px solid ${getColor('medium').value}`,
      });
    });
  });

  describe('with fixed layout enabled', () => {
    beforeEach(() => {
      spectator = createHost(`
      <table kirby-table [fixedLayout]=true>
        <thead id="thead">
          <tr>
            <th>Heading1</th>
            <th>Heading2</th>
            <th>Heading2</th>
          </tr>
        </thead>
        <tbody id="tbody">
          <tr>
            <td>Data1</td>
            <td>Data2</td>
            <td>Data2</td>
          </tr>
        </tbody>
      </table>`);
      element = spectator.element as HTMLTableElement;
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should style table with fixed-layout', () => {
      expect(element).toHaveClass('kirby-table-layout-fixed');
    });
  });
});
