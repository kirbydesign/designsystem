import { assertToolbarItems, richTextToolbar } from './rich-text-editor.toolbar';

describe('Rich text toolbar validation', () => {
  const textStyle = richTextToolbar.textStyle({
    label: 'Teksttype',
    normal: 'Normal tekst',
    heading1: 'Overskrift 1',
    heading2: 'Overskrift 2',
    heading3: 'Overskrift 3',
  });

  it('accepts no controls or a selection with only its own labels', () => {
    expect(() => assertToolbarItems([])).not.toThrow();
    expect(() => assertToolbarItems([richTextToolbar.bold('Fed')])).not.toThrow();
    expect(() =>
      assertToolbarItems([
        richTextToolbar.bold('Fed'),
        richTextToolbar.italic('Kursiv'),
        richTextToolbar.underline('Understreget'),
        richTextToolbar.bulletList('Punktopstilling'),
        richTextToolbar.orderedList('Nummereret liste'),
        textStyle,
      ])
    ).not.toThrow();
  });

  it.each([
    { name: 'a non-array value', items: null },
    { name: 'legacy identifiers without labels', items: ['bold'] },
    { name: 'a null control', items: [null] },
    { name: 'an unsupported control', items: [{ id: 'link', label: 'Link' }] },
    { name: 'a missing label', items: [{ id: 'bold' }] },
    { name: 'a whitespace-only label', items: [richTextToolbar.bold('  ')] },
    { name: 'missing text-style labels', items: [{ id: 'textStyle', label: 'Text style' }] },
    { name: 'an empty heading label', items: [{ ...textStyle, heading2: '' }] },
  ])('rejects $name', ({ items }) => {
    expect(() => assertToolbarItems(items)).toThrow(TypeError);
  });

  it('rejects duplicate control IDs even with different labels', () => {
    expect(() =>
      assertToolbarItems([richTextToolbar.bold('Bold'), richTextToolbar.bold('Fed')])
    ).toThrow('Rich text editor toolbar items must be unique');
  });
});
