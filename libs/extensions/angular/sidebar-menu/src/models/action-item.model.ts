import { Badge } from './badge.model';
import { Toggle } from './toggle.model';

export type ActionItem = {
  id: string;
  type: 'action';
  title: string;
  icon?: string;
  badge?: Badge;
  toggle?: Toggle;
  href?: string;
  isLink?: boolean;
};
