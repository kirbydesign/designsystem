import { Observable, BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

export class BaseListComponent {
  private items: any[] = [
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
  private obsArray: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.items);
  items$: Observable<any[]> = this.obsArray.asObservable();

  constructor() {}

  onItemSelect(item: any) {
    alert(`You have clicked the row [${item.title} ${item.amount}]`);
  }

  protected addItems(items: any[]): void {
    this.items$.pipe(take(1)).subscribe((val) => {
      val = val ? val : [];
      const newArr = [...val, ...items];
      this.obsArray.next(newArr);
    });
  }
}
