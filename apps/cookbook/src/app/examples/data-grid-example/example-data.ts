export interface Customer {
  id: number;
  name: string;
  email: string;
  age: number;
  balance: number;
  status: 'active' | 'inactive' | 'blocked';
}

export const customers: Customer[] = [
  {
    id: 1,
    name: 'Anna Jensen',
    email: 'anna.jensen@example.com',
    age: 32,
    balance: 12_450,
    status: 'active',
  },
  {
    id: 2,
    name: 'Peter Nielsen',
    email: 'peter.nielsen@example.com',
    age: 41,
    balance: 3_200,
    status: 'inactive',
  },
  {
    id: 3,
    name: 'Maja Sørensen',
    email: 'maja.sorensen@example.com',
    age: 27,
    balance: 28_900,
    status: 'active',
  },
  {
    id: 4,
    name: 'Jonas Larsen',
    email: 'jonas.larsen@example.com',
    age: 54,
    balance: -750,
    status: 'blocked',
  },
  {
    id: 5,
    name: 'Sofie Andersen',
    email: 'sofie.andersen@example.com',
    age: 36,
    balance: 7_850,
    status: 'active',
  },
  {
    id: 6,
    name: 'Emil Christiansen',
    email: 'emil.christiansen@example.com',
    age: 29,
    balance: 15_600,
    status: 'active',
  },
  {
    id: 7,
    name: 'Freja Madsen',
    email: 'freja.madsen@example.com',
    age: 45,
    balance: 980,
    status: 'inactive',
  },
  {
    id: 8,
    name: 'Oliver Thomsen',
    email: 'oliver.thomsen@example.com',
    age: 38,
    balance: 42_300,
    status: 'active',
  },
  {
    id: 9,
    name: 'Clara Poulsen',
    email: 'clara.poulsen@example.com',
    age: 24,
    balance: -1_250,
    status: 'blocked',
  },
  {
    id: 10,
    name: 'Lucas Mortensen',
    email: 'lucas.mortensen@example.com',
    age: 61,
    balance: 6_400,
    status: 'inactive',
  },
];
