import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from '@kirbydesign/designsystem/accordion';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { CardModule } from '@kirbydesign/designsystem/card';
import { ItemModule } from '@kirbydesign/designsystem/item';
import {
  illustrations,
  SpotIllustrationComponent,
  SpotIllustrationSize,
} from '@kirbydesign/extensions-angular/spot-illustration';
import { BrowserModule } from '@angular/platform-browser';
import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

/**
 * Spot Illustrations are visual elements that help convey complex ideas in a simple way.
 * They contribute to clear communication and makes the experience more present and welcoming.
 * Spot Illustrations underpin a narrative, gives character, identity and personality
 * through brand theming. Spot Illustrations are abstract by nature and do not contain numbers or text.
 *
 * ## Features
 * - **Multiple sizes**: Available in sm, md, lg, and xl sizes
 * - **Theming**: Wide variety of themed illustrations. See the *All* example for all available variants.
 *
 * ## Usage Guidelines
 * - Use spot illustrations to support content, not replace it
 * - Choose illustrations that match your content's tone and context
 * - Consider the illustration size in relation to surrounding content
 * - Mind that the illustrations are not all available in all sizes.
 *
 * ## Technical Details
 * The Spot Illustration component expect SVGs to be placed in `assets/spot-illustrations`.
 * Make sure they are copied to your applications output folder by adding the following to `build > options > assets` in `angular.json`.
 *
 * In a Micro Frontend setup, this should be handled by the application host.
 * ```json
 * {
 *   ...
 *   "build": {
 *     "options": {
 *       "assets": [
 *         ...,
 *         {
 *           "glob": "*.svg",
 *           "input": "node_modules/@kirbydesign/extensions-angular/assets/spot-illustrations",
 *           "output": "assets/spot-illustrations"
 *         }
 *         ...
 *       ],
 *     }
 *   }
 * }
 ```
 */
const meta: Meta<SpotIllustrationComponent> = {
  component: SpotIllustrationComponent,
  title: 'Components/Spot Illustration',
  decorators: [
    moduleMetadata({
      imports: [
        ButtonComponent,
        CardModule,
        ItemModule,
        AccordionModule,
        BrowserModule,
        BrowserAnimationsModule,
      ],
    }),
  ],
  parameters: {
    themes: {
      disable: false,
      default: 'light',
      list: [
        { name: 'light', class: '', color: '#ffffff' },
        { name: 'dark', class: 'dark-theme', color: '#000000' },
      ],
    },
    docs: {
      themes: {
        disable: false,
      },
    },
  },
  argTypes: {
    name: {
      control: { type: 'select' },
      options: Object.keys(illustrations),
      table: {
        category: 'inputs',
        type: { summary: 'SpotIllustrationName' },
      },
    },
    size: {
      control: { type: 'select' },
      options: Object.values(SpotIllustrationSize),
      table: {
        category: 'inputs',
        type: { summary: 'SpotIllustrationSize' },
      },
    },
    illustration: {
      table: { disable: true },
    },
    svg: {
      table: { disable: true },
    },
  },
};
export default meta;
type Story = StoryObj<SpotIllustrationComponent>;

/**
 * To show a Spot Illustration, provide a name of one of the available illustrations, and optionally a size.
 */
export const Default: Story = {
  args: {
    name: 'invest-page.money.dot.circle',
    size: SpotIllustrationSize.MD,
  },
  render: (args) => ({
    props: {
      name: args.name,
      size: args.size,
    },
    template: `
      <kirby-x-spot-illustration ${argsToTemplate(args)}></kirby-x-spot-illustration>
    `,
  }),
};

const inCardStyles = `
kirby-card {
   --kirby-card-padding-top: 0;
}

.card-content {
  display: flex;
  justify-content: space-between;
  gap: var(--kirby-spacing-s);

  kirby-x-spot-illustration {
    align-self: end;
  }
}`;

/**
 * Spot Illustrations can also be used to support text content in a card.
 * The illustrations theme is automatically adjusted based on the surrounding card.
 */
