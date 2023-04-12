export const templateUrl = `
<kirby-list [items]="items" [swipeActions]="actions">
  <kirby-item *kirbyListItemTemplate="let item">
    <h3>{{item.title}}</h3>
    <data slot="end">{{item.amount}}</data>
  </kirby-item>
</kirby-list>`;

// eslint-disable-next-line @typescript-eslint/ban-types
export const stringifyProp = (prop: Object) => JSON.stringify(prop, null, 2);
