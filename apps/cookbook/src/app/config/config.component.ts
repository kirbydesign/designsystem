import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@kirbydesign/designsystem';

interface ColorToken {
  name: string;
  cssVar: string;
  value: string;
  defaultValue: string;
}

interface ColorGroup {
  label: string;
  tokens: ColorToken[];
}

interface ColorPreset {
  name: string;
  overrides: Record<string, string>;
}

const PRESETS: ColorPreset[] = [
  {
    name: 'Default (Kirby)',
    overrides: {},
  },
  {
    name: 'Jyske Bank',
    overrides: {
      '--kirby-font-family': 'Jyske',
      '--kirby-primary': '#00422e',
      '--kirby-secondary': '#ecfbdb',
      '--kirby-tertiary': '#00422e',
      '--kirby-primary-contrast': '#ecfbdb',
      '--kirby-secondary-contrast': 'var(--kirby-black)',
      '--kirby-tertiary-contrast': 'var(--kirby-white)',
      '--kirby-background-color': '#f8f5f2',
    },
  },
  {
    name: 'Djurslands Bank',
    overrides: {
      '--kirby-primary': '#005B67',
      '--kirby-secondary': '#F8FCFC',
      '--kirby-tertiary': '#1E818E',
      '--kirby-primary-contrast': 'var(--kirby-white)',
      '--kirby-secondary-contrast': 'var(--kirby-black)',
      '--kirby-tertiary-contrast': 'var(--kirby-white)',
      '--kirby-background-color': '#ECF2F2',
    },
  },
  {
    name: 'Rinkjøbing',
    overrides: {
      '--kirby-font-family': 'Roboto Slab',
      '--kirby-primary': '#2D8C2E',
      '--kirby-secondary': '#F4F9F4',
      '--kirby-tertiary': '#2D8C2E',
      '--kirby-primary-contrast': 'var(--kirby-white)',
      '--kirby-secondary-contrast': 'var(--kirby-black)',
      '--kirby-tertiary-contrast': 'var(--kirby-white)',
      '--kirby-background-color': '#F5F5F5',
    },
  },
  {
    name: 'AL Sydbank',
    overrides: {
      '--kirby-font-family': 'Arial',
      '--kirby-primary': '#AF1E2D',
      '--kirby-secondary': '#fff',
      '--kirby-tertiary': '#002C5B',
      '--kirby-primary-contrast': 'var(--kirby-white)',
      '--kirby-secondary-contrast': 'var(--kirby-black)',
      '--kirby-tertiary-contrast': 'var(--kirby-white)',
      '--kirby-background-color': '#e9edea',
    },
  },
  {
    name: 'Kreditbank',
    overrides: {
      '--kirby-primary': '#117D4A',
      '--kirby-secondary': '#D1EEE1',
      '--kirby-tertiary': '#0E643B',
      '--kirby-primary-contrast': 'var(--kirby-white)',
      '--kirby-secondary-contrast': 'var(--kirby-black)',
      '--kirby-tertiary-contrast': 'var(--kirby-white)',
    },
  },
  {
    name: 'Skjern Bank',
    overrides: {
      '--kirby-primary': '#910008',
      '--kirby-secondary': '#FEF4F5',
      '--kirby-tertiary': '#910008',
      '--kirby-primary-contrast': 'var(--kirby-white)',
      '--kirby-secondary-contrast': 'var(--kirby-black)',
      '--kirby-tertiary-contrast': 'var(--kirby-white)',
    },
  },
  {
    name: 'SJF Bank',
    overrides: {
      '--kirby-primary': '#C5474A',
      '--kirby-secondary': '#F7F4F0',
      '--kirby-tertiary': '#055A4F',
      '--kirby-primary-contrast': 'var(--kirby-white)',
      '--kirby-secondary-contrast': 'var(--kirby-black)',
      '--kirby-tertiary-contrast': 'var(--kirby-white)',
    },
  },
];

const STORAGE_KEY = 'kirby-color-overrides';
const FONT_FAMILY_VAR = '--kirby-font-family';