export const InCard: Story = {
  args: {
    name: 'plant.bars.leaf.bars',
    size: SpotIllustrationSize.MD,
  },
  render: (args) => ({
    props: {
      name: args.name,
      size: args.size,
    },
    styles: [inCardStyles, `kirby-card:not(:first-child) { margin-top: var(--kirby-spacing-m); }`],
    template: `<kirby-card [hasPadding]="true">
  <kirby-card-header [hasPadding]="false">
    <kirby-item [disclosure]="'arrow-more'">
      <p class="kirby-text-normal-bold">Spot Illustration in card</p>
    </kirby-item>
  </kirby-card-header>
  <div class="card-content">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vehicula consectetur odio ut sodales. Quisque sit amet libero eu ligula feugiat imperdiet.</p>
    <kirby-x-spot-illustration ${argsToTemplate(args)}></kirby-x-spot-illustration>
  </div>
</kirby-card>

<kirby-card [hasPadding]="true" [variant]="'outlined'">
  <kirby-card-header [hasPadding]="false">
    <kirby-item [disclosure]="'arrow-more'" style="--kirby-item-background: transparent;">
      <p class="kirby-text-normal-bold">Spot Illustration in card</p>
    </kirby-item>
  </kirby-card-header>
  <div class="card-content">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vehicula consectetur odio ut sodales. Quisque sit amet libero eu ligula feugiat imperdiet.</p>
    <kirby-x-spot-illustration ${argsToTemplate(args)}></kirby-x-spot-illustration>
  </div>
</kirby-card>

<kirby-card [hasPadding]="true" [themeColor]="'dark'">
  <kirby-card-header [hasPadding]="false">
    <kirby-item [disclosure]="'arrow-more'" style="--kirby-item-background: var(--kirby-dark);">
      <p class="kirby-text-normal-bold" style="color: var(--kirby-white);">Spot Illustration in card</p>
    </kirby-item>
  </kirby-card-header>
  <div class="card-content">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vehicula consectetur odio ut sodales. Quisque sit amet libero eu ligula feugiat imperdiet.</p>
    <kirby-x-spot-illustration ${argsToTemplate(args)}></kirby-x-spot-illustration>
  </div>
</kirby-card>
<!-- Custom CSS:
${inCardStyles}
-->`,
  }),
};

/**
 * Comprehensive overview showing all available spot illustrations across all sizes in various themes.
 *
 * This story provides a complete reference table displaying every available spot illustration
 * in all supported sizes. It's useful for:
 * - Design system documentation
 * - Choosing the right illustration for your use case
 * - Comparing illustrations across different sizes
 * - Quality assurance and visual testing
 *
 * ** Check the different themes to see how illustrations adapt visually.**
 *
 * ** This story is particularly useful for designers and developers who need
 * to see all available options at a glance. **
 *
 */
export const All: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => ({
    props: {
      illustrations: illustrations,
      sizes: Object.values(SpotIllustrationSize),
      themes: ['light', 'white', 'dark'],
    },
    styles: [
      `
      h2 {
        padding-left: 16px;
      }

      table.kirby-table td.illustration-name {
        font-weight: bold;
        text-align: left;
      }

      table.kirby-table td, h2 {
        color: var(--story-text-color, --kirby-black);
        text-align: center;
      }

      kirby-x-spot-illustration {
        display: inline-block;
      }
      `,
    ],
    template: `
    <kirby-accordion>
      <kirby-accordion-item *ngFor="let theme of themes; let i = index"  [title]="'Theme: ' + theme" [isExpanded]="i === 0">
        <kirby-card [themeColor]="theme" [variant]="theme === 'light' ? 'outlined' : null">
          <table class="kirby-table">
            <thead>
            <th>Illustration Name</th>
            <th *ngFor="let size of sizes">{{ size }}</th>
            </thead>
            <tbody>
            <ng-container *ngFor="let illustration of illustrations | keyvalue">
              <tr>
                <td class="illustration-name">{{ illustration.key }}</td>
                <td *ngFor="let size of sizes">
                  <ng-container *ngTemplateOutlet="svgTemplate; context: { illustration, size }"></ng-container>
                </td>
              </tr>
            </ng-container>
            </tbody>
          </table>
        </kirby-card>
      </kirby-accordion-item>
    </kirby-accordion>
    <ng-template #svgTemplate let-illustration="illustration" let-size="size">
      @if (illustration.value[size]) {
        <kirby-x-spot-illustration [size]="size" [name]="illustration.key"></kirby-x-spot-illustration>
      }
      @else {
        N/A
      }
    </ng-template>
    `,
  }),
};

