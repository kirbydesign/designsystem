import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { LabelComponent } from '@kirbydesign/designsystem/item';

import { SectionHeaderComponent } from './section-header.component';

const { fontSize, fontWeight, lineHeight } = DesignTokenHelper;

describe('SectionHeaderComponent with Kirby Label', () => {
  let spectator: SpectatorHost<SectionHeaderComponent>;

  const createHost = createHostFactory({
    component: SectionHeaderComponent,
    imports: [SectionHeaderComponent, LabelComponent],
  });

  beforeEach(() => {
    spectator = createHost<SectionHeaderComponent>(`<kirby-section-header>
      <kirby-label>
        <p heading>Section Header</p>
        <p label>Section Header</p>
        <p detail>Section Header</p>
      </kirby-label>
    </kirby-section-header>`);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('with kirby-label around heading, detail and label', () => {
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
});

describe('SectionHeaderComponent heading levels with Kirby Label: large (h2)', () => {
  let spectator: SpectatorHost<SectionHeaderComponent>;

  const createHost = createHostFactory({
    component: SectionHeaderComponent,
    imports: [SectionHeaderComponent, LabelComponent],
  });

  beforeEach(() => {
    spectator = createHost<SectionHeaderComponent>(`<kirby-section-header>
      <kirby-label>
        <h2 heading>Section Header</h2>
        <p label>Label</p>
      </kirby-label>
    </kirby-section-header>`);
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

describe('SectionHeaderComponent heading levels with Kirby Label: medium (h3)', () => {
  let spectator: SpectatorHost<SectionHeaderComponent>;

  const createHost = createHostFactory({
    component: SectionHeaderComponent,
    imports: [SectionHeaderComponent, LabelComponent],
  });

  beforeEach(() => {
    spectator = createHost<SectionHeaderComponent>(`<kirby-section-header>
      <kirby-label>
        <h3 heading>Section Header</h3>
        <p label>Label</p>
      </kirby-label>
    </kirby-section-header>`);
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

describe('SectionHeaderComponent heading levels with Kirby Label: normal (h4)', () => {
  let spectator: SpectatorHost<SectionHeaderComponent>;

  const createHost = createHostFactory({
    component: SectionHeaderComponent,
    imports: [SectionHeaderComponent, LabelComponent],
  });

  beforeEach(() => {
    spectator = createHost<SectionHeaderComponent>(`<kirby-section-header>
      <kirby-label>
        <h4 heading>Section Header</h4>
        <p label>Label</p>
      </kirby-label>
    </kirby-section-header>`);
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

describe('SectionHeaderComponent heading levels with Kirby Label: large (.kirby-text-large)', () => {
  let spectator: SpectatorHost<SectionHeaderComponent>;

  const createHost = createHostFactory({
    component: SectionHeaderComponent,
    imports: [SectionHeaderComponent, LabelComponent],
  });

  beforeEach(() => {
    spectator = createHost<SectionHeaderComponent>(`<kirby-section-header>
      <kirby-label>
        <p heading class="kirby-text-large">Section Header</p>
        <p label>Label</p>
      </kirby-label>
    </kirby-section-header>`);
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

describe('SectionHeaderComponent heading levels with Kirby Label: normal (.kirby-text-normal)', () => {
  let spectator: SpectatorHost<SectionHeaderComponent>;

  const createHost = createHostFactory({
    component: SectionHeaderComponent,
    imports: [SectionHeaderComponent, LabelComponent],
  });

  beforeEach(() => {
    spectator = createHost<SectionHeaderComponent>(`<kirby-section-header>
      <kirby-label>
        <p heading class="kirby-text-normal">Section Header</p>
        <p label>Label</p>
      </kirby-label>
    </kirby-section-header>`);
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

describe('SectionHeaderComponent heading levels with Kirby Label: medium (.kirby-text-medium)', () => {
  let spectator: SpectatorHost<SectionHeaderComponent>;

  const createHost = createHostFactory({
    component: SectionHeaderComponent,
    imports: [SectionHeaderComponent, LabelComponent],
  });

  beforeEach(() => {
    spectator = createHost<SectionHeaderComponent>(`<kirby-section-header>
      <kirby-label>
        <h2 heading class="kirby-text-medium">Section Header</h2>
        <p label>Label</p>
      </kirby-label>
    </kirby-section-header>`);
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

describe('SectionHeaderComponent heading levels with Kirby Label: normal (h5)', () => {
  let spectator: SpectatorHost<SectionHeaderComponent>;

  const createHost = createHostFactory({
    component: SectionHeaderComponent,
    imports: [SectionHeaderComponent, LabelComponent],
  });

  beforeEach(() => {
    spectator = createHost<SectionHeaderComponent>(`<kirby-section-header>
      <kirby-label>
        <h5 heading>Section Header</h5>
        <p label>Label</p>
      </kirby-label>
    </kirby-section-header>`);
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

describe('SectionHeaderComponent heading levels with Kirby Label: normal (h6)', () => {
  let spectator: SpectatorHost<SectionHeaderComponent>;

  const createHost = createHostFactory({
    component: SectionHeaderComponent,
    imports: [SectionHeaderComponent, LabelComponent],
  });

  beforeEach(() => {
    spectator = createHost<SectionHeaderComponent>(`<kirby-section-header>
      <kirby-label>
        <h6 heading>Section Header</h6>
        <p label>Label</p>
      </kirby-label>
    </kirby-section-header>`);
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