@Component({
  selector: 'cookbook-config',
  template: `
    <!-- Floating action button -->
    <button class="fab" (click)="toggle()" [class.active]="isOpen" title="Design Token Config">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="3" />
        <path
          d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
        />
      </svg>
    </button>

    <!-- Overlay panel -->
    <div class="panel" *ngIf="isOpen">
      <div class="panel-header">
        <h2>Design Token Config</h2>
        <button class="close-btn" (click)="close()" title="Close">&times;</button>
      </div>

      <div class="panel-body">
        <p>Adjust Kirby design tokens in real time.</p>

        <section class="preset-group">
          <h3>Presets</h3>
          <div class="preset-buttons">
            <button
              *ngFor="let preset of presets"
              class="preset-btn"
              [class.active]="activePreset === preset.name"
              (click)="applyPreset(preset)"
            >
              {{ preset.name }}
            </button>
          </div>
        </section>

        <div class="toolbar" *ngIf="hasOverrides">
          <button class="reset-all" (click)="resetAll()">Reset all to defaults</button>
        </div>

        <section class="font-family-group">
          <h3>Typography</h3>
          <div class="token-card" [class.overridden]="isFontFamilyOverridden()">
            <div class="font-preview" [style.font-family]="fontFamily">Aa</div>
            <div class="token-info">
              <code class="var-name">--kirby-font-family</code>
              <div class="controls">
                <input
                  type="text"
                  class="hex-input"
                  [ngModel]="fontFamily"
                  (ngModelChange)="onFontFamilyChange($event)"
                  placeholder="e.g. 'Roboto', sans-serif"
                />
                <button
                  class="reset-btn"
                  *ngIf="isFontFamilyOverridden()"
                  (click)="resetFontFamily()"
                  title="Reset to default"
                >
                  &times;
                </button>
              </div>
            </div>
          </div>
        </section>

        <section *ngFor="let group of colorGroups" class="color-group">
          <h3>{{ group.label }}</h3>
          <div class="token-grid">
            <div
              *ngFor="let token of group.tokens"
              class="token-card"
              [class.overridden]="isOverridden(token)"
            >
              <div class="swatch" [style.background-color]="token.value"></div>
              <div class="token-info">
                <code class="var-name">{{ token.cssVar }}</code>
                <div class="controls">
                  <input
                    type="color"
                    [ngModel]="getColorPickerValue(token)"
                    (ngModelChange)="onColorChange(token, $event)"
                  />
                  <input
                    type="text"
                    class="hex-input"
                    [ngModel]="token.value"
                    (ngModelChange)="onColorChange(token, $event)"
                    placeholder="#hex or var(--…)"
                  />
                  <button
                    class="reset-btn"
                    *ngIf="isOverridden(token)"
                    (click)="resetToken(token)"
                    title="Reset to default"
                  >
                    &times;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- Backdrop -->
    <div class="backdrop" *ngIf="isOpen" (click)="close()"></div>
  `,
  styleUrl: 'config.component.scss',
  imports: [CommonModule, FormsModule, ButtonComponent],
})
export class ConfigComponent implements OnInit {
  colorGroups: ColorGroup[] = [];
  fontFamily = '';
  defaultFontFamily = '';
  hasOverrides = false;
  isOpen = false;
  presets = PRESETS;
  activePreset: string | null = null;

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:keydown.escape')
  close(): void {
    this.isOpen = false;
  }

  applyPreset(preset: ColorPreset): void {
    // Reset all tokens to defaults first
    for (const group of this.colorGroups) {
      for (const token of group.tokens) {
        token.value = token.defaultValue;
        document.documentElement.style.removeProperty(token.cssVar);
      }
    }

    // Reset font family to default
    this.fontFamily = this.defaultFontFamily;
    document.documentElement.style.removeProperty(FONT_FAMILY_VAR);

    // Apply preset overrides
    for (const group of this.colorGroups) {
      for (const token of group.tokens) {
        if (preset.overrides[token.cssVar]) {
          token.value = preset.overrides[token.cssVar];
          document.documentElement.style.setProperty(token.cssVar, token.value);
        }
      }
    }

    // Apply font family override if present
    if (preset.overrides[FONT_FAMILY_VAR]) {
      this.fontFamily = preset.overrides[FONT_FAMILY_VAR];
      document.documentElement.style.setProperty(FONT_FAMILY_VAR, this.fontFamily);
    }

    this.activePreset = preset.name;
    this.saveOverrides();
    this.updateHasOverrides();
  }

  private static readonly COLOR_DEFINITIONS: {
    label: string;
    names: string[];
  }[] = [
    {
      label: 'Brand',
      names: [
        'primary',
        'secondary',
        'tertiary',
        'primary-contrast',
        'secondary-contrast',
        'tertiary-contrast',
      ],
    },
    {
      label: 'Notification',
      names: ['success', 'warning', 'danger'],
    },
    {
      label: 'System',
      names: [
        'background-color',
        'white',
        'light',
        'semi-light',
        'medium',
        'semi-dark',
        'dark',
        'black',
      ],
    },
    {
      label: 'Text',
      names: [
        'default',
        'heading',
        'white',
        'semi-dark',
        'black',
        'danger',
        'positive',
        'negative',
      ],
    },
  ];

  ngOnInit(): void {
    this.loadTokens();
    this.applyStoredOverrides();
  }

  onColorChange(token: ColorToken, newValue: string): void {
    token.value = newValue;
    document.documentElement.style.setProperty(token.cssVar, newValue);
    this.activePreset = null;
    this.saveOverrides();
    this.hasOverrides = true;
  }

