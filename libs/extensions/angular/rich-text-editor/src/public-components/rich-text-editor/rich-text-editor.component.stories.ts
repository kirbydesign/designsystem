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
        story: 'Bind HTML with [(value)] and select controls in config.toolbarItems.',
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
  render: (args) => ({
    props: args,
    template: `
      <kirby-card>
        <kirby-x-rich-text-editor
          ${argsToTemplate(args, { exclude: ['config', 'valueChange'] })}
        />
      </kirby-card>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textbox = await canvas.findByRole('textbox', { name: 'Case notes' });
    await expect(canvas.queryByRole('group', { name: 'Text formatting' })).toBeNull();
    await expect(textbox.querySelector('strong')).toHaveTextContent('bold');
    await expect(textbox.querySelector('ul')).not.toBeNull();
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
        story: 'Use without a card for a transparent editor on the surrounding surface.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <kirby-x-rich-text-editor
        ${argsToTemplate(args, { exclude: ['value', 'valueChange'] })}
        [(value)]="value"
      />
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textbox = await canvas.findByRole('textbox', { name: 'Case notes' });
    const toolbar = canvas.getByRole('group', { name: 'Text formatting' });
    const editor = textbox.closest('kirby-x-rich-text-editor');
    if (!editor) throw new Error('Editor is missing');
    for (const element of [editor, toolbar, textbox]) {
      await expect(getComputedStyle(element).backgroundColor).toBe('rgba(0, 0, 0, 0)');
    }
    await userEvent.clear(textbox);
    await userEvent.type(textbox, 'A note');
    await userEvent.click(canvas.getByRole('button', { name: 'Bold' }));
    await userEvent.keyboard(' bold');
    await waitFor(() => expect(textbox.querySelector('strong')).toHaveTextContent('bold'));
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.findByRole('textbox', { name: 'base surface' });
    const fills: string[] = [];
    for (const card of canvasElement.querySelectorAll<HTMLElement>('kirby-card')) {
      const toolbar = within(card).getByRole('group', { name: 'Text formatting' });
      const textbox = within(card).getByRole('textbox');
      await expect(getComputedStyle(toolbar).backgroundColor).toBe('rgba(0, 0, 0, 0)');
      await expect(getComputedStyle(textbox).backgroundColor).toBe('rgba(0, 0, 0, 0)');
      await expect(getComputedStyle(toolbar).color).toBe(getComputedStyle(card).color);
      await expect(getComputedStyle(textbox).color).toBe(getComputedStyle(card).color);
      fills.push(getComputedStyle(card).backgroundColor);
    }
    await expect(new Set(fills).size).toBe(3);
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textbox = await canvas.findByRole('textbox', { name: 'Case notes' });
    const toolbar = canvas.getByRole('group', { name: 'Text formatting' });
    await expect(textbox.getBoundingClientRect().height).toBeCloseTo(
      parseFloat(getComputedStyle(textbox).minHeight),
      0
    );
    await userEvent.click(canvas.getByRole('button', { name: 'Load long note' }));
    await waitFor(() => {
      expect(textbox.getBoundingClientRect().height).toBeCloseTo(
        parseFloat(getComputedStyle(textbox).maxHeight),
        0
      );
      expect(textbox.scrollHeight).toBeGreaterThan(textbox.clientHeight);
    });
    await expect(canvas.getByRole('textbox', { name: 'Case notes' })).toBe(textbox);
    const toolbarTop = toolbar.getBoundingClientRect().top;
    textbox.scrollTop = textbox.scrollHeight;
    await expect(textbox.scrollTop).toBeGreaterThan(0);
    await expect(toolbar.getBoundingClientRect().top).toBe(toolbarTop);
    await expect(toolbar.getBoundingClientRect().bottom).toBeLessThanOrEqual(
      textbox.getBoundingClientRect().top
    );
  },
};

export const CustomLabels: Story = {
  args: { labels: danishLabels, config: { toolbarItems: danishToolbarItems } },
  parameters: {
    docs: {
      description: {
        story:
          'Supply labels only for selected controls. Resolve translated strings before creating the editor.',
      },
      source: {
        language: 'typescript',
        code: `import { Component } from '@angular/core';
import { CardComponent } from '@kirbydesign/designsystem/card';
import {
  RichTextEditorComponent,
  RichTextEditorConfig,
  richTextToolbar,
} from '@kirbydesign/extensions-angular/rich-text-editor';

@Component({
  selector: 'app-note-editor',
  imports: [CardComponent, RichTextEditorComponent],
  template: \`
    <kirby-card>
      <kirby-x-rich-text-editor
        [(value)]="value"
        [config]="config"
        [labels]="labels"
      />
    </kirby-card>
  \`,
})
export class NoteEditorComponent {
  value = '';
  readonly labels = {
    editor: 'Sagsnoter',
    placeholder: 'Skriv en note...',
    toolbar: 'Tekstformatering',
  };
  readonly config: RichTextEditorConfig = {
    toolbarItems: [
      richTextToolbar.bold('Fed'),
      richTextToolbar.textStyle({
        label: 'Teksttype',
        normal: 'Normal tekst',
        heading1: 'Overskrift 1',
        heading2: 'Overskrift 2',
        heading3: 'Overskrift 3',
      }),
    ],
  };
}`,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textbox = await canvas.findByRole('textbox', { name: danishLabels.editor });
    await expect(textbox).toHaveAttribute('aria-placeholder', danishLabels.placeholder);
    await expect(canvas.getByRole('group', { name: danishLabels.toolbar })).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Fed' })).toBeVisible();
    await expect(canvas.queryByRole('button', { name: 'Italic' })).toBeNull();
    const dropdown = canvas.getByRole('combobox', { name: danishTextStyleLabels.label });
    await userEvent.click(dropdown);
    const popup = within(await within(canvasElement.ownerDocument.body).findByRole('listbox'));
    const heading = await popup.findByText(danishTextStyleLabels.heading1);
    await expect(popup.getByText(danishTextStyleLabels.heading2)).toBeVisible();
    await expect(popup.getByText(danishTextStyleLabels.heading3)).toBeVisible();
    await expect(popup.getByText(danishTextStyleLabels.normal)).toBeVisible();
    await userEvent.click(heading);
    await waitFor(() => {
      expect(dropdown).toHaveTextContent(danishTextStyleLabels.heading1);
      expect(textbox.querySelector('h1')).not.toBeNull();
    });
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textbox = await canvas.findByRole('textbox', { name: 'Case notes' });
    const toolbar = canvas.getByRole('group', { name: 'Text formatting' });
    await expect(getComputedStyle(toolbar).display).toBe('flex');
    await expect(getComputedStyle(toolbar).gap).toBe('8px');
    await expect(getComputedStyle(toolbar).paddingInlineStart).toBe('16px');
    await expect(getComputedStyle(toolbar).paddingInlineEnd).toBe('8px');
    await expect(getComputedStyle(toolbar).paddingTop).toBe('8px');
    await expect(getComputedStyle(toolbar).paddingBottom).toBe('8px');
    const controlBounds = Array.from(toolbar.children, (control) =>
      control.getBoundingClientRect()
    );
    await expect(controlBounds[0].left - toolbar.getBoundingClientRect().left).toBe(16);
    await expect(controlBounds[0].top - toolbar.getBoundingClientRect().top).toBe(8);
    for (let index = 1; index < controlBounds.length; index++) {
      if (controlBounds[index].top === controlBounds[index - 1].top) {
        await expect(controlBounds[index].left - controlBounds[index - 1].right).toBe(8);
      }
    }
    await userEvent.click(textbox);
    await expect(getComputedStyle(toolbar).position).toBe('static');
    const items = () =>
      Array.from(canvasElement.querySelectorAll('[data-toolbar-item]')).map((item) =>
        item.getAttribute('data-toolbar-item')
      );
    await expect(items()).toEqual(['textStyle', 'bold', 'orderedList']);
    await expect(canvas.queryByRole('button', { name: 'Italic' })).toBeNull();
    await userEvent.click(canvas.getByRole('button', { name: 'Ordered list' }));
    await waitFor(() => expect(textbox.querySelector('ol')).not.toBeNull());
  },
};

export const CustomInputRules: Story = {
  args: { value: '' },
  parameters: {
    docs: {
      description: {
        story: 'Enable a Tiptap input rule to replace :) with an emoji while typing.',
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      editorConfig: inputRulesConfig,
    },
    template: `
      <kirby-card>
        <kirby-x-rich-text-editor
          ${argsToTemplate(args, { exclude: ['value', 'valueChange', 'config'] })}
          [config]="editorConfig"
          [(value)]="value"
        />
      </kirby-card>
      <pre style="white-space: pre-wrap; overflow-wrap: anywhere">{{ value }}</pre>
    `,
  }),
  play: async ({ canvasElement }) => {
    const textbox = await within(canvasElement).findByRole('textbox', { name: 'Case notes' });
    await userEvent.type(textbox, ':) **bold**');
    await waitFor(() => expect(textbox.textContent).toBe('😊 **bold**'));
    await expect(textbox.querySelector('strong')).toBeNull();
    await userEvent.paste(' :)');
    await waitFor(() => expect(textbox.textContent).toBe('😊 **bold** :)'));
  },
};

export const CustomPasteRules: Story = {
  ...CustomInputRules,
  parameters: {
    docs: {
      description: {
        story: 'Enable a Tiptap paste rule to replace :) with an emoji when pasting.',
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      editorConfig: pasteRulesConfig,
    },
    template: `
      <kirby-card>
        <kirby-x-rich-text-editor
          ${argsToTemplate(args, { exclude: ['value', 'valueChange', 'config'] })}
          [config]="editorConfig"
          [(value)]="value"
        />
      </kirby-card>
      <pre style="white-space: pre-wrap; overflow-wrap: anywhere">{{ value }}</pre>
    `,
  }),
  play: async ({ canvasElement }) => {
    const textbox = await within(canvasElement).findByRole('textbox', { name: 'Case notes' });
    await userEvent.type(textbox, ':)');
    await waitFor(() => expect(textbox.textContent).toBe(':)'));
    await userEvent.clear(textbox);
    await userEvent.paste(':)');
    await waitFor(() => expect(textbox.textContent).toBe('😊'));
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
  play: async ({ canvasElement }) => {
    const textbox = await within(canvasElement).findByRole('textbox', { name: 'New message' });
    await waitFor(() => expect(textbox).toHaveFocus());
  },
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
    await expect(await canvas.findByText('Write a note...')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Focus editor' }));
    await waitFor(() => expect(textbox).toHaveFocus());
    await userEvent.type(textbox, 'A note');
    const html = canvasElement.querySelector('pre');
    await waitFor(() => expect(html).toHaveTextContent('<p>A note</p>'));
    await waitFor(() => expect(canvas.queryByText('Write a note...')).toBeNull());
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
