import { Component } from '@angular/core';
import { FlagComponent } from '@kirbydesign/designsystem/flag';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { ToggleComponent } from '@kirbydesign/designsystem/toggle';
import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';
import { RadioComponent, RadioGroupComponent } from '@kirbydesign/designsystem/radio';
import { RangeComponent } from '@kirbydesign/designsystem/range';

@Component({
  selector: 'cookbook-all-comps',
  imports: [
    FlagComponent,
    BadgeComponent,
    IconComponent,
    ToggleComponent,
    CheckboxComponent,
    RadioGroupComponent,
    RadioComponent,
    RangeComponent,
  ],
  template: `
    <div class="columns">
      <div class="column">
        <!-- Flags: size md -->
        <kirby-flag themeColor="transparent" size="md">Value</kirby-flag>
        <kirby-flag themeColor="semi-light" size="md">Value</kirby-flag>
        <kirby-flag themeColor="success" size="md">Value</kirby-flag>
        <kirby-flag themeColor="warning" size="md">Value</kirby-flag>
        <kirby-flag themeColor="danger" size="md">Value</kirby-flag>

        <!-- Flags: size sm -->
        <kirby-flag themeColor="transparent" size="sm">Value</kirby-flag>
        <kirby-flag themeColor="semi-light" size="sm">Value</kirby-flag>
        <kirby-flag themeColor="success" size="sm">Value</kirby-flag>
        <kirby-flag themeColor="warning" size="sm">Value</kirby-flag>
        <kirby-flag themeColor="danger" size="sm">Value</kirby-flag>

        <!-- Flags: size xs -->
        <kirby-flag themeColor="transparent" size="xs">Value</kirby-flag>
        <kirby-flag themeColor="semi-light" size="xs">Value</kirby-flag>
        <kirby-flag themeColor="success" size="xs">Value</kirby-flag>
        <kirby-flag themeColor="warning" size="xs">Value</kirby-flag>
        <kirby-flag themeColor="danger" size="xs">Value</kirby-flag>
      </div>

      <div class="column">
        <!-- Badges: size md with text -->
        <kirby-badge themeColor="success">Text</kirby-badge>
        <kirby-badge themeColor="warning">Text</kirby-badge>
        <kirby-badge themeColor="danger">Text</kirby-badge>
        <kirby-badge themeColor="white">Text</kirby-badge>

        <!-- Badges: size md without text -->
        <kirby-badge themeColor="success"><kirby-icon name="dot"></kirby-icon></kirby-badge>
        <kirby-badge themeColor="warning"><kirby-icon name="dot"></kirby-icon></kirby-badge>
        <kirby-badge themeColor="danger"><kirby-icon name="dot"></kirby-icon></kirby-badge>
        <kirby-badge themeColor="white"><kirby-icon name="dot"></kirby-icon></kirby-badge>

        <!-- Badges: size sm -->
        <kirby-badge themeColor="success" size="sm"></kirby-badge>
        <kirby-badge themeColor="warning" size="sm"></kirby-badge>
        <kirby-badge themeColor="danger" size="sm"></kirby-badge>
        <kirby-badge themeColor="white" size="sm"></kirby-badge>
      </div>
    </div>

    <!-- Toggles -->
    <div class="toggle-grid">
      <div class="toggle-row">
        <kirby-toggle [checked]="true"></kirby-toggle>
        <kirby-toggle [checked]="true" data-state="hover"></kirby-toggle>
        <kirby-toggle [checked]="true" data-state="active"></kirby-toggle>
        <kirby-toggle [checked]="true" data-state="focus"></kirby-toggle>
        <kirby-toggle [checked]="true" [disabled]="true"></kirby-toggle>
      </div>
      <div class="toggle-row">
        <kirby-toggle></kirby-toggle>
        <kirby-toggle data-state="hover"></kirby-toggle>
        <kirby-toggle data-state="active"></kirby-toggle>
        <kirby-toggle data-state="focus"></kirby-toggle>
        <kirby-toggle [disabled]="true"></kirby-toggle>
      </div>
    </div>

    <!-- Checkboxes and Radios -->
    <div class="columns">
      <!-- Checkboxes -->
      <div class="checkbox-grid">
        <!-- Unchecked xs -->
        <div class="checkbox-row">
          <kirby-checkbox size="xs"></kirby-checkbox>
          <kirby-checkbox data-state="hover" size="xs"></kirby-checkbox>
          <kirby-checkbox data-state="active" size="xs"></kirby-checkbox>
          <kirby-checkbox data-state="focus" size="xs"></kirby-checkbox>
          <kirby-checkbox size="xs" hasError="true"></kirby-checkbox>
          <kirby-checkbox size="xs" [disabled]="true"></kirby-checkbox>
        </div>
        <!-- Unchecked md -->
        <div class="checkbox-row">
          <kirby-checkbox></kirby-checkbox>
          <kirby-checkbox data-state="hover"></kirby-checkbox>
          <kirby-checkbox data-state="active"></kirby-checkbox>
          <kirby-checkbox data-state="focus"></kirby-checkbox>
          <kirby-checkbox hasError="true"></kirby-checkbox>
          <kirby-checkbox [disabled]="true"></kirby-checkbox>
        </div>
        <!-- Checked xs -->
        <div class="checkbox-row">
          <kirby-checkbox checked="true" size="xs"></kirby-checkbox>
          <kirby-checkbox checked="true" data-state="hover" size="xs"></kirby-checkbox>
          <kirby-checkbox checked="true" data-state="active" size="xs"></kirby-checkbox>
          <kirby-checkbox checked="true" data-state="focus" size="xs"></kirby-checkbox>
          <kirby-checkbox checked="true" size="xs" hasError="true"></kirby-checkbox>
          <kirby-checkbox checked="true" size="xs" [disabled]="true"></kirby-checkbox>
        </div>
        <!-- Checked md -->
        <div class="checkbox-row">
          <kirby-checkbox checked="true"></kirby-checkbox>
          <kirby-checkbox checked="true" data-state="hover"></kirby-checkbox>
          <kirby-checkbox checked="true" data-state="active"></kirby-checkbox>
          <kirby-checkbox checked="true" data-state="focus"></kirby-checkbox>
          <kirby-checkbox checked="true" hasError="true"></kirby-checkbox>
          <kirby-checkbox checked="true" [disabled]="true"></kirby-checkbox>
        </div>

        <!-- Indeterminate sm -->
        <div class="checkbox-row">
          <kirby-checkbox indeterminate="true" size="xs"></kirby-checkbox>
          <kirby-checkbox indeterminate="true" data-state="hover" size="xs"></kirby-checkbox>
          <kirby-checkbox indeterminate="true" data-state="active" size="xs"></kirby-checkbox>
          <kirby-checkbox indeterminate="true" data-state="focus" size="xs"></kirby-checkbox>
          <kirby-checkbox indeterminate="true" size="xs" hasError="true"></kirby-checkbox>
          <kirby-checkbox indeterminate="true" size="xs" [disabled]="true"></kirby-checkbox>
        </div>

        <!-- Indeterminate md -->
        <div class="checkbox-row">
          <kirby-checkbox indeterminate="true"></kirby-checkbox>
          <kirby-checkbox indeterminate="true" data-state="hover"></kirby-checkbox>
          <kirby-checkbox indeterminate="true" data-state="active"></kirby-checkbox>
          <kirby-checkbox indeterminate="true" data-state="focus"></kirby-checkbox>
          <kirby-checkbox indeterminate="true" hasError="true"></kirby-checkbox>
          <kirby-checkbox indeterminate="true" [disabled]="true"></kirby-checkbox>
        </div>
      </div>

      <!-- Radios -->
      <div class="radio-section">
        <!-- Unselected radios row -->
        <kirby-radio-group>
          <div class="radio-row">
            <kirby-radio size="xs" value="1"></kirby-radio>
            <kirby-radio size="xs" value="2" data-state="hover"></kirby-radio>
            <kirby-radio size="xs" value="3" data-state="active"></kirby-radio>
            <kirby-radio size="xs" value="4" data-state="focus"></kirby-radio>
          </div>
        </kirby-radio-group>
        <!-- Selected radios row -->
        <kirby-radio-group value="1">
          <div class="radio-row">
            <kirby-radio size="xs" value="1"></kirby-radio>
            <kirby-radio size="xs" value="1" data-state="hover"></kirby-radio>
            <kirby-radio size="xs" value="1" data-state="active"></kirby-radio>
            <kirby-radio size="xs" value="1" data-state="focus"></kirby-radio>
          </div>
        </kirby-radio-group>
        <!-- Unselected md -->
        <div class="radio-row">
          <kirby-radio-group aria-label="Unselected radio md">
            <kirby-radio size="md" value="1" aria-label="radio"></kirby-radio>
          </kirby-radio-group>
        </div>
        <!-- Disabled md -->
        <div class="radio-row">
          <kirby-radio-group aria-label="Disabled radio md">
            <kirby-radio
              size="md"
              value="1"
              [disabled]="true"
              aria-label="radio disabled"
            ></kirby-radio>
          </kirby-radio-group>
        </div>
        <!-- Error state -->
        <div class="radio-row">
          <kirby-radio-group [hasError]="true" aria-label="Error radio">
            <kirby-radio size="md" value="1" aria-label="radio error"></kirby-radio>
          </kirby-radio-group>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <kirby-range
          minLabel="Min value"
          maxLabel="Max value"
          value="5"
          min="0"
          max="6"
        ></kirby-range>
        <kirby-range
          minLabel="Min value"
          maxLabel="Max value"
          value="5"
          min="0"
          max="6"
          ticks="true"
        ></kirby-range>
      </div>
      <div class="column">
        <kirby-range
          minLabel="Min value"
          maxLabel="Max value"
          value="5"
          min="0"
          max="6"
          data-state="hover"
        ></kirby-range>
        <kirby-range
          minLabel="Min value"
          maxLabel="Max value"
          value="5"
          min="0"
          max="6"
          ticks="true"
          data-state="hover"
        ></kirby-range>
      </div>
      <div class="column">
        <kirby-range
          minLabel="Min value"
          maxLabel="Max value"
          value="5"
          min="0"
          max="6"
          data-state="active"
        ></kirby-range>
        <kirby-range
          minLabel="Min value"
          maxLabel="Max value"
          value="5"
          min="0"
          max="6"
          ticks="true"
          data-state="active"
        ></kirby-range>
      </div>
      <div class="column">
        <kirby-range
          minLabel="Min value"
          maxLabel="Max value"
          value="5"
          min="0"
          max="6"
          data-state="focus"
        ></kirby-range>
        <kirby-range
          minLabel="Min value"
          maxLabel="Max value"
          value="5"
          min="0"
          max="6"
          ticks="true"
          data-state="focus"
        ></kirby-range>
      </div>
    </div>
  `,
  styles: [
    `
      .columns {
        display: flex;
        gap: var(--kirby-spacing-xxl);
      }

      .column {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: var(--kirby-spacing-xxs);
        flex-grow: 1;
      }

      .toggle-grid {
        display: flex;
        flex-direction: column;
        gap: var(--kirby-spacing-s);
        margin-top: var(--kirby-spacing-xxl);
      }

      .toggle-row {
        display: flex;
        gap: var(--kirby-spacing-s);
        align-items: center;
      }

      .checkbox-grid {
        display: flex;
        flex-direction: column;
        gap: var(--kirby-spacing-xs);
        margin-top: var(--kirby-spacing-xxl);
      }

      .checkbox-row {
        display: flex;
        gap: var(--kirby-spacing-xs);
        align-items: center;
      }

      .radio-section {
        display: flex;
        flex-direction: column;
        gap: var(--kirby-spacing-xs);
        margin-top: var(--kirby-spacing-xxl);
      }

      .radio-row {
        display: flex;
        gap: var(--kirby-spacing-xs);
        align-items: center;
      }

      .radio-row kirby-radio-group {
        display: flex;
        flex-direction: row;
        gap: var(--kirby-spacing-xs);
      }

      .radio-group-section {
        margin-top: var(--kirby-spacing-xxl);
      }

      kirby-range {
        width: 100%;
      }
    `,
  ],
})
export class AllCompsComponent {}
