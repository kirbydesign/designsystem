import { fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonBackdrop, IonFab, IonFabButton, IonFabList, IonIcon } from '@ionic/angular';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { TestHelper } from '../../testing/test-helper';
import { ButtonComponent } from '../button/button.component';
import { CardComponent, CardHeaderComponent } from '../card';
import { IconComponent } from '../icon';
import { ActionSheetComponent, ActionSheetItem } from '../modal';

import { FabSheetComponent } from './fab-sheet.component';

fdescribe('FabSheetComponent', () => {
  let spectator: SpectatorHost<FabSheetComponent>;
  let component: FabSheetComponent;
  let ionFabButtonElement: HTMLIonFabButtonElement;

  const createHost = createHostFactory({
    component: FabSheetComponent,
    imports: [TestHelper.ionicModuleForTest, RouterTestingModule],
    declarations: [
      IonFab,
      IonFabButton,
      IonFabList,
      IonBackdrop,
      IconComponent,
      IonIcon,
      ActionSheetComponent,
      CardComponent,
      CardHeaderComponent,
      ButtonComponent,
    ],
  });

  const items: ActionSheetItem[] = [
    { id: '1', text: 'Option 1' },
    { id: '2', text: 'Option 2' },
    { id: '3', text: 'Option 3' },
  ];

  beforeEach(async () => {
    spectator = createHost(
      `<kirby-fab-sheet>
          <kirby-icon name="write-message"></kirby-icon>
          <kirby-action-sheet
            header="Your action sheet header"
            subheader="Your action sheet subheader"
            [items]="items"
          >
          </kirby-action-sheet>
        </kirby-fab-sheet>`,
      {
        hostProps: {
          items: items,
        },
      }
    );
    component = spectator.component;
    ionFabButtonElement = spectator.query('ion-fab-button');
    await TestHelper.whenReady(ionFabButtonElement);
  });

  describe("when 'fabSheet' is closed", () => {
    it("should open when 'fabButton' is clicked", fakeAsync(() => {
      spectator.click(ionFabButtonElement);
      tick();
      expect(component.isFabSheetOpen).toBe(true);
      expect(component.isBackdropVisible).toBe(true);
    }));
  });

  describe("when 'fabSheet' is open", () => {
    beforeEach(fakeAsync(() => {
      spectator.click(ionFabButtonElement);
      tick();
    }));

    it("should close backdrop when 'actionSheet' item is seleccted", fakeAsync(() => {
      spectator.click('button[kirby-button]');
      tick();
      expect(component.isFabSheetOpen).toBe(false);
      expect(component.isBackdropVisible).toBe(false);
    }));
  });
});
