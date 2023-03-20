import { ListItem } from '../list-item/list-item';

export interface ListItemMenuAction {
  isDisabled?: boolean | ((item: ListItem) => boolean);
  onSelected: (item: ListItem) => void;
  icon?: string | ((item: ListItem) => string);
  text?: string | ((item: ListItem) => string);
}