/**
 * Documentation for extending the spot illustration library with new illustrations.
 *
 * This story provides comprehensive guidelines for adding new spot illustrations to the design system.
 *
 * ## SVG Requirements
 *
 * All spot illustration SVGs must follow these strict rules:
 *
 * 1. **No Overlapping Paths**
 *    - SVGs should have no overlapping paths
 *    - Use of white figures to mask background or parts of the outline is prohibited
 *
 * 2. **No Strokes**
 *    - All strokes must be converted to paths
 *    - Only filled shapes are allowed
 *
 * 3. **Maximum 3 Shapes**
 *    - No groups allowed
 *    - Only one path per color
 *    - Since there are only 3 parts (highlight, outline, background), there should only be 3 paths/shapes maximum
 *
 * 4. **Part Attribute Required**
 *    - Each path/shape must have a `part` attribute
 *    - Part values correspond to colors: `highlight`, `outline`, or `background`
 *    - In special cases the part can instead of `highlight` be `success`, `danger`, or `warning`. These are used for special illustrations that indicate success, danger, or warning states. And these colors are not meant to be modified by themes.
 *
 * 5. **Fill Colors**
 *    - Paths can have a fill property, (for easier inspection of the files) but it's always overridden.
 *    - Therefore we constrain the fill to be one of: `silver`, `cadetblue`, `black`, `green`, `red`, or `orange` for easier inspection of the svg source files.
 *
 * 6. **Allowed Properties Only**
 *    - Paths can only have: `part`, `fill`, and shape-defining properties
 *    - Prohibited properties: `style`, `fill-opacity`, `stroke`, etc.
 *
 * ## SVG Ruleset Compliance Checklist
 *
 * - ✅ No overlapping paths
 * - ✅ No strokes (all converted to paths)
 * - ✅ Maximum 3 shapes (one per color)
 * - ✅ Each path has 'part' attribute
 * - ✅ Fill colors: silver, cadetblue, or black only (green, red and orange to represent success, danger, and warning states)
 * - ✅ No prohibited properties (style, fill-opacity, stroke, etc.)
 * - ✅ Follows general rules and naming pattern from Zeplin Guidelines document
 *
 * ## Implementation Steps
 * 1. **Create SVG**: Follow the ruleset above and general rules and naming patterns from the Zeplin document "Spot-illustrations/Guidelines"
 * 2. **Add to folder**: Place SVG file in `spot-illustration/src/svgs/`
 * 3. **Update registry**: Add illustration name to `spot-illustration/src/spot-illustrations.ts`
 * 4. **Test**: Verify the illustration appears in all themes and sizes
 *
 * ## Example SVG Structure
 * ```xml
 *  <svg viewBox="0 0 56 56" width="56" height="56" xmlns="http://www.w3.org/2000/svg">
 *    <path part="background" fill="silver" d="M43.6 6.01a3 3 0 0 0-3 3v38a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-38a3 3 0 0 0-3-3h-8zm-7.383 10.83a2.58 2.58 0 0 1-1.028 1.603l-.76.55.454.614a2.579 2.579 0 0 1-.578 3.616l-5.961 4.302c1.759 1.915 2.734 4.687 2.734 7.965 0 3.951-2.1 6.533-3.61 7.877-.964.86-1.509.793-1.509 2.076v1.807a1.86 1.86 0 0 1-1.678 1.85 3 3 0 0 0 2.157.92h8a3 3 0 0 0 3-3V19.254a3 3 0 0 0-1.221-2.414z"/>
 *    <path part="outline" fill="black" d="M29.125 8.338a3.591 3.591 0 0 0-2.014.644l-2.433 1.672a.75.75 0 0 0 .851 1.237l2.434-1.674a2.09 2.09 0 0 1 2.924.537l1.297 1.695 2.379 3.229c.605.827.596 1.67-.006 2.222L33.1 15.924l-1.278-1.67c-1.089-1.618-3.354-2.038-4.996-.897L14.453 21.86c-.632-.886-.446-2.025.377-2.619l1.742-1.197a.75.75 0 0 0-.85-1.236l-1.755 1.207a3.33 3.33 0 0 0-.76 4.674l.04.07a3.327 3.327 0 0 0-.323 4.305l4.021 5.5c.226.308.495.566.793.773h-3.984a.75.75 0 0 0 0 1.5h9.455a.75.75 0 0 0 0-1.5h-1.637l.057-.037 13.113-9.469a3.33 3.33 0 0 0 .746-4.666l-.039-.053c1.318-1.085 1.395-2.856.322-4.32l-2.388-3.242-1.28-1.67c-.68-1.011-1.818-1.554-2.978-1.541zm-5.82 3.404a.743.743 0 0 0-.416.135l-1.47 1.021a.749.749 0 1 0 .858 1.23l1.467-1.02a.749.749 0 0 0-.44-1.366zm-3.223 2.219a.749.749 0 0 0-.418.135l-1.705 1.187-.096.067-.271.19a.749.749 0 1 0 .855 1.23l.223-.155.098-.068 1.753-1.22a.749.749 0 0 0-.439-1.366zm8.773.254a2.077 2.077 0 0 1 1.749.914l1.296 1.695 2.38 3.229a1.826 1.826 0 0 1-.415 2.56L20.75 32.082c-.83.6-1.992.418-2.594-.404l-4.021-5.5-.088-.133a1.829 1.829 0 0 1 .375-2.334l.115-.092 13.143-9.027c.36-.25.77-.373 1.175-.377zM7.854 22.182c-1.281-.017-2.208 1.334-1.575 2.527 1.03 1.947 1.575 3.65 1.362 3.848-1.225 1.133-1.99 2.038-2.272 2.986a1.934 1.934 0 0 1-1.281 1.309l-1.18.365a2.14 2.14 0 0 0-1.51 2.043v2.963l.006.156a2.297 2.297 0 0 0 2.291 2.13h1.393l.039.132c.073.236.164.502.273.793a9.11 9.11 0 0 0 1.137 2.322l.152.215c.882 1.197 1.998 1.999 3.36 2.213l.033.004.139 2.345.04.201a2.43 2.43 0 0 0 2.3 1.633h2.865a2.016 2.016 0 0 0 2.011-2.021v-.635c0-.567.454-1.023 1.01-1.023.555 0 1.008.456 1.008 1.023a2.649 2.649 0 0 0 2.639 2.656h1.883a2.647 2.647 0 0 0 2.638-2.656v-1.846c0-.488.048-.594.28-.781-.066.052.703-.512 1.007-.785 2.368-2.117 3.924-4.984 3.924-8.615 0-1.936-.316-3.731-.935-5.315a.751.751 0 0 0-.973-.426.748.748 0 0 0-.424.971c.549 1.404.832 3.015.832 4.77 0 3.156-1.35 5.642-3.426 7.498a6.817 6.817 0 0 1-.322.263l-.197.15c-.23.175-.436.327-.428.321-.593.478-.838 1.017-.838 1.95v1.845c0 .64-.51 1.156-1.138 1.156h-1.883a1.149 1.149 0 0 1-1.139-1.156 2.516 2.516 0 0 0-2.508-2.523 2.516 2.516 0 0 0-2.51 2.523v.635c0 .29-.23.521-.511.521H12.56l-.12-.008a.929.929 0 0 1-.716-.507l-.014-.03-.168-2.875a.75.75 0 0 0-.75-.705c-1.225 0-2.219-.67-3.02-1.836a7.624 7.624 0 0 1-.95-1.943c-.146-.394-.25-.715-.333-1.008a6.247 6.247 0 0 1-.09-.353.75.75 0 0 0-.734-.592h-1.97a.796.796 0 0 1-.798-.787V35.26a.64.64 0 0 1 .456-.61l1.18-.367a3.43 3.43 0 0 0 2.273-2.314c.175-.592.833-1.369 1.853-2.313 1.033-.959.43-2.843-1.056-5.65-.084-.158.066-.354.28-.32a7.836 7.836 0 0 1 2.063.595.75.75 0 0 0 .623-1.365 9.348 9.348 0 0 0-2.455-.713 1.863 1.863 0 0 0-.261-.021z"/>
 *    <circle part="highlight" fill="cadetblue" cx="24.143" cy="23.114" r="3.5"/>
 *  </svg>
 * ```
 *
 * ## Avoid this SVG Structure
 * ```xml
 *  <svg viewBox="0 0 56 56" width="56" height="56" xmlns="http://www.w3.org/2000/svg">
 *    <title>piggy bank.money.dot.bars-medium</title>
 *    <g id="piggy-bank.money.dot.bars-medium" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
 *        <path id="bar-copy" fill-opacity="0.064959" fill="#1C1C1C" d="M26.4384905,16.2535603 L34.4384905,16.2535603 C36.0953447,16.2535603 37.4384905,17.596706 37.4384905,19.2535603 L37.4384905,47.0210022 C37.4384905,48.6778564 36.0953447,50.0210022 34.4384905,50.0210022 L26.4384905,50.0210022 C24.7816362,50.0210022 23.4384905,48.6778564 23.4384905,47.0210022 L23.4384905,19.2535603 C23.4384905,17.596706 24.7816362,16.2535603 26.4384905,16.2535603 Z M43.6003873,6.0096147 L51.6003873,6.0096147 C53.2572416,6.0096147 54.6003873,7.35276045 54.6003873,9.0096147 L54.6003873,47.0096147 C54.6003873,48.6664689 53.2572416,50.0096147 51.6003873,50.0096147 L43.6003873,50.0096147 C41.9435331,50.0096147 40.6003873,48.6664689 40.6003873,47.0096147 L40.6003873,9.0096147 C40.6003873,7.35276045 41.9435331,6.0096147 43.6003873,6.0096147 Z"></path>
 *        <path id="piggy-bank-fill" fill="#FFFFFF" d="M14.377553,25.4948465 C13.6795752,25.7021378 12.9497504,25.4738549 12.4543542,24.9455682 C11.7882233,24.2371042 10.5630023,23.3659558 8.41333664,23.0327153 C7.61981809,22.9093901 6.99880356,23.7105667 7.37388926,24.4137829 C8.22313989,26.0108882 9.29178026,28.3829306 8.5619555,29.0572834 C7.85955446,29.7045222 6.80772217,30.7383548 6.5361389,31.6497369 C6.28047907,32.5103895 5.62230984,33.1628761 4.79075193,33.4200223 L3.63187867,33.7777529 C3.05774986,33.9544316 2.66674072,34.4809691 2.66674072,35.075729 L2.66674072,37.971685 C2.66674072,38.7982263 3.3505644,39.4743284 4.18654549,39.4743284 L6.12212922,39.4743284 C6.12212922,39.4743284 6.2468629,40.0515954 6.54940844,40.8545213 C6.54940844,40.8545213 7.77286013,45.079066 11.1574777,45.079066 L11.3308664,48.0108825 C11.5599872,48.6703663 12.1863095,49.1129376 12.8922491,49.1129376 L15.7062764,49.1129376 C16.3918694,49.1129376 16.9456516,48.5557875 16.9456516,47.8691897 L16.9456516,47.2499397 C16.9456516,46.2922013 17.7188235,45.5146401 18.6742304,45.5146401 C19.6278681,45.5146401 20.4010401,46.2922013 20.4010401,47.2499397 C20.4010401,48.2785244 21.232598,49.1129376 22.2561219,49.1129376 L24.1041267,49.1129376 C25.1294199,49.1129376 25.9592085,48.2785244 25.9592085,47.2499397 L25.9592085,45.4437937 C25.9592085,44.1606867 26.5041443,44.2262852 27.4683976,43.3665073 C28.9784714,42.0221749 31.0785975,39.4402172 31.0785975,35.489437 C31.0785975,31.7870565 29.8339145,28.7310401 27.620555,26.8251844"></path>
 *        <path id="piggy-bank" fill="#1C1C1C" fill-rule="nonzero" d="M6.27882238,24.7081911 C5.6032881,23.4360355 6.70421875,21.98269 8.11496321,22.2029206 C9.03494614,22.3461728 9.85165261,22.5880535 10.5698649,22.9161228 C10.9466324,23.0882249 11.1125464,23.5331716 10.9404443,23.9099391 C10.7683422,24.2867066 10.3233955,24.4526207 9.94662798,24.2805186 C9.35489757,24.0102244 8.67029252,23.8074676 7.88388893,23.6850153 C7.66864714,23.651414 7.52013241,23.8474692 7.60407307,24.0055463 C9.09017436,26.812793 9.69356183,28.6969495 8.6603444,29.655896 C7.6403214,30.6000086 6.98292737,31.378051 6.80745013,31.9695473 C6.47839402,33.0822262 5.62738433,33.943869 4.5332375,34.2837271 L3.35266682,34.649782 C3.08211229,34.7334124 2.89849046,34.9815537 2.89849046,35.2607089 L2.89849046,38.2224821 C2.89849046,38.6524317 3.25780656,39.0092765 3.69592805,39.0092765 L5.66670421,39.0092765 C6.02013434,39.0092765 6.32560294,39.2560218 6.39993107,39.6015477 C6.41266765,39.6607557 6.44244557,39.7821847 6.49079276,39.9543911 C6.57307804,40.2474806 6.67702198,40.5690059 6.82239729,40.9630621 C6.85358269,41.0712251 6.92567596,41.2800149 7.04141491,41.5547629 C7.23615444,42.0170473 7.47999974,42.4792222 7.77350866,42.9063756 C8.57408709,44.0714843 9.5687336,44.7413944 10.7936045,44.7413944 C11.1906962,44.7413944 11.5189686,45.0509075 11.5423079,45.4473126 L11.7114905,48.3230428 L11.724093,48.3524978 C11.8614788,48.6295813 12.1310063,48.8205487 12.4416684,48.8595651 L12.5599172,48.866945 L15.4251086,48.866945 C15.7069798,48.866945 15.9370179,48.6348825 15.9370179,48.3449301 L15.9370179,47.7116062 C15.9370179,46.3188831 17.0590192,45.186868 18.4470255,45.186868 C19.833629,45.186868 20.9552316,46.3192817 20.9552316,47.7116062 C20.9552316,48.3505225 21.4673058,48.866945 22.0940422,48.866945 L23.9756471,48.866945 C24.6034511,48.866945 25.1144577,48.3512597 25.1144577,47.7116062 L25.1144577,45.8644115 C25.1144577,44.9323382 25.3591889,44.394299 25.9525978,43.9160007 C25.9447609,43.9223175 26.1507163,43.7710783 26.3800142,43.5965273 L26.5778296,43.444334 C26.707595,43.3432406 26.8272143,43.2470593 26.9011519,43.1808386 C28.9759194,41.3255459 30.3269264,38.8399958 30.3269264,35.6838193 C30.3269264,33.9296041 30.0423172,32.3180453 29.4935244,30.9144134 C29.3426936,30.5286377 29.5331541,30.0936321 29.9189299,29.9428013 C30.3047057,29.7919705 30.7397112,29.982431 30.8905421,30.3682068 C31.5096536,31.9516912 31.8269264,33.7482024 31.8269264,35.6838193 C31.8269264,39.3154112 30.2691528,42.1813656 27.9014605,44.2985963 C27.5969597,44.571317 26.8288821,45.1362891 26.8939196,45.0838677 C26.6624098,45.2704688 26.6144577,45.375891 26.6144577,45.8644115 L26.6144577,47.7116062 C26.6144577,49.1766418 25.434954,50.366945 23.9756471,50.366945 L22.0940422,50.366945 C20.6360263,50.366945 19.4552316,49.1761237 19.4552316,47.7116062 C19.4552316,47.1445049 19.0019637,46.686868 18.4470255,46.686868 C17.8904445,46.686868 17.4370179,47.1443414 17.4370179,47.7116062 L17.4370179,48.3449301 C17.4370179,49.4603818 16.5383632,50.366945 15.4251086,50.366945 L12.5599172,50.366945 C11.5222873,50.366945 10.5994263,49.7124513 10.2613462,48.7350029 L10.2214423,48.5339249 L10.0824905,46.1880428 L10.0494107,46.1842781 C8.68734723,45.9705171 7.57182097,45.1682023 6.69035634,43.9711575 L6.53723092,43.7558562 C6.18132045,43.2378877 5.89089784,42.687432 5.65906184,42.1370859 C5.51885547,41.8042556 5.42777761,41.5404844 5.39953508,41.4342594 C5.29059409,41.1438501 5.20040072,40.8768288 5.12759987,40.6409039 L5.08749046,40.5090428 L3.69592805,40.5092765 C2.48436471,40.5092765 1.48499138,39.5669114 1.40381367,38.3787908 L1.39849046,38.2224821 L1.39849046,35.2607089 C1.39849046,34.3228113 2.01158355,33.4942947 2.90905893,33.2168788 L4.08864429,32.8511292 C4.70415761,32.6599417 5.1821973,32.175929 5.36921523,31.5435427 C5.65050732,30.5953655 6.41631195,29.6890164 7.64068659,28.555761 C7.85452977,28.3572894 7.30932243,26.6548079 6.27882238,24.7081911 Z"></path>
 *        <path id="money-in-2-fill" fill="#FFFFFF" transform="translate(25.1144, 18.5496) rotate(-6) translate(-25.1144, -18.5496)" d="M15.0832812,17.1697456 C13.8370985,17.8834324 13.4107929,19.4665469 14.1294224,20.7041585 L17.5543312,26.5950985 C18.2744832,27.83271 19.8670392,28.2568395 21.1132219,27.5423967 L35.1455279,19.4967879 C36.3917106,18.7823451 36.8180162,17.1999866 36.0993867,15.9623751 L34.0637774,12.4914683 L32.9744143,10.7095194 C32.2344696,9.31692297 30.4881391,8.79980247 29.1018846,9.56187479 L15.0832812,17.1697456 Z"></path>
 *        <path id="money-in-1-fill-" fill="#FFFFFF" transform="translate(24.2288, 23.3286) rotate(-6) translate(-24.2288, -23.3286)" d="M14.1976907,21.9486864 C12.9515081,22.6623732 12.5252024,24.2454877 13.2438319,25.4830992 L16.6687408,31.3740392 C17.3888927,32.6116508 18.9814487,33.0357803 20.2276314,32.3213375 L34.2599374,24.2757287 C35.5061201,23.5612859 35.9324257,21.9789274 35.2137962,20.7413159 L33.1781869,17.2704091 L32.0888238,15.4884602 C31.3488791,14.0958637 29.6025486,13.5787432 28.2162941,14.3408155 L14.1976907,21.9486864 Z"></path>
 *        <path id="money-in" fill="#1C1C1C" fill-rule="nonzero" d="M32.1044593,9.87954919 L33.3833733,11.5490977 L35.7711303,14.7906336 C36.8433829,16.2543354 36.7665717,18.0260967 35.4488629,19.111867 L35.4888452,19.164905 C36.5786344,20.6570828 36.2441556,22.7463913 34.7430092,23.8300827 L21.6285421,33.2984115 L21.5719025,33.3355019 L23.2087726,33.3357321 C23.6229861,33.3357321 23.9587726,33.6715186 23.9587726,34.0857321 C23.9587726,34.4999457 23.6229861,34.8357321 23.2087726,34.8357321 L13.7548116,34.8357321 C13.3405981,34.8357321 13.0048116,34.4999457 13.0048116,34.0857321 C13.0048116,33.6715186 13.3405981,33.3357321 13.7548116,33.3357321 L17.7383632,33.3368479 C17.4404776,33.1301867 17.1715079,32.8714569 16.945707,32.5628784 L12.9235486,27.0618807 C11.9448075,25.7217539 12.1148076,23.8994137 13.2470608,22.7574558 L13.2077159,22.6884292 C12.1171316,21.1966036 12.4517215,19.1061034 13.9667495,18.0130773 C14.9197427,17.3579748 14.9197427,17.3579748 15.7224364,16.8061906 C16.0637792,16.5715462 16.530709,16.6580423 16.7653534,16.9993851 C16.9999978,17.3407279 16.9135017,17.8076577 16.5721589,18.0423021 C15.7694652,18.5940864 15.7694652,18.5940864 14.8304861,19.2393176 C14.0076727,19.8330725 13.8216125,20.971972 14.4536417,21.8585181 L26.8269471,13.3573779 C28.4691633,12.216045 30.7325911,12.6356932 31.8217525,14.2538792 L33.0996527,15.9231663 L34.5568951,17.8998035 C35.159007,17.3469821 35.1681405,16.5057558 34.5622465,15.6786628 L32.1841551,12.450028 L30.8871159,10.7547607 C30.24051,9.795118 28.9229443,9.55056702 27.9634044,10.217102 L25.5283548,11.8907876 C25.1869986,12.1254124 24.7200737,12.0388895 24.4854489,11.6975332 C24.2508241,11.356177 24.337347,10.8892521 24.6787033,10.6546273 L27.1106956,8.98305423 C28.7533757,7.84196342 31.0162039,8.26196285 32.1044593,9.87954919 Z M27.6796547,14.5914254 L14.5370693,23.6194699 L14.4218577,23.7117463 C13.7425832,24.2953246 13.5844246,25.2828968 14.0466213,26.0448732 L14.1346453,26.1768697 L18.1563967,31.6773106 C18.7582553,32.4998077 19.9198952,32.681874 20.7505298,32.0822312 L33.8649969,22.6139024 C34.6926134,22.0164385 34.8762439,20.8693973 34.2794337,20.0522117 L31.9004075,16.8240674 L30.6043517,15.1290309 C29.9572088,14.1690087 28.6391028,13.9246267 27.6796547,14.5914254 Z M20.7087622,14.2830221 C20.9453312,14.6230338 20.8614743,15.0904449 20.5214626,15.3270139 C19.3495016,16.1424187 19.0565113,16.3462699 18.7676878,16.5472033 L18.6703676,16.614908 C18.6039903,16.6610855 18.5330188,16.7104586 18.447853,16.7697062 C18.1078046,17.0062225 17.6404066,16.9222932 17.4038903,16.5822448 C17.167374,16.2421964 17.2513033,15.7747983 17.5913517,15.538282 C17.697769,15.4642503 17.7820159,15.4056419 17.862841,15.3494127 L17.9593885,15.282245 C18.2350853,15.0904417 18.5579174,14.8658277 19.6647705,14.0957224 C20.0047822,13.8591534 20.4721932,13.9430104 20.7087622,14.2830221 Z M23.9318286,12.0639366 C24.1683962,12.4039494 24.0845373,12.87136 23.7445245,13.1079276 C22.737268,13.8087352 22.737268,13.8087352 22.2768248,14.1290839 C21.9368064,14.3656433 21.4693977,14.2817732 21.2328383,13.9417547 C20.9962789,13.6017363 21.0801491,13.1343276 21.4201675,12.8977683 C21.8805849,12.5774375 21.8805849,12.5774375 22.8878377,11.8766325 C23.2278504,11.6400649 23.6952611,11.7239238 23.9318286,12.0639366 Z"></path>
 *        <circle id="dot-fill" fill="#7BC8DC" cx="24.1428324" cy="23.1144561" r="3.5"></circle>
 *    </g>
 * </svg>
 *
 * ```
 *
 * **Note**: For complete guidelines and naming patterns, request access to the "Spot-illustrations/Guidelines" document in Zeplin.
 */
export const ExtendingLibrary: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  tags: ['!dev'],
};
