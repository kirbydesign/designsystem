import { Component, computed, signal } from '@angular/core';
import { KirbyModule } from '@kirbydesign/designsystem';
import { Person, tableExampleData } from '../../examples/data-table-example/example-data';
import { EmptyStateMessageTypesExampleComponent } from '~/app/examples/empty-state-example/examples/message-types';

@Component({
  selector: 'cookbook-all-comps',
  imports: [KirbyModule, EmptyStateMessageTypesExampleComponent],
  template: `
    <div class="card-option-button-group">
      <button (click)="setThemeColor('light')" class="white">Base</button>
      <button (click)="setThemeColor('white')" class="tertiary">Raised</button>
      <button (click)="setThemeColor('secondary')" class="dark">Brand</button>
    </div>
    <br />
    <div [class]="surfaceClass() + ' surface-div'">
      <kirby-app>
        <kirby-item>
          <kirby-badge slot="outside" themeColor="danger" size="sm"></kirby-badge>
          <kirby-avatar
            slot="start"
            overlay="true"
            imageSrc="/assets/images/woman.png"
          ></kirby-avatar>
          <kirby-label>
            <kirby-label direction="horizontal">
              <p class="kirby-item-title">
                Fusce id neque suscipit, finibus urna convallis, auctor arcu.
              </p>
              <p class="kirby-item-disclosure">
                <time>20.12.2017</time>
                <kirby-icon name="arrow-more"></kirby-icon>
              </p>
            </kirby-label>
            <p class="kirby-item-subtitle">
              Subtitle will wrap if necessary in two lines and truncate with ellipsis if it
              overflows.
            </p>
            <p class="kirby-item-detail kirby-item-wrap">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis
              ultricies imperdiet in ut orci. Ut non neque vitae felis ultricies imperdiet in ut
              orci.
            </p>
          </kirby-label>
        </kirby-item>
        <kirby-item>
          <kirby-checkbox slot="end">Item with Checkbox</kirby-checkbox>
        </kirby-item>

        <kirby-radio-group>
          <kirby-item>
            <kirby-radio slot="end">Item with Radio</kirby-radio>
          </kirby-item>
        </kirby-radio-group>

        <kirby-item>
          <kirby-toggle slot="end">Item with Toggle</kirby-toggle>
        </kirby-item>

        <kirby-item>
          Item with Button
          <button kirby-button attentionLevel="2" slot="end">Button</button>
        </kirby-item>
        <kirby-card>
          <kirby-item>
            Item with medium size input
            <input kirby-input slot="end" size="md" placeholder="Input in end slot" />
          </kirby-item>
        </kirby-card>
        <kirby-card>
          <kirby-item>
            Item with large (default) size input
            <input kirby-input slot="end" placeholder="Input in end slot" />
          </kirby-item>
        </kirby-card>
      </kirby-app>
    </div>

    <br />
    <kirby-card [hasPadding]="true" [themeColor]="color()">
      <div class="columns"></div>
      <div class="columns">
        <kirby-header [title]="'Title'" subtitle1="Subtitle one" subtitle2="Subtitle two">
          <kirby-progress-circle value="75" themeColor="success" size="lg">
            <kirby-avatar themeColor="white">
              <kirby-icon name="kirby"></kirby-icon>
            </kirby-avatar>
          </kirby-progress-circle>
        </kirby-header>
        <kirby-header
          [title]="'Title'"
          subtitle1="Subtitle one"
          subtitle2="Subtitle two"
        ></kirby-header>
        <kirby-header [title]="'Action Group'" subtitle1="Subtitle one" subtitle2="Subtitle two">
          <kirby-action-group *kirbyHeaderActions>
            <button kirby-button attentionLevel="3" (click)="actionClicked('Action 1')">
              <kirby-icon name="edit"></kirby-icon>
              <span class="text">Action 1</span>
            </button>
            <button kirby-button attentionLevel="3" (click)="actionClicked('Action 2')">
              Action 2
            </button>
            <button kirby-button attentionLevel="3" (click)="actionClicked('Action 3')">
              Action 3
            </button>
          </kirby-action-group>
        </kirby-header>
      </div>
      <div class="columns">
        <kirby-empty-state
          iconName="verify"
          themeColor="success"
          title="Success"
          subtitle="Additional messaging via subtitle"
        ></kirby-empty-state>
        <kirby-empty-state
          iconName="help"
          themeColor="warning"
          title="Warning"
          subtitle="Additional messaging via subtitle"
        ></kirby-empty-state>
        <kirby-empty-state
          iconName="help"
          themeColor="danger"
          title="Danger"
          subtitle="Additional messaging via subtitle"
        ></kirby-empty-state>
        <kirby-empty-state
          iconName="overview-outline"
          title="Empty"
          subtitle="Additional messaging via subtitle"
        ></kirby-empty-state>
      </div>
      <div class="columns">
        <table class="kirby-table">
          <thead>
            <tr>
              <th [sortable]="true" [active]="true" (click)="sortData()">Name</th>
              <th>Eyes</th>
              <th>Gender</th>
              <th>Hair</th>
              <th>Skin</th>
              <th>Birth year</th>
              <th style="text-align:right;">Height (cm)</th>
              <th style="text-align:right;">Weight (kg)</th>
            </tr>
          </thead>
          <tbody>
            @for (rowData of tableData; track rowData.name; let i = $index) {
              <tr class="kirby-selectable-row" (click)="onClickRow(i)">
                <td>{{ rowData.name }}</td>
                <td>{{ rowData.eye_color }}</td>
                <td>{{ rowData.gender }}</td>
                <td>{{ rowData.hair_color }}</td>
                <td>{{ rowData.skin_color }}</td>
                <td>{{ rowData.birth_year }}</td>
                <td style="text-align:right;">{{ rowData.height }}</td>
                <td style="text-align:right;">{{ rowData.mass }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      <div class="columns">
        <div class="column">
          <kirby-calendar [yearNavigatorOptions]="yearNavigatorOptions"></kirby-calendar>
        </div>
        <div class="column">
          <kirby-card>
            <kirby-calendar [yearNavigatorOptions]="yearNavigatorOptions"></kirby-calendar>
          </kirby-card>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <kirby-avatar size="xs">
            <kirby-icon name="kirby"></kirby-icon>
          </kirby-avatar>

          <kirby-avatar size="sm">
            <kirby-icon name="kirby"></kirby-icon>
          </kirby-avatar>

          <kirby-avatar size="md">
            <kirby-icon name="kirby"></kirby-icon>
          </kirby-avatar>

          <kirby-avatar size="lg">
            <kirby-icon name="kirby"></kirby-icon>
          </kirby-avatar>
        </div>
        <div class="column">
          <kirby-avatar
            imageSrc="/assets/images/woman.png"
            altText="Example"
            size="xs"
          ></kirby-avatar>
          <kirby-avatar
            imageSrc="/assets/images/woman.png"
            altText="Example"
            size="sm"
          ></kirby-avatar>

          <kirby-avatar
            imageSrc="/assets/images/woman.png"
            altText="Example"
            size="md"
          ></kirby-avatar>
          <kirby-avatar
            imageSrc="/assets/images/woman.png"
            altText="Example"
            size="lg"
          ></kirby-avatar>
        </div>
      </div>
      <div class="columns">
        <kirby-card variant="outlined">
          <kirby-accordion>
            <kirby-accordion-item title="Title for accordion item 1" [isExpanded]="true">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis
              ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque
              velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis
              eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta.
            </kirby-accordion-item>
            <kirby-accordion-item title="Title for accordion item 2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis
              ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque
              velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis
              eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta.
            </kirby-accordion-item>
            <kirby-accordion-item title="Title for accordion item 3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis
              ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque
              velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis
              eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta.
            </kirby-accordion-item>
          </kirby-accordion>
        </kirby-card>
        <kirby-card>
          <kirby-accordion>
            <kirby-accordion-item title="Title for accordion item 1" [isExpanded]="true">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis
              ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque
              velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis
              eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta.
            </kirby-accordion-item>
            <kirby-accordion-item title="Title for accordion item 2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis
              ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque
              velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis
              eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta.
            </kirby-accordion-item>
            <kirby-accordion-item title="Title for accordion item 3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis
              ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque
              velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis
              eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta.
            </kirby-accordion-item>
          </kirby-accordion>
        </kirby-card>
      </div>
      <div class="columns">
        <div class="column">
          <!-- Segmented control: default mode -->
          <kirby-segmented-control
            [items]="segmentItems"
            [selectedIndex]="0"
          ></kirby-segmented-control>
          <kirby-segmented-control
            [items]="segmentItems"
            [selectedIndex]="0"
            size="sm"
          ></kirby-segmented-control>

          <!-- Segmented control: chip mode -->
          <kirby-segmented-control
            [items]="chipItems"
            [selectedIndex]="0"
            mode="chip"
            size="sm"
          ></kirby-segmented-control>

          <!-- Segmented control: compact chip mode -->
          <kirby-segmented-control
            [items]="compactChipItems"
            [selectedIndex]="0"
            mode="compactChip"
            size="sm"
          ></kirby-segmented-control>

          <p>Undocumented, but possible combinations with medium size chip and compactChip:</p>
          <kirby-segmented-control
            [items]="chipItems"
            [selectedIndex]="0"
            mode="chip"
          ></kirby-segmented-control>
          <kirby-segmented-control
            [items]="compactChipItems"
            [selectedIndex]="0"
            mode="compactChip"
          ></kirby-segmented-control>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <kirby-form-field label="Label">
            <input kirby-input placeholder="Default input with placeholder" />
          </kirby-form-field>
          <kirby-form-field label="Label">
            <input kirby-input size="md" placeholder="Medium input with placeholder" />
          </kirby-form-field>
          <kirby-form-field label="Label">
            <textarea kirby-textarea placeholder="Default textarea with placeholder"></textarea>
          </kirby-form-field>
        </div>
        <div class="column">
          <kirby-form-field label="Label">
            <input kirby-input placeholder="Default input with placeholder" data-state="hover" />
          </kirby-form-field>
          <kirby-form-field label="Label">
            <input
              kirby-input
              size="md"
              placeholder="Medium input with placeholder"
              data-state="hover"
            />
          </kirby-form-field>
          <kirby-form-field label="Label">
            <textarea
              kirby-textarea
              placeholder="Default textarea with placeholder"
              data-state="hover"
            ></textarea>
          </kirby-form-field>
        </div>
        <div class="column">
          <kirby-form-field label="Label">
            <input kirby-input placeholder="Default input with placeholder" data-state="active" />
          </kirby-form-field>
          <kirby-form-field label="Label">
            <input
              kirby-input
              size="md"
              placeholder="Medium input with placeholder"
              data-state="active"
            />
          </kirby-form-field>
          <kirby-form-field label="Label">
            <textarea
              kirby-textarea
              placeholder="Default textarea with placeholder"
              data-state="active"
            ></textarea>
          </kirby-form-field>
        </div>
        <div class="column">
          <kirby-form-field label="Label">
            <input kirby-input placeholder="Default input with placeholder" data-state="focus" />
          </kirby-form-field>
          <kirby-form-field label="Label">
            <input
              kirby-input
              size="md"
              placeholder="Medium input with placeholder"
              data-state="focus"
            />
          </kirby-form-field>
          <kirby-form-field label="Label">
            <textarea
              kirby-textarea
              placeholder="Default textarea with placeholder"
              data-state="focus"
            ></textarea>
          </kirby-form-field>
        </div>
        <div class="column">
          <kirby-form-field label="Label">
            <input kirby-input placeholder="Default input with placeholder" [hasError]="true" />
          </kirby-form-field>
          <kirby-form-field label="Label">
            <input
              kirby-input
              size="md"
              placeholder="Medium input with placeholder"
              [hasError]="true"
            />
          </kirby-form-field>
          <kirby-form-field label="Label">
            <textarea
              kirby-textarea
              placeholder="Default textarea with placeholder"
              [hasError]="true"
            ></textarea>
          </kirby-form-field>
        </div>
        <div class="column">
          <kirby-form-field label="Label">
            <input kirby-input placeholder="Default input with placeholder" disabled />
          </kirby-form-field>
          <kirby-form-field label="Label">
            <input kirby-input size="md" placeholder="Medium input with placeholder" disabled />
          </kirby-form-field>
          <kirby-form-field label="Label">
            <textarea
              kirby-textarea
              placeholder="Default textarea with placeholder"
              disabled
            ></textarea>
          </kirby-form-field>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <button kirby-button attentionLevel="1">Text</button>
          <button kirby-button attentionLevel="2">Text</button>
          <button kirby-button attentionLevel="3">Text</button>
          <button kirby-button class="destructive">Text</button>
          <button kirby-button [noDecoration]="true"><kirby-icon name="kirby"></kirby-icon></button>
        </div>
        <div class="column">
          <button kirby-button attentionLevel="1" data-state="hover">Text</button>
          <button kirby-button attentionLevel="2" data-state="hover">Text</button>
          <button kirby-button attentionLevel="3" data-state="hover">Text</button>
          <button kirby-button class="destructive" data-state="hover">Text</button>
          <button kirby-button [noDecoration]="true" data-state="hover">
            <kirby-icon name="kirby"></kirby-icon>
          </button>
        </div>
        <div class="column">
          <button kirby-button attentionLevel="1" data-state="active">Text</button>
          <button kirby-button attentionLevel="2" data-state="active">Text</button>
          <button kirby-button attentionLevel="3" data-state="active">Text</button>
          <button kirby-button class="destructive" data-state="active">Text</button>
          <button kirby-button [noDecoration]="true" data-state="active">
            <kirby-icon name="kirby"></kirby-icon>
          </button>
        </div>
        <div class="column">
          <button kirby-button attentionLevel="1" data-state="focus">Text</button>
          <button kirby-button attentionLevel="2" data-state="focus">Text</button>
          <button kirby-button attentionLevel="3" data-state="focus">Text</button>
          <button kirby-button class="destructive" data-state="focus">Text</button>
          <button kirby-button [noDecoration]="true" data-state="focus">
            <kirby-icon name="kirby"></kirby-icon>
          </button>
        </div>
        <div class="column">
          <button kirby-button attentionLevel="1" disabled>Text</button>
          <button kirby-button attentionLevel="2" disabled>Text</button>
          <button kirby-button attentionLevel="3" disabled>Text</button>
          <button kirby-button class="destructive" disabled>Text</button>
          <button kirby-button [noDecoration]="true" disabled>
            <kirby-icon name="kirby"></kirby-icon>
          </button>
        </div>
      </div>

      <!-- <cookbook-empty-state-message-types-example></cookbook-empty-state-message-types-example> -->

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
    </kirby-card>
  `,
  styles: [
    `
      .columns {
        display: flex;
        gap: var(--kirby-spacing-xxl);

        &:not(:first-child) {
          margin-top: var(--kirby-spacing-s);
        }
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

        [size='xs'] {
          width: 56px;
        }
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

      .kirby-surface-raised,
      .kirby-surface-brand,
      .kirby-surface-base {
        background-color: var(--kirby-theme-color-fill-base);
      }

      .surface-div {
        position: relative;
        height: 500px;
        padding: var(--kirby-spacing-s);
        flex-direction: column;
      }
    `,
  ],
})
export class AllCompsComponent {
  color = signal<string>('light');

  surfaceClass = computed(() => {
    switch (this.color()) {
      case 'light':
        return 'kirby-surface-base';
      case 'white':
        return 'kirby-surface-raised';
      case 'secondary':
        return 'kirby-surface-brand';
      default:
        return 'kirby-surface-base';
    }
  });

  segmentItems = [
    { text: 'First item', id: 'first' },
    { text: 'Second item', id: 'second' },
    { text: 'Third item', id: 'third' },
  ];

  chipItems = [...'123456'].map((i) => ({ text: `Chip-${i}`, id: i }));

  compactChipItems = [...'12345678'].map((i) => ({ text: `c${i}`, id: i }));

  setThemeColor(color: string) {
    this.color.set(color);
  }
  yearNavigatorOptions = { from: -6, to: 3 };
  tableData: Person[] = tableExampleData;
  sortData() {
    console.log('noop');
  }
}
