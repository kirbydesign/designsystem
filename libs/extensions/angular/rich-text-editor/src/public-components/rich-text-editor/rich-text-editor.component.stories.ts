import { AfterViewInit, Component, provideZonelessChangeDetection, viewChild } from '@angular/core';
import {
  applicationConfig,
  argsToTemplate,
  type Meta,
  moduleMetadata,
  type StoryObj,
} from '@storybook/angular';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { CardComponent } from '@kirbydesign/designsystem/card';
import { Extension, textInputRule, textPasteRule } from '@tiptap/core';
import {
  RichTextEditorComponent,
  RichTextEditorConfig,
  RichTextEditorLabels,
  richTextToolbar,
} from '@kirbydesign/extensions-angular/rich-text-editor';
import { responsiveModes } from 'tools/storybook-config/shared-config';

const initialValue =
  '<p>A Kirby note with <strong>bold</strong> and <em>italic</em> text.</p><ul><li><p>A list item</p></li></ul>';

const danishLabels: RichTextEditorLabels = {
  editor: 'Sagsnoter',
  placeholder: 'Skriv en note...',
  toolbar: 'Tekstformatering',
};

const danishTextStyleLabels = {
  label: 'Teksttype',
  normal: 'Normal tekst',
  heading1: 'Overskrift 1',
  heading2: 'Overskrift 2',
  heading3: 'Overskrift 3',
};

const danishToolbarItems = [
  richTextToolbar.bold('Fed'),
  richTextToolbar.textStyle(danishTextStyleLabels),
];

const englishToolbar = {
  bold: richTextToolbar.bold('Bold'),
  italic: richTextToolbar.italic('Italic'),
  underline: richTextToolbar.underline('Underline'),
  bulletList: richTextToolbar.bulletList('Unordered list'),
  orderedList: richTextToolbar.orderedList('Ordered list'),
  textStyle: richTextToolbar.textStyle({
    label: 'Text style',
    normal: 'Normal',
    heading1: 'Heading 1',
    heading2: 'Heading 2',
    heading3: 'Heading 3',
  }),
};

const fullToolbarConfig: RichTextEditorConfig = {
  toolbarItems: Object.values(englishToolbar),
};

const emojiShortcuts = Extension.create({
  name: 'emojiShortcuts',
  addInputRules() {
    return [textInputRule({ find: /:\)$/, replace: '😊' })];
  },
  addPasteRules() {
    return [textPasteRule({ find: /:\)/g, replace: '😊' })];
  },
});

const inputRulesConfig: RichTextEditorConfig = {
  ...fullToolbarConfig,
  extensions: [emojiShortcuts],
  enableInputRules: ['emojiShortcuts'],
};

const pasteRulesConfig: RichTextEditorConfig = {
  ...fullToolbarConfig,
  extensions: [emojiShortcuts],
  enablePasteRules: [emojiShortcuts],
};

@Component({
  selector: 'kirby-x-rich-text-editor-focus-example',
  imports: [CardComponent, RichTextEditorComponent],
  template: `
    <kirby-card>
      <kirby-x-rich-text-editor
        [labels]="{ editor: 'New message', placeholder: 'Write a message...' }"
      />
    </kirby-card>
  `,
})
class FocusOnEntryExampleComponent implements AfterViewInit {
  private readonly editor = viewChild.required(RichTextEditorComponent);

  ngAfterViewInit(): void {
    this.focusEditor();
  }

  private focusEditor(): void {
    this.editor().focus();
  }
}

type EditorStoryArgs = RichTextEditorComponent & {
  'aria-describedby': string;
};

