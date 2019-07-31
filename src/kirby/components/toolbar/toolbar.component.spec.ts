/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Spectator, createTestComponentFactory } from '@netbasal/spectator';
import { MockComponent } from 'ng-mocks';
import * as ionic from '@ionic/angular';

import { ToolbarComponent } from './toolbar.component';

import { IconComponent } from '../icon/icon.component';
import { IonTitle } from '@ionic/angular';

fdescribe('ToolbarComponent', () => {
  const title = 'title';
  const showBackButton = true;

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
    spectator = createHost({ title, showBackButton });
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

    it('should trigger rendering of the back button', () => {
      const show = true;

      spectator.setInput('showBackButton', show);

      expect(spectator.query('.toolbar-item-left')).toBeTruthy();
    });

    it('should remove the back button from the DOM', () => {
      const show = false;

      spectator.setInput('showBackButton', show);

      expect(spectator.query('.toolbar-item-left')).not.toBeTruthy();
    });
  });
});
