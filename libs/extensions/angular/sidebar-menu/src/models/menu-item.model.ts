import { RouterLinkItem } from './router-link-item.model';
import { SubmenuItem } from './submenu-item.model';
import { ExternalLinkItem } from './external-link-item.model';
import { Divider } from './divider.model';
import { ActionItem } from './action-item.model';

export type MenuItem = SubmenuItem | ActionItem | RouterLinkItem | ExternalLinkItem | Divider;