  onFontFamilyChange(newValue: string): void {
    this.fontFamily = newValue;
    document.documentElement.style.setProperty(FONT_FAMILY_VAR, newValue);
    this.saveOverrides();
    this.hasOverrides = true;
  }

  resetAll(): void {
    for (const group of this.colorGroups) {
      for (const token of group.tokens) {
        token.value = token.defaultValue;
        document.documentElement.style.removeProperty(token.cssVar);
      }
    }
    this.fontFamily = this.defaultFontFamily;
    document.documentElement.style.removeProperty(FONT_FAMILY_VAR);
    localStorage.removeItem(STORAGE_KEY);
    this.hasOverrides = false;
    this.activePreset = null;
  }

  resetToken(token: ColorToken): void {
    token.value = token.defaultValue;
    document.documentElement.style.removeProperty(token.cssVar);
    this.saveOverrides();
    this.updateHasOverrides();
  }

  isOverridden(token: ColorToken): boolean {
    return token.value !== token.defaultValue;
  }

  isFontFamilyOverridden(): boolean {
    return this.fontFamily !== this.defaultFontFamily;
  }

  resetFontFamily(): void {
    this.fontFamily = this.defaultFontFamily;
    document.documentElement.style.removeProperty(FONT_FAMILY_VAR);
    this.saveOverrides();
    this.updateHasOverrides();
  }

  private loadTokens(): void {
    const computed = getComputedStyle(document.documentElement);

    this.colorGroups = ConfigComponent.COLOR_DEFINITIONS.map((def) => ({
      label: def.label,
      tokens: def.names.map((name) => {
        const cssVar = this.getCssVar(def.label, name);
        const raw = computed.getPropertyValue(cssVar).trim();
        const hex = this.toHex(raw);
        return {
          name,
          cssVar,
          value: hex,
          defaultValue: hex,
        };
      }),
    }));

    const rawFont = computed.getPropertyValue(FONT_FAMILY_VAR).trim();
    this.fontFamily = rawFont || 'Roboto';
    this.defaultFontFamily = this.fontFamily;
  }

  private getCssVar(groupLabel: string, name: string): string {
    if (groupLabel === 'Text' && name === 'default') {
      return `--kirby-text-color`;
    }
    if (groupLabel === 'Text') {
      return `--kirby-text-color-${name}`;
    }
    return `--kirby-${name}`;
  }

  private applyStoredOverrides(): void {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    try {
      const overrides: Record<string, string> = JSON.parse(stored);
      for (const group of this.colorGroups) {
        for (const token of group.tokens) {
          if (overrides[token.cssVar]) {
            token.value = overrides[token.cssVar];
            document.documentElement.style.setProperty(token.cssVar, token.value);
          }
        }
      }
      if (overrides[FONT_FAMILY_VAR]) {
        this.fontFamily = overrides[FONT_FAMILY_VAR];
        document.documentElement.style.setProperty(FONT_FAMILY_VAR, this.fontFamily);
      }
      this.updateHasOverrides();
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  private saveOverrides(): void {
    const overrides: Record<string, string> = {};
    for (const group of this.colorGroups) {
      for (const token of group.tokens) {
        if (token.value !== token.defaultValue) {
          overrides[token.cssVar] = token.value;
        }
      }
    }
    if (this.fontFamily !== this.defaultFontFamily) {
      overrides[FONT_FAMILY_VAR] = this.fontFamily;
    }
    if (Object.keys(overrides).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  private updateHasOverrides(): void {
    this.hasOverrides =
      this.fontFamily !== this.defaultFontFamily ||
      this.colorGroups.some((g) => g.tokens.some((t) => t.value !== t.defaultValue));
  }

  isCssVar(value: string): boolean {
    return value.trim().startsWith('var(');
  }

  getColorPickerValue(token: ColorToken): string {
    if (this.isCssVar(token.value)) {
      return this.resolveVarToHex(token.value);
    }
    return token.value;
  }

  private resolveVarToHex(varValue: string): string {
    const temp = document.createElement('div');
    temp.style.color = varValue;
    temp.style.display = 'none';
    document.body.appendChild(temp);
    const computed = getComputedStyle(temp).color;
    document.body.removeChild(temp);
    return this.toHex(computed);
  }

  private toHex(raw: string): string {
    if (!raw) return '#000000';
    // Already hex
    if (raw.startsWith('#')) {
      return raw.length === 4
        ? `#${raw[1]}${raw[1]}${raw[2]}${raw[2]}${raw[3]}${raw[3]}`
        : raw.substring(0, 7); // strip alpha if present
    }
    // rgb() or rgba()
    const match = raw.match(/rgba?\(\s*(\d+)\s*[\s,]\s*(\d+)\s*[\s,]\s*(\d+)/);
    if (match) {
      const [, r, g, b] = match;
      return '#' + [r, g, b].map((c) => parseInt(c, 10).toString(16).padStart(2, '0')).join('');
    }
    return '#000000';
  }
}
