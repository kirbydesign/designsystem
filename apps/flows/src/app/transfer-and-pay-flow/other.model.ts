import { Account } from './account.model';

export interface Other extends Account {
  registerNumber: string;
  accountNumber: string;
}
