import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

import { IconModule } from '@kirbydesign/designsystem/icon';
import { AlertComponent } from './alert.component';
const getColor = DesignTokenHelper.getColor;

describe('AlertComponent', () => {
  let spectator: SpectatorHost<AlertComponent>;

  const createHost = createHostFactory({
    component: AlertComponent,
    imports: [IconModule],
  });

  beforeEach(() => {
    spectator = createHost(`
      <kirby-alert 
        okBtn="Test OK Button Text"
        cancelBtn="Test Cancel Button Text"
      >
      </kirby-alert>
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

      expect(spectator.component.okBtn).toEqual(expected);
      expect(okButton).toHaveText(expected);
    });

    it('should support isDestructive', () => {
      spectator.setInput({ okBtnIsDestructive: true });

      expect(okButton).toBeDefined();
      expect(okButton).toHaveClass('destructive');
    });

    it('should default to not being destructive', () => {
      expect(okButton).toBeDefined();
      expect(okButton).not.toHaveClass('destructive');
    });

    it('should have large ok button when no cancel button', () => {
      spectator.setInput({ cancelBtn: null });

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

      expect(spectator.component.cancelBtn).toEqual(expected);
      expect(cancelButton).toHaveText(expected);
    });

    it('should not render when cancelBtn not set', () => {
      spectator.setInput({ cancelBtn: null });

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