const meta: Meta<EditorStoryArgs> = {
  title: 'Components/Rich Text Editor',
  component: RichTextEditorComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent, CardComponent, FocusOnEntryExampleComponent],
    }),
  ],
  parameters: {
    chromatic: { modes: { ...responsiveModes } },
    controls: {
      include: [
        'value',
        'config',
        'labels',
        'readonly',
        'aria-describedby',
        'valueChange',
        'editorFocus',
        'editorBlur',
        'focus',
        'blur',
        'execute',
        'setBlock',
      ],
    },
    docs: {
      description: {
        component: `
An HTML rich text editor with consumer-selected controls and labels.
Supports headings, text formatting and ordered/unordered lists.
Place inside a kirby-card for background, rounded corners and elevation.

## Configuration

All properties are optional. Config is initialization-only; omit toolbarItems for no controls.
Supply labels for the selected controls.

\`\`\`ts
import {
  type RichTextEditorConfig,
  richTextToolbar,
} from '@kirbydesign/extensions-angular/rich-text-editor';

readonly config: RichTextEditorConfig = {
  toolbarItems: [
    richTextToolbar.bold('Bold'),
    richTextToolbar.italic('Italic'),
    richTextToolbar.underline('Underline'),
    richTextToolbar.bulletList('Unordered list'),
    richTextToolbar.orderedList('Ordered list'),
    richTextToolbar.textStyle({
      label: 'Text style',
      normal: 'Normal',
      heading1: 'Heading 1',
      heading2: 'Heading 2',
      heading3: 'Heading 3',
    }),
  ],
  extensions: [],
  enableInputRules: false,
  enablePasteRules: false,
};
\`\`\`

## CSS custom properties

Set these on the editor host or in your stylesheet.

| Property | Purpose |
| --- | --- |
| \`--kirby-x-rich-text-editor-min-height\` | Minimum document height, including padding; excludes toolbar. |
| \`--kirby-x-rich-text-editor-max-height\` | Maximum document height, including padding; text scrolls internally. |
| \`--kirby-x-rich-text-editor-toolbar-border\` | Toolbar divider; set to \`none\` to hide it. |
`,
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'HTML value with two-way binding. Schema filtering is not HTML sanitization.',
      table: { category: 'Inputs', defaultValue: { summary: "''" } },
    },
    config: {
      control: false,
      description:
        'Labelled toolbarItems, Tiptap extensions and input/paste rules. Initialization-only; no controls or rules by default.',
      table: { category: 'Inputs', defaultValue: { summary: '{}' } },
    },
    readonly: {
      control: 'boolean',
      description: 'Disables editing and controls while retaining focusability.',
      table: { category: 'Inputs', defaultValue: { summary: 'false' } },
    },
    labels: {
      control: false,
      description:
        'Editor name, placeholder and toolbar group label. Initialization-only; English defaults.',
      table: { category: 'Inputs', defaultValue: { summary: '{}' } },
    },
    'aria-describedby': {
      control: 'text',
      description: 'Space-separated IDs of elements describing the editable textbox.',
      table: { category: 'Inputs', defaultValue: { summary: "''" } },
    },
    valueChange: {
      control: false,
      description: 'Emits normalized HTML after a user content change.',
      table: { category: 'Outputs', type: { summary: 'EventEmitter<string>' } },
    },
    editorFocus: {
      control: false,
      description: 'Emits when the editable textbox receives focus.',
      table: { category: 'Outputs', type: { summary: 'EventEmitter<void>' } },
    },
    editorBlur: {
      control: false,
      description: 'Emits when the editable textbox loses focus.',
      table: { category: 'Outputs', type: { summary: 'EventEmitter<void>' } },
    },
    focus: {
      control: false,
      description: 'Focuses the editable textbox.',
      table: { category: 'Methods', type: { summary: 'focus(): void' } },
    },
    blur: {
      control: false,
      description: 'Removes focus from the editable textbox.',
      table: { category: 'Methods', type: { summary: 'blur(): void' } },
    },
    execute: {
      control: false,
      description: 'Runs a supported formatting or history action. Does nothing in read-only mode.',
      table: {
        category: 'Methods',
        type: { summary: 'execute(action: RichTextEditorAction): void' },
      },
    },
    setBlock: {
      control: false,
      description: 'Sets paragraph (0) or Heading 1–3 and restores editor focus.',
      table: {
        category: 'Methods',
        type: { summary: 'setBlock(level: RichTextEditorBlockLevel): void' },
      },
    },
  },
  args: {
    value: initialValue,
    labels: { editor: 'Case notes', placeholder: 'Write a note...' },
    config: fullToolbarConfig,
    readonly: false,
    'aria-describedby': '',
  },
  render: (args) => ({
    props: args,
    template: `
      <kirby-card>
        <kirby-x-rich-text-editor
          ${argsToTemplate(args, { exclude: ['value', 'valueChange'] })}
          [(value)]="value"
        />
      </kirby-card>
    `,
  }),
};
export default meta;
type Story = StoryObj<EditorStoryArgs>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Bind HTML with [(value)] and pass the configuration through [config].',
      },
    },
  },
};

export const Empty: Story = {
  args: { value: '' },
  parameters: {
    docs: {
      description: {
        story: 'The configurable placeholder is displayed only while the document is empty.',
      },
    },
  },
};

export const WithoutToolbar: Story = {
  args: { config: {} },
  parameters: {
    docs: {
      description: {
        story:
          'Omit config.toolbarItems for no controls. Content and keyboard formatting remain available.',
      },
    },
  },
};

export const ReadOnly: Story = {
  args: { readonly: true },
  parameters: {
    docs: {
      description: {
        story: 'Read-only content remains focusable and selectable.',
      },
    },
  },
};

