import { Observable, BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

export class BaseListComponent {
  public items: any[] = [
    {
      title: 'Vestas Wind Systems has a very long name',
      subTitle: '2000 pcs',
      amount: '5.587.218.309 DKK',
      detail: 225,
    },
    {
      title: 'Vestas Wind Systems',
      subTitle: '20 pcs',
      amount: '18.309 DKK',
      detail: 225,
    },
    {
      title: 'A.P. Møller-Mærsk',
      subTitle: '2 pcs',
      amount: '14.019 DKK',
      detail: 0,
    },
    {
      title: 'Novo Nordisk A/S B',
      subTitle: '18 pcs',
      amount: '7560 DKK',
      detail: 171,
    },
    {
      title: 'Danske Bank A/S',
      subTitle: '10 pcs',
      amount: '1560 DKK',
      detail: -171,
    },
  ];

  onItemSelect(item: any) {
    alert(`You have clicked the row [${item.title} ${item.amount}]`);
  }
}
