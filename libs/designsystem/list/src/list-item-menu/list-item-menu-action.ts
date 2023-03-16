import { ListItem } from '../list-item/list-item.component';

export interface ListItemMenuAction {
  isDisabled?: boolean | ((item: ListItem) => boolean);
  icon?: string | ((item: ListItem) => string);
  text?: string | ((item: ListItem) => string);
}
