export type ShortcutModel = {
  modifierKeys?: ModifierKey[];
  key: string;
};

type ModifierKey = 'ctrl' | 'shift' | 'alt' | 'meta';
