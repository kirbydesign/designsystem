export interface Transaction {
  id: string;
  text: string;
  amount: {
    amount: number;
    currencyCode: string;
  };
  iconName: string;
  date: {
    epoch: number;
    utc: string;
  };
  category: {
    id: string;
  };
  balance: {
    amount: number;
  };
  balanced: boolean;
}
