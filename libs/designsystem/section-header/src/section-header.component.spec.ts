import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { TestHelper } from '@kirbydesign/designsystem/testing';
import { SectionHeaderComponent } from './section-header.component';

const { fontSize, fontWeight, lineHeight } = DesignTokenHelper;

describe('SectionHeaderComponent', () => {
  let spectator: SpectatorHost<SectionHeaderComponent>;

  const createHost = createHostFactory({
    component: SectionHeaderComponent,
  });

  beforeEach(async () => {
    spectator = createHost<SectionHeaderComponent>(`<kirby-section-header>
      <p heading>Section Header</p>
      <p label>Section Header</p>
      <p detail>Section Header</p>
    </kirby-section-header>`);
    // Ensure ion-item-divider is ready and styles are applied:
    await TestHelper.whenReady(spectator.queryHost('ion-item-divider'));
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('with heading, detail and label attributes', () => {
    it('should have heading with correct typography styles', () => {
      const heading = spectator.queryHost<HTMLElement>('[heading]');
      expect(heading).toHaveComputedStyle({
        'font-size': fontSize('m'),
        'font-weight': fontWeight('bold'),
        'line-height': lineHeight('m'),
      });
    });

    it('should have detail with correct typography styles', () => {
      const detail = spectator.queryHost<HTMLElement>('[detail]');
      expect(detail).toHaveComputedStyle({
        'font-size': fontSize('s'),
        'font-weight': fontWeight('light'),
        'line-height': lineHeight('s'),
      });
    });

    it('should have label with correct typography styles', () => {
      const label = spectator.queryHost<HTMLElement>('[label]');
      expect(label).toHaveComputedStyle({
        'font-size': fontSize('s'),
        'font-weight': fontWeight('light'),
        'line-height': lineHeight('s'),
      });
    });
  });

  describe('ion-item-divider inside section header', () => {
    it('should have correct z-index', () => {
      const divider = spectator.queryHost('ion-item-divider');
      expect(divider).toHaveComputedStyle({
        'z-index': 'auto',
      });
    });
  });
});

describe('SectionHeaderComponent heading level: large (h2)', () => {
  let spectator: SpectatorHost<SectionHeaderComponent>;

  const createHost = createHostFactory({
    component: SectionHeaderComponent,
  });

  beforeEach(async () => {
    spectator = createHost<SectionHeaderComponent>(`<kirby-section-header>
      <h2 heading>Section Header</h2>
    </kirby-section-header>`);
    await TestHelper.whenReady(spectator.queryHost('ion-item-divider'));
  });

  it('should apply large typography when using h2 element', () => {
    const heading = spectator.queryHost<HTMLElement>('[heading]');
    expect(heading).toHaveComputedStyle({
      'font-size': fontSize('l'),
      'font-weight': fontWeight('bold'),
      'line-height': lineHeight('l'),
    });
  });
});

describe('SectionHeaderComponent heading level: large (.kirby-text-large)', () => {
  let spectator: SpectatorHost<SectionHeaderComponent>;

  const createHost = createHostFactory({
    component: SectionHeaderComponent,
  });

  beforeEach(async () => {
    spectator = createHost<SectionHeaderComponent>(`<kirby-section-header>
      <p heading class="kirby-text-large">Section Header</p>
    </kirby-section-header>`);
    await TestHelper.whenReady(spectator.queryHost('ion-item-divider'));
  });

  it('should apply large typography when using .kirby-text-large class', () => {
    const heading = spectator.queryHost<HTMLElement>('[heading]');
    expect(heading).toHaveComputedStyle({
      'font-size': fontSize('l'),
      'font-weight': fontWeight('bold'),
      'line-height': lineHeight('l'),
    });
  });
});

describe('SectionHeaderComponent heading level: medium (h3, default)', () => {
  let spectator: SpectatorHost<SectionHeaderComponent>;

  const createHost = createHostFactory({
    component: SectionHeaderComponent,
  });

  beforeEach(async () => {
    spectator = createHost<SectionHeaderComponent>(`<kirby-section-header>
      <h3 heading>Section Header</h3>
    </kirby-section-header>`);
    await TestHelper.whenReady(spectator.queryHost('ion-item-divider'));
  });

  it('should apply medium typography when using h3 element', () => {
    const heading = spectator.queryHost<HTMLElement>('[heading]');
    expect(heading).toHaveComputedStyle({
      'font-size': fontSize('m'),
      'font-weight': fontWeight('bold'),
      'line-height': lineHeight('m'),
    });
  });
});

describe('SectionHeaderComponent heading level: normal (h4)', () => {
  let spectator: SpectatorHost<SectionHeaderComponent>;

  const createHost = createHostFactory({
    component: SectionHeaderComponent,
  });

  beforeEach(async () => {
    spectator = createHost<SectionHeaderComponent>(`<kirby-section-header>
      <h4 heading>Section Header</h4>
    </kirby-section-header>`);
    await TestHelper.whenReady(spectator.queryHost('ion-item-divider'));
  });

  it('should apply normal typography when using h4 element', () => {
    const heading = spectator.queryHost<HTMLElement>('[heading]');
    expect(heading).toHaveComputedStyle({
      'font-size': fontSize('n'),
      'font-weight': fontWeight('bold'),
      'line-height': lineHeight('n'),
    });
  });
});

describe('SectionHeaderComponent heading level: normal (.kirby-text-normal)', () => {
  let spectator: SpectatorHost<SectionHeaderComponent>;

  const createHost = createHostFactory({
    component: SectionHeaderComponent,
  });

  beforeEach(async () => {
    spectator = createHost<SectionHeaderComponent>(`<kirby-section-header>
      <p heading class="kirby-text-normal">Section Header</p>
    </kirby-section-header>`);
    await TestHelper.whenReady(spectator.queryHost('ion-item-divider'));
  });

  it('should apply normal typography when using .kirby-text-normal class', () => {
    const heading = spectator.queryHost<HTMLElement>('[heading]');
    expect(heading).toHaveComputedStyle({
      'font-size': fontSize('n'),
      'font-weight': fontWeight('bold'),
      'line-height': lineHeight('n'),
    });
  });
});

describe('SectionHeaderComponent heading level: medium (.kirby-text-medium)', () => {
  let spectator: SpectatorHost<SectionHeaderComponent>;

  const createHost = createHostFactory({
    component: SectionHeaderComponent,
  });

  beforeEach(async () => {
    spectator = createHost<SectionHeaderComponent>(`<kirby-section-header>
      <h2 heading class="kirby-text-medium">Section Header</h2>
    </kirby-section-header>`);
    await TestHelper.whenReady(spectator.queryHost('ion-item-divider'));
  });

  it('should override h2 to medium typography when using .kirby-text-medium class', () => {
    const heading = spectator.queryHost<HTMLElement>('[heading]');
    expect(heading).toHaveComputedStyle({
      'font-size': fontSize('m'),
      'font-weight': fontWeight('bold'),
      'line-height': lineHeight('m'),
    });
  });
});

describe('SectionHeaderComponent heading level: normal (h5)', () => {
  let spectator: SpectatorHost<SectionHeaderComponent>;

  const createHost = createHostFactory({
    component: SectionHeaderComponent,
  });

  beforeEach(async () => {
    spectator = createHost<SectionHeaderComponent>(`<kirby-section-header>
      <h5 heading>Section Header</h5>
    </kirby-section-header>`);
    await TestHelper.whenReady(spectator.queryHost('ion-item-divider'));
  });

  it('should apply normal typography when using h5 element', () => {
    const heading = spectator.queryHost<HTMLElement>('[heading]');
    expect(heading).toHaveComputedStyle({
      'font-size': fontSize('n'),
      'font-weight': fontWeight('bold'),
      'line-height': lineHeight('n'),
    });
  });
});

describe('SectionHeaderComponent heading level: normal (h6)', () => {
  let spectator: SpectatorHost<SectionHeaderComponent>;

  const createHost = createHostFactory({
    component: SectionHeaderComponent,
  });

  beforeEach(async () => {
    spectator = createHost<SectionHeaderComponent>(`<kirby-section-header>
      <h6 heading>Section Header</h6>
    </kirby-section-header>`);
    await TestHelper.whenReady(spectator.queryHost('ion-item-divider'));
  });

  it('should apply normal typography when using h6 element', () => {
    const heading = spectator.queryHost<HTMLElement>('[heading]');
    expect(heading).toHaveComputedStyle({
      'font-size': fontSize('n'),
      'font-weight': fontWeight('bold'),
      'line-height': lineHeight('n'),
    });
  });
});
