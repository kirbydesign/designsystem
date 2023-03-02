import { createHostFactory, Spectator } from '@ngneat/spectator';

import { TestHelper } from '@kirbydesign/designsystem/testing';

import { FlagComponent } from 'flag/src';
import { AvatarComponent } from 'avatar/src';
import { HeaderModule } from './header.module';
import { HeaderComponent } from './header.component';

const avatarTagName = 'kirby-avatar';
const getAvatarElement = (spectator: Spectator<HeaderComponent>) => spectator.query(avatarTagName);
const flagTagName = 'kirby-flag';
const getFlagElement = (spectator: Spectator<HeaderComponent>) => spectator.query(flagTagName);
const titleSelector = 'h1.title';
const getTitleElement = (spectator: Spectator<HeaderComponent>) => spectator.query(titleSelector);
const keySelector = 'h1.key';
const getKeyElement = (spectator: Spectator<HeaderComponent>) => spectator.query(keySelector);
const valueSelector = 'h3.value';
const getValueElement = (spectator: Spectator<HeaderComponent>) => spectator.query(valueSelector);
const valueUnitSelector = '.value-unit';
const getValueUnitElement = (spectator: Spectator<HeaderComponent>) =>
  spectator.query(valueUnitSelector);
const subtitle1Selector = '.subtitle1';
const getSubtitle1Element = (spectator: Spectator<HeaderComponent>) =>
  spectator.query(subtitle1Selector);
const subtitle2Selector = '.subtitle2';
const getSubtitle2Element = (spectator: Spectator<HeaderComponent>) =>
  spectator.query(subtitle2Selector);

describe('HeaderComponent', () => {
  let createHost;
  createHost = createHostFactory({
    component: HeaderComponent,
    imports: [TestHelper.ionicModuleForTest, HeaderModule, FlagComponent, AvatarComponent],
    detectChanges: true,
  });

  describe('Default', () => {
    const title = 'title';
    const subtitle1 = 'Subtitle one';
    const subtitle2 = 'Subtitle two';

    const defaultTemplate = `
    <kirby-header title="${title}" subtitle1="${subtitle1}" subtitle2="${subtitle2}">
    </kirby-header>
    `;

    let spectator: Spectator<HeaderComponent>;
    beforeEach(() => {
      spectator = createHost(defaultTemplate);
    });

    it(`should have correct title`, () => {
      const titleElement = getTitleElement(spectator);

      expect(titleElement).toContainText(title);
      expect(titleElement).toHaveComputedStyle({
        'font-size': '32px',
      });
    });

    it(`should have correct subtitle1`, () => {
      const subtitle1Element = getSubtitle1Element(spectator);

      expect(subtitle1Element).toContainText(subtitle1);
      expect(subtitle1Element).toHaveComputedStyle({
        'font-size': '14px',
      });
    });

    it(`should have subtitle2`, () => {
      const subtitle2Element = getSubtitle2Element(spectator);

      expect(subtitle2Element).toContainText(subtitle2);
      expect(subtitle2Element).toHaveComputedStyle({
        'font-size': '14px',
      });
    });
  });

  describe('Value', () => {
    const title = 'title';
    const value = '12.345,67';
    const valueUnit = 'USD';

    const defaultTemplate = `
    <kirby-header title="${title}" value="${value}" valueUnit="${valueUnit}">
    </kirby-header>
    `;

    let spectator: Spectator<HeaderComponent>;
    beforeEach(() => {
      spectator = createHost(defaultTemplate);
    });

    it(`should have correct title`, () => {
      const keyElement = getKeyElement(spectator);

      expect(keyElement).toContainText(title);
      expect(keyElement).toHaveComputedStyle({
        'font-size': '18px',
      });
    });
    it(`should have correct value`, () => {
      const valueElement = getValueElement(spectator);

      expect(valueElement).toContainText(value);
      expect(valueElement).toHaveComputedStyle({
        'font-size': '40px',
      });
    });

    it(`should have correct valueUnit`, () => {
      const valueUnitElement = getValueUnitElement(spectator);

      expect(valueUnitElement).toContainText(valueUnit);
      expect(valueUnitElement).toHaveComputedStyle({
        'font-size': '16px',
      });
    });
  });

  describe('Avatar', () => {
    const title = 'title';
    const subtitle1 = 'Subtitle one';
    const subtitle2 = 'Subtitle two';

    const defaultTemplate = `
    <kirby-header title="${title}" subtitle1="${subtitle1}" subtitle2="${subtitle2}">
      <kirby-avatar size="lg" text="A" title="lg"></kirby-avatar>
    </kirby-header>
    `;

    let spectator: Spectator<HeaderComponent>;
    beforeEach(() => {
      spectator = createHost(defaultTemplate);
    });

    it(`should have correct avatar`, () => {
      const avatarElement = getAvatarElement(spectator);

      expect(avatarElement).toBeTruthy();
    });
  });

  describe('Flag', () => {
    const title = 'title';
    const subtitle1 = 'Subtitle one';
    const subtitle2 = 'Subtitle two';

    const defaultTemplate = `
    <kirby-header title="${title}" subtitle1="${subtitle1}" subtitle2="${subtitle2}">
      <kirby-flag themeColor="warning">Warning</kirby-flag>
    </kirby-header>
    `;

    let spectator: Spectator<HeaderComponent>;
    beforeEach(() => {
      spectator = createHost(defaultTemplate);
    });

    it(`should have correct flag`, () => {
      const avatarElement = getFlagElement(spectator);

      expect(avatarElement).toBeTruthy();
    });
  });
});
