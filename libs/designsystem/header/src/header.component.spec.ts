import { createHostFactory, Spectator } from '@ngneat/spectator';

import { TestHelper } from '@kirbydesign/designsystem/testing';
import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

import { FlagComponent } from 'flag/src';
import { AvatarComponent } from 'avatar/src';
import { IconModule } from 'icon/src';
import { ProgressCircleComponent } from 'progress-circle/src';
import { ActionGroupComponent } from 'action-group/src';
import { HeaderModule } from './header.module';
import { HeaderComponent } from './header.component';

const { fontSize, size } = DesignTokenHelper;

describe('HeaderComponent', () => {
  const createHost = createHostFactory({
    component: HeaderComponent,
    imports: [
      TestHelper.ionicModuleForTest,
      HeaderModule,
      FlagComponent,
      AvatarComponent,
      IconModule,
      ProgressCircleComponent,
      ActionGroupComponent,
    ],
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

      expect(titleElement).toHaveExactTrimmedText(title);
      expect(titleElement).toHaveComputedStyle({
        'font-size': fontSize('xl'),
      });
    });

    it(`should have correct subtitle1`, () => {
      const subtitle1Element = spectator.queryAll('.subtitle')[0];
      const subtitle1SpanElement = subtitle1Element.firstElementChild;
      const expectedFontSize = fontSize('s');
      const spaceCharacterWidthInEm = 0.25;
      const spaceCharacterWidthInPx = `${parseInt(expectedFontSize) * spaceCharacterWidthInEm}px`;

      expect(subtitle1Element).toHaveExactTrimmedText(subtitle1);
      expect(subtitle1Element).toHaveComputedStyle({
        'font-size': expectedFontSize,
        display: 'flex',
        'flex-flow': 'row wrap',
        'column-gap': spaceCharacterWidthInPx,
      });

      expect(subtitle1SpanElement).toHaveComputedStyle({
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap',
        overflow: 'hidden',
      });
    });

    it(`should have correct subtitle2`, () => {
      const subtitle2Element = spectator.queryAll('.subtitle')[1];
      const subtitle2SpanElement = subtitle2Element.firstElementChild;
      const expectedFontSize = fontSize('s');
      const spaceCharacterWidthInEm = 0.25;
      const spaceCharacterWidthInPx = `${parseInt(expectedFontSize) * spaceCharacterWidthInEm}px`;

      expect(subtitle2Element).toHaveExactTrimmedText(subtitle2);
      expect(subtitle2Element).toHaveComputedStyle({
        'font-size': expectedFontSize,
        display: 'flex',
        'flex-flow': 'row wrap',
        'column-gap': spaceCharacterWidthInPx,
      });

      expect(subtitle2SpanElement).toHaveComputedStyle({
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap',
        overflow: 'hidden',
      });
    });

    describe('spacing', () => {
      it(`should have correct margins`, () => {
        expect(spectator.element).toHaveComputedStyle({
          'margin-top': size('m'),
          'margin-bottom': size('l'),
        });
      });

      describe('on small screens', () => {
        beforeAll(async () => {
          await TestHelper.resizeTestWindow(TestHelper.screensize.phone);
        });

        afterAll(() => {
          TestHelper.resetTestWindow();
        });

        it(`should have correct margin-top`, () => {
          expect(spectator.element).toHaveComputedStyle({
            'margin-top': size('s'),
          });
        });
      });
    });
  });

  describe('with subtitle list', () => {
    const subtitles = [
      'Subtitle one first line with a very long text that wont fit on a small screen',
      '&',
      'Subtitle 2 second line',
    ];
    const subtitlesAsString = `['${subtitles.join("','")}']`;

    let spectator: Spectator<HeaderComponent>;
    beforeEach(() => {
      spectator = createHost(`
      <kirby-header title="title" [subtitle1]="${subtitlesAsString}">
      </kirby-header>
      `);
    });

    it(`should have correct subtitle1`, () => {
      const subtitle1Element = spectator.queryAll<HTMLDivElement>('.subtitle')[0];
      const firstSubtitle = subtitle1Element.firstElementChild;
      const secondSubtitle = firstSubtitle.nextElementSibling;
      const thirdSubtitle = secondSubtitle.nextElementSibling;

      expect(firstSubtitle).toHaveExactTrimmedText(subtitles[0]);
      expect(secondSubtitle).toHaveExactTrimmedText(subtitles[1]);
      expect(thirdSubtitle).toHaveExactTrimmedText(subtitles[2]);
    });

    it(`should render all strings in subtitle list`, () => {
      const subtitle1Element = spectator.queryAll<HTMLDivElement>('.subtitle')[0];
      expect(subtitle1Element.children).toHaveLength(subtitles.length);
    });

    it(`should have correct wrapping of subtitles`, () => {
      const subtitle1Element = spectator.queryAll<HTMLDivElement>('.subtitle')[0];
      subtitle1Element.style.width = '200px';
      const firstSubtitle = subtitle1Element.firstElementChild as HTMLElement;
      const secondSubtitle = firstSubtitle.nextElementSibling as HTMLElement;
      const thirdSubtitle = secondSubtitle.nextElementSibling as HTMLElement;
      const firstLineOffsetBottom = firstSubtitle.offsetTop + firstSubtitle.offsetHeight;

      expect(secondSubtitle.offsetTop).toBe(firstLineOffsetBottom);
      expect(thirdSubtitle.offsetTop).toBe(firstLineOffsetBottom);
      expect(secondSubtitle.offsetTop).toBe(thirdSubtitle.offsetTop);
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

      expect(keyElement).toHaveExactTrimmedText(title);
      expect(keyElement).toHaveComputedStyle({
        'font-size': fontSize('m'),
      });
    });

    it(`should have correct value`, () => {
      const valueElement = spectator.query('h3.value');

      expect(valueElement).toHaveExactText(`${value}${valueUnit}`);
      expect(valueElement).toHaveComputedStyle({
        'font-size': fontSize('xxl'),
      });
    });

    it(`should have correct valueUnit`, () => {
      const valueUnitElement = spectator.query('.value-unit');

      expect(valueUnitElement).toHaveExactTrimmedText(valueUnit);
      const valueFontSize = parseInt(fontSize('xxl'));
      const valueUnitFontSize = valueFontSize * 0.5;
      expect(valueUnitElement).toHaveComputedStyle({
        'font-size': `${valueUnitFontSize}px`,
      });
    });

    it(`should have correct title margin`, () => {
      const keyElement = spectator.query('h1.title');

      expect(keyElement).toHaveComputedStyle({
        'margin-bottom': '0px',
      });
    });
  });

  describe('with avatar', () => {
    let spectator: Spectator<HeaderComponent>;
    beforeEach(() => {
      spectator = createHost(`
      <kirby-header title="title" subtitle1="subtitle one" subtitle2="subtitle two">
        <kirby-avatar size="lg" text="A" title="lg"></kirby-avatar>
      </kirby-header>
      `);
    });

    it(`should render the avatar`, () => {
      const avatarElement = spectator.query('kirby-avatar');

      expect(avatarElement).toBeTruthy();
    });

    describe('on small screens', () => {
      beforeAll(async () => {
        await TestHelper.resizeTestWindow(TestHelper.screensize.phone);
      });

      afterAll(() => {
        TestHelper.resetTestWindow();
      });

      it(`should have correct margin-top`, () => {
        expect(spectator.element).toHaveComputedStyle({
          'margin-top': size('xxs'),
        });
      });
    });
  });

  describe('with progress circle', () => {
    let spectator: Spectator<HeaderComponent>;
    beforeEach(() => {
      spectator = createHost(`
      <kirby-header title="title" subtitle1="subtitle one" subtitle2="subtitle two">
        <kirby-progress-circle value="75" themeColor="success" size="lg">  
          <kirby-avatar size="lg" text="A" title="lg"></kirby-avatar>
        </kirby-progress-circle>
      </kirby-header>
      `);
    });

    it(`should render the progress circle`, () => {
      const progressCircleElement = spectator.query('kirby-progress-circle');

      expect(progressCircleElement).toBeTruthy();
    });

    it(`should render the avatar`, () => {
      const avatarElement = spectator.query('kirby-avatar');

      expect(avatarElement).toBeTruthy();
    });

    describe('on small screens', () => {
      beforeAll(async () => {
        await TestHelper.resizeTestWindow(TestHelper.screensize.phone);
      });

      afterAll(() => {
        TestHelper.resetTestWindow();
      });

      it(`should have correct margin-top`, () => {
        expect(spectator.element).toHaveComputedStyle({
          'margin-top': size('xxs'),
        });
      });
    });
  });

  describe('with flag', () => {
    let spectator: Spectator<HeaderComponent>;
    beforeEach(() => {
      spectator = createHost(`
      <kirby-header title="title" subtitle1="subtitle one" subtitle2="subtitle two">
        <kirby-flag themeColor="warning">Warning</kirby-flag>
      </kirby-header>
      `);
    });

    it(`should render the flag`, () => {
      const flagElement = spectator.query('kirby-flag');
      expect(flagElement).toBeTruthy();
    });
  });

  describe('with custom flag', () => {
    let spectator: Spectator<HeaderComponent>;
    const customFlagContent = 'Custom flag content';

    beforeEach(() => {
      spectator = createHost(`
      <kirby-header title="title" subtitle1="subtitle one" subtitle2="subtitle two">
       <div class="custom-flag" *kirbyHeaderCustomFlag>
          ${customFlagContent}
        </div>
      </kirby-header>
      `);
    });

    it(`should render the custom flag content`, () => {
      const CustomflagElement = spectator.query('div.custom-flag');
      expect(CustomflagElement).toBeTruthy();
      expect(CustomflagElement).toHaveExactTrimmedText(customFlagContent);
    });
  });

  describe('with custom section', () => {
    let spectator: Spectator<HeaderComponent>;
    const customSectionContent = 'Custom section content';
    beforeEach(() => {
      spectator = createHost(`
      <kirby-header title="title" subtitle1="subtitle one" subtitle2="subtitle two">
        <div class="custom-section" *kirbyHeaderCustomSection>
          ${customSectionContent}
        </div>
      </kirby-header>
      `);
    });

    it(`should render the custom section`, () => {
      const customSectionElement = spectator.query('div.custom-section');
      expect(customSectionElement).toBeTruthy();
      expect(customSectionElement).toHaveExactTrimmedText(customSectionContent);
    });
  });

  describe('with interactive title', () => {
    let spectator: Spectator<HeaderComponent>;
    beforeEach(() => {
      spectator = createHost(`
      <kirby-header title="title" subtitle1="subtitle one" subtitle2="subtitle two">
        <kirby-icon name="arrow-down" *kirbyHeaderTitleActionIcon></kirby-icon>
      </kirby-header>
      `);
    });

    describe('and no value', () => {
      it('should NOT render the title action icon', () => {
        const iconElement = spectator.query('kirby-icon');
        expect(iconElement).toBeNull();
      });

      it('should NOT emit `titleClick` when title is clicked', () => {
        const titleClickSpy = spyOn(spectator.component.titleClick, 'emit');

        spectator.click('h1.title');

        expect(titleClickSpy).not.toHaveBeenCalled();
      });
    });

    describe('and value', () => {
      beforeEach(() => {
        spectator.component.value = '123';
        spectator.detectComponentChanges();
      });

      it(`should render the title action icon`, () => {
        const iconElement = spectator.query('kirby-icon');
        expect(iconElement).toBeTruthy();
      });

      it('should emit `titleClick` when title is clicked', () => {
        const titleClickSpy = spyOn(spectator.component.titleClick, 'emit');

        spectator.click('h1.title');

        expect(titleClickSpy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('with actions', () => {
    let spectator: Spectator<HeaderComponent>;
    beforeEach(() => {
      spectator = createHost(`
      <kirby-header title="title" subtitle1="subtitle one" subtitle2="subtitle two">
        <kirby-action-group *kirbyHeaderActions>
          <button kirby-button>Action 1</button>
          <button kirby-button>Action 2</button>
        </kirby-action-group>
      </kirby-header>
      `);
    });

    it('should render and show the action group', () => {
      const actionGroup: HTMLElement = spectator.query('.actions kirby-action-group');
      expect(actionGroup).toBeTruthy();
      expect(actionGroup).toBeVisible();
    });

    it(`should have correct margins`, () => {
      const actionsWrapper: HTMLElement = spectator.query('.actions');

      expect(actionsWrapper).toHaveComputedStyle({
        'margin-bottom': '0px',
        'margin-top': '0px',
        'margin-left': size('xxs'),
        'margin-right': size('xxs'),
      });
    });

    describe('on small screens', () => {
      beforeAll(async () => {
        await TestHelper.resizeTestWindow(TestHelper.screensize.phone);
      });

      afterAll(() => {
        TestHelper.resetTestWindow();
      });

      it('should hide the action group', () => {
        const actionGroup: HTMLElement = spectator.query('.actions kirby-action-group');
        expect(actionGroup).toBeHidden();
      });

      describe('with emphasizeActions=true', () => {
        beforeEach(() => {
          spectator.component.emphasizeActions = true;
          spectator.detectComponentChanges();
        });

        it('should show the action group', () => {
          const actionGroup: HTMLElement = spectator.query('.actions kirby-action-group');
          expect(actionGroup).toBeVisible();
        });

        it(`should have correct margins`, () => {
          const actionsWrapper: HTMLElement = spectator.query('.actions');
          expect(actionsWrapper).toHaveComputedStyle({
            'margin-bottom': '0px',
            'margin-top': size('m'),
            'margin-left': size('xxs'),
            'margin-right': size('xxs'),
          });
        });
      });
    });
  });
});