export const WithoutBackground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use without a card for a transparent editor. Set --kirby-x-rich-text-editor-toolbar-border to none to hide the divider.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <kirby-x-rich-text-editor
        style="--kirby-x-rich-text-editor-toolbar-border: none"
        ${argsToTemplate(args, { exclude: ['value', 'valueChange'] })}
        [(value)]="value"
      />
    `,
  }),
};

export const Surfaces: Story = {
  args: { value: '' },
  parameters: {
    docs: {
      description: {
        story: 'The card variant sets the surface for the editor and its controls.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, surfaces: ['base', 'raised', 'brand'] },
    template: `
      <section aria-label="Surface examples" style="--kirby-x-rich-text-editor-min-height: 6rem">
        @for (surface of surfaces; track surface) {
          <h3>{{ surface }} surface</h3>
          <kirby-card [variant]="surface">
            <kirby-x-rich-text-editor
              ${argsToTemplate(args, { exclude: ['labels', 'valueChange'] })}
              [labels]="{ editor: surface + ' surface', placeholder: labels.placeholder }"
            />
          </kirby-card>
        }
      </section>
    `,
  }),
};

export const CustomHeight: Story = {
  args: { value: '<p>A short note.</p>' },
  parameters: {
    docs: {
      description: {
        story:
          'Set minimum and maximum writing-area heights with CSS custom properties. Equal values give a fixed height.',
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      longValue: '<p>A longer note to demonstrate scrolling.</p>'.repeat(20),
    },
    template: `
      <button kirby-button size="sm" (click)="value = longValue">Load long note</button>
      <kirby-card style="margin-block-start: var(--kirby-spacing-s)">
        <kirby-x-rich-text-editor
          style="--kirby-x-rich-text-editor-min-height: 8rem; --kirby-x-rich-text-editor-max-height: 16rem"
          ${argsToTemplate(args, { exclude: ['value', 'valueChange'] })}
          [(value)]="value"
        />
      </kirby-card>
    `,
  }),
};

export const CustomLabels: Story = {
  args: { labels: danishLabels, config: { toolbarItems: danishToolbarItems } },
  parameters: {
    docs: {
      description: {
        story:
          'Supply labels only for selected controls. Resolve translated strings before creating the editor.',
      },
    },
  },
};

export const CustomToolbar: Story = {
  args: {
    config: {
      toolbarItems: [englishToolbar.textStyle, englishToolbar.bold, englishToolbar.orderedList],
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Choose controls and their order in config.toolbarItems before initialization.',
      },
    },
  },
};

export const CustomInputRules: Story = {
  args: { value: '', config: inputRulesConfig },
  parameters: {
    docs: {
      description: {
        story: 'Enable a Tiptap input rule to replace :) with an emoji while typing.',
      },
    },
  },
};

export const CustomPasteRules: Story = {
  args: { value: '', config: pasteRulesConfig },
  parameters: {
    docs: {
      description: {
        story: 'Enable a Tiptap paste rule to replace :) with an emoji when pasting.',
      },
    },
  },
};

export const FocusOnEntry: Story = {
  tags: ['!autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Opt into autofocus by calling focus() from the parent's ngAfterViewInit.",
      },
    },
  },
  render: () => ({
    template: '<kirby-x-rich-text-editor-focus-example />',
  }),
};

export const ProgrammaticControls: Story = {
  decorators: [
    applicationConfig({
      providers: [provideZonelessChangeDetection()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Call public methods through a template reference. This example uses zoneless change detection.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-block-end: 16px">
        <button kirby-button size="sm" (click)="editor.focus()">Focus editor</button>
        <button kirby-button size="sm" (click)="editor.blur()">Blur editor</button>
        <button kirby-button size="sm" (click)="value = '<p>Loaded <strong>HTML</strong> content.</p>'">Load HTML</button>
        <button kirby-button size="sm" (click)="value = ''">Clear</button>
        <button kirby-button size="sm" (click)="readonly = !readonly">Toggle read-only</button>
      </div>
      <kirby-card>
        <kirby-x-rich-text-editor
          #editor
          ${argsToTemplate(args, { exclude: ['value', 'valueChange'] })}
          [(value)]="value"
        />
      </kirby-card>
      <h3>HTML output</h3>
      <pre style="white-space: pre-wrap; overflow-wrap: anywhere">{{ value }}</pre>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textbox = await canvas.findByRole('textbox', { name: 'Case notes' });
    await userEvent.click(canvas.getByRole('button', { name: 'Clear' }));
    await waitFor(() => expect(textbox.textContent).toBe(''));
    await userEvent.click(canvas.getByRole('button', { name: 'Focus editor' }));
    await waitFor(() => expect(textbox).toHaveFocus());
    await userEvent.type(textbox, 'A note');
    const html = canvasElement.querySelector('pre');
    const bold = canvas.getByRole('button', { name: 'Bold' });
    await userEvent.click(bold);
    await waitFor(() => {
      expect(bold).toHaveAttribute('aria-pressed', 'true');
      expect(textbox).toHaveFocus();
    });
    await userEvent.keyboard(' bold');
    await waitFor(() => expect(html).toHaveTextContent('<p>A note<strong> bold</strong></p>'));
    await userEvent.click(canvas.getByRole('button', { name: 'Blur editor' }));
    await waitFor(() => expect(textbox).not.toHaveFocus());
  },
};
