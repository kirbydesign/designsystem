import { createHostFactory, Spectator } from '@ngneat/spectator';
import { DesignTokenHelper } from '../../../helpers/design-token-helper';
import { TableComponent } from './table.component';

const { fontWeight, fontSize, lineHeight, getTextColor, size, getColor } = DesignTokenHelper;

fdescribe('TableComponent', () => {
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

    it('style table correctly', () => {
      expect(element).toHaveComputedStyle({
        width: `${element.parentElement.clientWidth}px`,
        'border-collapse': 'collapse',
        'table-layout': 'auto',
      });
    });

    it('style [thead] cells correctly', () => {
      expect(element.children.namedItem('thead').firstChild.firstChild).toHaveComputedStyle({
        'font-weight': fontWeight('normal'),
        'font-size': fontSize('xs'),
        'line-height': lineHeight('xs'),
        color: getTextColor('semi-dark'),
        padding: `${size('xxs')} ${size('s')}`,
      });
    });

    it('style [tbody] cells correctly', () => {
      expect(element.children.namedItem('tbody').firstChild.firstChild).toHaveComputedStyle({
        padding: `0px ${size('s')}`,
        'font-weight': fontWeight('normal'),
        'font-size': fontSize('s'),
        color: getTextColor('black'),
        'line-height': lineHeight('xs'),
        'vertical-align': 'middle',
        'min-height': size('xl'),
      });
    });

    it('add divider on header', () => {
      expect(element.children.namedItem('thead').firstChild).toHaveComputedStyle({
        'border-bottom': `1px solid ${getColor('medium').value}`,
      });
    });

    it('add divider on body rows', () => {
      expect(element.children.namedItem('tbody').firstChild).toHaveComputedStyle({
        'border-bottom': `1px solid ${getColor('medium').value}`,
      });
    });

    it('not add divider to bottom row', () => {
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

    it('style table with fixed-layout', () => {
      // windows.innerWidth - 16px because of default margin
      expect(element).toHaveClass('--kirby-table-layout-fixed');
    });
  });
});
