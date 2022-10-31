import { Account } from './account';

export interface OwnAccount extends Account {
  balance: number;
  selected: boolean;
}
