import { Badge } from './badge.model';
import { Toggle } from './toggle.model';
import { ShortcutModel } from './shortcut.model';

export type ExternalLinkItem = {
  id: string;
  type: 'external-link';
  title: string;
  icon?: string;
  badge?: Badge;
  toggle?: Toggle;
  url: string;
  target?: '_self' | '_blank' | '_parent' | '_top';
  shortcut?: ShortcutModel;
};
