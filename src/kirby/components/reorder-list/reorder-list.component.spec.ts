// import { Spectator, createComponentFactory } from '@ngneat/spectator';
// import { MockModule } from 'ng-mocks';
// import { IonicModule } from '@ionic/angular';

// import { IconModule } from '@kirbydesign/designsystem/components/icon/icon.module';
// import { ReorderListComponent } from './reorder-list.component';
// import { CardComponent } from '@kirbydesign/designsystem';
// import { ItemComponent } from './../item/item.component';

// fdescribe('ReorderListComponent', () => {
//   let spectator: Spectator<ReorderListComponent>;
//   let component: ReorderListComponent;
//   const items = [
//     { title: '1', subItems: [{ title: '1a' }, { title: '1b' }, { title: '1c' }] },
//     { title: '2' },
//     { title: '3' },
//   ];

//   const headerTexts = ['headerText1'];

//   function runNgOnChanges() {
//     // Forces ngOnChanges to run (since that won't happen, when inputs are changed programmatically)
//     component.ngOnChanges();
//     // Detect changes, since ngOnChanges altered state of component
//     spectator.detectChanges();
//   }

//   const createHost = createComponentFactory({
//     imports: [MockModule(IonicModule), IconModule],
//     component: ReorderListComponent,
//     declarations: [CardComponent, ItemComponent],
//   });

//   beforeEach(() => {
//     spectator = createHost({
//       props: {
//         items: items,
//         subItemsName: 'subItems',
//         headerTexts: headerTexts,
//       },
//     });
//     component = spectator.component;
//   });

//   it('should create', () => {
//     expect(spectator.component).toBeTruthy();
//   });

//   describe('headerTexts', () => {
//     it('should always show the ´move´ text', () => {
//       expect(spectator.queryLast('.section-header span')).toHaveText('flyt');
//     });

//     it('should show input headerTexts plus the mandatory ´move´ text', () => {
//       expect(spectator.queryAll('.section-header span').length).toBe(headerTexts.length + 1);
//     });
//   });

//   describe('items', () => {
//     it('should render a card for each item in array', () => {
//       expect(spectator.queryAll('kirby-card').length).toBe(items.length);
//     });

//     it('should accept null items without errors', () => {
//       spectator.setInput({
//         items: null,
//       });
//       runNgOnChanges();

//       expect(spectator.component.items).toBe(null);
//     });

//     // it('should emit reorder event when reordering item', () => {
//     //   let firstReorder = spectator.query('ion-reorder ion-icon');

//     //   spectator.dispatchMouseEvent(firstReorder, 'mousedown', 50,75);

//     //   spectator.dispatchMouseEvent(firstReorder, 'mouseup');
//     //   spectator.detectChanges();

//     //   expect(spectator.component.items).toBe(null);
//     // });
//   });

//   describe('subItems', () => {
//     it('should render a kirby-item for each item in subitems array', () => {
//       expect(spectator.queryAll('kirby-card ion-reorder-group kirby-item').length).toBe(
//         items[0].subItems.length
//       );
//     });

//     it('should accept invalid name, but not show anything', () => {
//       spectator.setInput({
//         items: items,
//         subItemsName: 'invalidName',
//       });
//       runNgOnChanges();

//       expect(spectator.queryAll('kirby-card ion-reorder-group kirby-item').length).toBe(0);
//     });

//     it('should not show anything, if subitems array is empty', () => {
//       items[0].subItems = [];
//       spectator.setInput({
//         items: items,
//         subItemsName: 'subItems',
//       });
//       runNgOnChanges();

//       expect(spectator.queryAll('kirby-card ion-reorder-group kirby-item').length).toBe(0);
//     });
//   });
// });
