import { Account } from './account.model';

export interface OwnAccount extends Account {
  balance: number;
  selected: boolean;
}
