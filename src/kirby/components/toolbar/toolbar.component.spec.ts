import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import * as ionic from '@ionic/angular';

import { ToolbarComponent } from './toolbar.component';

import { IconComponent } from '../icon/icon.component';

describe('ToolbarComponent', () => {
  const title = 'title';
  const hideBackButton = false;

  let spectator: Spectator<ToolbarComponent>;

  const createHost = createComponentFactory({
    component: ToolbarComponent,
    declarations: [
      MockComponent(ionic.IonToolbar),
      MockComponent(ionic.IonTitle),
      MockComponent(IconComponent),
    ],
  });

  beforeEach(() => {
    spectator = createHost({ props: { title, hideBackButton } });
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('event: back', () => {
    it('should be called once', () => {
      spyOn(spectator.component.back, 'emit');

      spectator.component.onBackButtonSelect();

      expect(spectator.component.back.emit).toHaveBeenCalledTimes(1);
    });
  });

  describe('event: primarySelect', () => {
    it('should be called once', () => {
      spyOn(spectator.component.primarySelect, 'emit');

      spectator.component.onPrimarySelect();

      expect(spectator.component.primarySelect.emit).toHaveBeenCalledTimes(1);
    });
  });

  describe('event: secondarySelect', () => {
    it('should be called once', () => {
      spyOn(spectator.component.secondarySelect, 'emit');

      spectator.component.onSecondarySelect();

      expect(spectator.component.secondarySelect.emit).toHaveBeenCalledTimes(1);
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

      expect(spectator.query('.toolbar-start')).not.toBeTruthy();
    });

    it('should render the back button', () => {
      const hide = false;

      spectator.setInput('hideBackButton', hide);

      expect(spectator.query('.item-start')).toBeTruthy();
    });
  });
});
