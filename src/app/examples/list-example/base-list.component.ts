export class BaseListComponent {
    myItems = [
        {title: 'Vestas Wind Systems', subTitle: '20 stk', amount: '18.309 DKK', detail: 225},
        {title: 'A.P. Møller-Mærsk', subTitle: '2 stk', amount: '14.019 DKK', detail: 0},
        {title: 'Novo Nordisk A/S B', subTitle: '18 stk', amount: '7560 DKK', detail: 171},
        {title: 'Danske Bank A/S', subTitle: '10 stk', amount: '1560 DKK', detail: -171},
    ];

    onItemSelect(item: any) {
        alert(`You have clicked the row [${item.title} ${item.amount}]`);
    }
}
