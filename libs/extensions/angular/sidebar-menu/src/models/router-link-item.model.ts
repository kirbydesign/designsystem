import { Badge } from './badge.model';
import { Toggle } from './toggle.model';

export type RouterLinkItem = {
  id: string;
  type: 'router-link';
  title: string;
  icon?: string;
  badge?: Badge;
  toggle?: Toggle;
  route: string;
  target?: '_self' | '_blank' | '_parent' | '_top';
  queryParams?: Params;
  replaceUrl?: boolean;
  skipLocationChange?: boolean;
};

type Params = {
  [key: string]: unknown;
};
