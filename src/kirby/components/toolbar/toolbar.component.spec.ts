import { Spectator, createTestComponentFactory } from '@netbasal/spectator';
import { MockComponent } from 'ng-mocks';
import * as ionic from '@ionic/angular';

import { ToolbarComponent } from './toolbar.component';

import { IconComponent } from '../icon/icon.component';

fdescribe('ToolbarComponent', () => {
  const title = 'title';
  const hideBackButton = false;

  let spectator: Spectator<ToolbarComponent>;

  const createHost = createTestComponentFactory({
    component: ToolbarComponent,
    declarations: [
      MockComponent(ionic.IonToolbar),
      MockComponent(ionic.IonTitle),
      MockComponent(IconComponent),
    ],
  });

  beforeEach(() => {
    spectator = createHost({ title, hideBackButton });
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('event: back', () => {
    it('should be called once', () => {
      spyOn(spectator.component.backButtonSelected, 'emit');

      spectator.component.onBackButtonSelected();

      expect(spectator.component.backButtonSelected.emit).toHaveBeenCalledTimes(1);
    });
  });

  describe('Inputs', () => {
    it('should set the text in ion-title', () => {
      const titleChange = 'test';

      spectator.setInput('title', titleChange);

      expect(spectator.query('ion-title').textContent).toContain(titleChange);
    });

    it('should remove the back button from the DOM', () => {
      const hide = true;

      spectator.setInput('hideBackButton', hide);

      expect(spectator.query('.toolbar-item-left')).not.toBeTruthy();
    });

    it('should render the back button', () => {
      const hide = false;

      spectator.setInput('hideBackButton', hide);

      expect(spectator.query('.toolbar-item-left')).toBeTruthy();
    });
  });
});
