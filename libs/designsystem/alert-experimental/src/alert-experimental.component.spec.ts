import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

import { AlertExperimentalComponent } from './alert-experimental.component';

const getColor = DesignTokenHelper.getColor;

describe('AlertExperimentalComponent', () => {
  let spectator: SpectatorHost<AlertExperimentalComponent>;

  const createHost = createHostFactory({
    component: AlertExperimentalComponent,
  });

  beforeEach(() => {
    spectator = createHost(`
      <kirby-alert-experimental 
        okButton="Test OK Button Text"
        cancelButton="Test Cancel Button Text"
      >
      </kirby-alert-experimental>
    `);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('ok button', () => {
    let okButton: HTMLElement;

    beforeEach(() => {
      okButton = spectator.query('.ok-btn');
    });
    it('should render', () => {
      const expected = 'Test OK Button Text';

      expect(spectator.component.okButton).toEqual(expected);
      expect(okButton).toHaveText(expected);
    });

    it('should support isDestructive', () => {
      spectator.setInput({ okButtonIsDestructive: true });

      expect(okButton).toBeDefined();
      expect(okButton).toHaveClass('destructive');
    });

    it('should default to not being destructive', () => {
      expect(okButton).toBeDefined();
      expect(okButton).not.toHaveClass('destructive');
    });

    it('should have large ok button when no cancel button', () => {
      spectator.setInput({ cancelButton: null });

      expect(okButton).toHaveClass('lg');
    });

    it('should have success colors on button', () => {
      expect(okButton).toHaveComputedStyle({
        'background-color': getColor('success'),
        color: getColor('success', 'contrast'),
      });
    });

    it('should have default size when cancel button', () => {
      expect(okButton.attributes['ng-reflect-size']).toBeUndefined();
    });
  });

  describe('cancel button', () => {
    let cancelButton: HTMLElement;

    beforeEach(() => {
      cancelButton = spectator.query('.cancel-btn');
    });
    it('should render', () => {
      const expected = 'Test Cancel Button Text';

      expect(spectator.component.cancelButton).toEqual(expected);
      expect(cancelButton).toHaveText(expected);
    });

    it('should not render when cancelBtn not set', () => {
      spectator.setInput({ cancelButton: null });

      expect(spectator.query('.cancel-btn')).toBeNull();
    });
  });

  describe('icon', () => {
    it('should render', () => {
      spectator.setInput({ iconName: 'warning' });
      const icon: HTMLElement = spectator.query('.icon-outline');

      expect(icon).not.toBeNull();
    });
  });
});
