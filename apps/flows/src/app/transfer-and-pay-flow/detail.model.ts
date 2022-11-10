import { Transfer } from './transfer.model';
export interface Detail extends Transfer {
  amount: string;
  from: string;
  receiver: string;
  text: string;
  message: string;
  date: string;
}
