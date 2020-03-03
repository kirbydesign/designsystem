import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MockModule } from 'ng-mocks';
import { IonicModule } from '@ionic/angular';

import { ReorderListComponent } from './reorder-list.component';
import { CardComponent } from '@kirbydesign/designsystem';
import { ItemComponent } from './../item/item.component';

fdescribe('ReorderListComponent', () => {
  let spectator: Spectator<ReorderListComponent>;
  let component: ReorderListComponent;

  function runNgOnChanges() {
    // Forces ngOnChanges to run (since that won't happen, when inputs are changed programmatically)
    component.ngOnChanges();
    // Detect changes, since ngOnChanges altered state of component
    spectator.detectChanges();
  }

  const createHost = createComponentFactory({
    imports: [MockModule(IonicModule)],
    component: ReorderListComponent,
    declarations: [CardComponent, ItemComponent],
  });

  beforeEach(() => {
    spectator = createHost({});
    component = spectator.component;
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('items', () => {
    it('should accept null items without errors', () => {
      spectator.setInput({
        items: null,
      });
      runNgOnChanges();

      expect(spectator.component.items).toBe(null);
    });
  });
});
