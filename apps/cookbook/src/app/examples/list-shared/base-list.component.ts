export class BaseListComponent {
  public itemsFullList: any[] = Array.from({ length: 1000 }, (_, id) => ({
    id,
    title: `Item Title ${id}`,
    subTitle: `${Math.floor(Math.random() * 2000)} pcs`,
    amount: Math.floor(Math.random() * 10001) - 8000,
    detail: Math.floor(Math.random() * 401) - 200,
    isStandAlone: id % 15 === 0 ? true : undefined,
  }));

  public items: any[] = this.itemsFullList.slice(0, 8);

  onItemSelect(item: any) {
    alert(`You have clicked the row [${item.title} ${item.amount}]`);
  }
}
