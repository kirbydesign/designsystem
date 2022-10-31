import { Account } from './other';

export interface OwnAccount extends Account {
  balance: number;
  selected: boolean;
}
