import { formattingActions } from './rich-text-editor.defaults';
import type {
  RichTextEditorTextStyleLabels,
  RichTextEditorToolbarItem,
} from './rich-text-editor.types';

export const richTextToolbar = {
  bold: (label: string) => ({ id: 'bold', label }) satisfies RichTextEditorToolbarItem,
  italic: (label: string) => ({ id: 'italic', label }) satisfies RichTextEditorToolbarItem,
  underline: (label: string) => ({ id: 'underline', label }) satisfies RichTextEditorToolbarItem,
  bulletList: (label: string) => ({ id: 'bulletList', label }) satisfies RichTextEditorToolbarItem,
  orderedList: (label: string) =>
    ({ id: 'orderedList', label }) satisfies RichTextEditorToolbarItem,
  textStyle: (labels: RichTextEditorTextStyleLabels) =>
    ({ ...labels, id: 'textStyle' }) satisfies RichTextEditorToolbarItem,
};

export function assertToolbarItems(
  items: unknown
): asserts items is readonly RichTextEditorToolbarItem[] {
  if (!Array.isArray(items) || !items.every(isToolbarItem)) {
    throw new TypeError('Toolbar items must define supported controls with non-empty labels');
  }
  if (new Set(items.map((item) => item.id)).size !== items.length) {
    throw new Error('Rich text editor toolbar items must be unique');
  }
}

function isToolbarItem(item: unknown): item is RichTextEditorToolbarItem {
  if (typeof item !== 'object' || item === null || !('id' in item) || !('label' in item)) {
    return false;
  }
  const labels = [item.label];
  if (item.id === 'textStyle') {
    if (
      !('normal' in item) ||
      !('heading1' in item) ||
      !('heading2' in item) ||
      !('heading3' in item)
    ) {
      return false;
    }
    labels.push(item.normal, item.heading1, item.heading2, item.heading3);
  } else if (!formattingActions.some((action) => action === item.id)) {
    return false;
  }
  return labels.every((label) => typeof label === 'string' && label.trim().length > 0);
}
