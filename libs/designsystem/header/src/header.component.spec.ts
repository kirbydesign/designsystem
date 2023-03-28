import { createHostFactory, Spectator } from '@ngneat/spectator';

import { TestHelper } from '@kirbydesign/designsystem/testing';
import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

import { FlagComponent } from 'flag/src';
import { AvatarComponent } from 'avatar/src';
import { HeaderModule } from './header.module';
import { HeaderComponent } from './header.component';

const { fontSize } = DesignTokenHelper;

describe('HeaderComponent', () => {
  let createHost;
  createHost = createHostFactory({
    component: HeaderComponent,
    imports: [TestHelper.ionicModuleForTest, HeaderModule, FlagComponent, AvatarComponent],
    detectChanges: true,
  });

  describe('by default', () => {
    const title = 'title';
    const subtitle1 = 'Subtitle one';
    const subtitle2 = 'Subtitle two';

    let spectator: Spectator<HeaderComponent>;
    beforeEach(() => {
      spectator = createHost(`
      <kirby-header title="${title}" subtitle1="${subtitle1}" subtitle2="${subtitle2}">
      </kirby-header>
      `);
    });

    it(`should have correct title`, () => {
      const titleElement = spectator.query('h1.title');

      expect(titleElement).toContainText(title);
      expect(titleElement).toHaveComputedStyle({
        'font-size': '32px',
      });
    });

    it(`should have correct subtitle1`, () => {
      const subtitle1Element = spectator.query('.subtitle1');

      expect(subtitle1Element).toContainText(subtitle1);
      expect(subtitle1Element).toHaveComputedStyle({
        'font-size': '14px',
      });
    });

    it(`should have subtitle2`, () => {
      const subtitle2Element = spectator.query('.subtitle2');

      expect(subtitle2Element).toContainText(subtitle2);
      expect(subtitle2Element).toHaveComputedStyle({
        'font-size': '14px',
      });
    });
  });

  describe('with value', () => {
    const title = 'title';
    const value = '12.345,67';
    const valueUnit = 'USD';

    let spectator: Spectator<HeaderComponent>;
    beforeEach(() => {
      spectator = createHost(`
      <kirby-header title="${title}" value="${value}" valueUnit="${valueUnit}">
      </kirby-header>
      `);
    });

    it(`should have correct title`, () => {
      const keyElement = spectator.query('h1.title');

      expect(keyElement).toContainText(title);
      expect(keyElement).toHaveComputedStyle({
        'font-size': '18px',
      });
    });
    it(`should have correct value`, () => {
      const valueElement = spectator.query('h3.value');

      expect(valueElement).toContainText(value);
      expect(valueElement).toHaveComputedStyle({
        'font-size': '40px',
      });
    });

    it(`should have correct valueUnit`, () => {
      const valueUnitElement = spectator.query('.value-unit');

      expect(valueUnitElement).toContainText(valueUnit);
      const valueFontSize = parseInt(fontSize('xxl'));
      const valueUnitFontSize = valueFontSize * 0.5;
      expect(valueUnitElement).toHaveComputedStyle({
        'font-size': `${valueUnitFontSize}px`,
      });
    });
  });

  describe('with avatar', () => {
    const title = 'title';
    const subtitle1 = 'Subtitle one';
    const subtitle2 = 'Subtitle two';

    let spectator: Spectator<HeaderComponent>;
    beforeEach(() => {
      spectator = createHost(`
      <kirby-header title="${title}" subtitle1="${subtitle1}" subtitle2="${subtitle2}">
        <kirby-avatar size="lg" text="A" title="lg"></kirby-avatar>
      </kirby-header>
      `);
    });

    it(`should have correct avatar`, () => {
      const avatarElement = spectator.query('kirby-avatar');

      expect(avatarElement).toBeTruthy();
    });
  });

  describe('with flag', () => {
    const title = 'title';
    const subtitle1 = 'Subtitle one';
    const subtitle2 = 'Subtitle two';

    let spectator: Spectator<HeaderComponent>;
    beforeEach(() => {
      spectator = createHost(`
      <kirby-header title="${title}" subtitle1="${subtitle1}" subtitle2="${subtitle2}">
        <kirby-flag themeColor="warning">Warning</kirby-flag>
      </kirby-header>
      `);
    });

    it(`should have correct flag`, () => {
      const avatarElement = spectator.query('kirby-flag');

      expect(avatarElement).toBeTruthy();
    });
  });
});
