import {
  applicationConfig,
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { Extension, textInputRule, textPasteRule } from '@tiptap/core';
import {
  RichTextEditorComponent,
  RichTextEditorConfig,
  RichTextEditorLabels,
  RichTextEditorToolbarItem,
} from '@kirbydesign/extensions-angular/rich-text-editor';
import { responsiveModes } from 'tools/storybook-config/shared-config';

const initialValue =
  '<p>A Kirby note with <strong>bold</strong> and <em>italic</em> text.</p><ul><li><p>A list item</p></li></ul>';

const danishLabels: RichTextEditorLabels = {
  editor: 'Sagsnoter',
  placeholder: 'Skriv en note...',
  bold: 'Fed',
  italic: 'Kursiv',
  underline: 'Understreget',
  bulletList: 'Punktopstilling',
  orderedList: 'Nummereret liste',
  heading1: 'Overskrift 1',
  heading2: 'Overskrift 2',
  heading3: 'Overskrift 3',
  normal: 'Normal tekst',
  toolbar: 'Tekstformatering',
  textStyle: 'Teksttype',
};

const fullToolbarItems: RichTextEditorToolbarItem[] = [
  'bold',
  'italic',
  'underline',
  'bulletList',
  'orderedList',
  'textStyle',
];

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
  extensions: [emojiShortcuts],
  enableInputRules: ['emojiShortcuts'],
};

const pasteRulesConfig: RichTextEditorConfig = {
  extensions: [emojiShortcuts],
  enablePasteRules: [emojiShortcuts],
};

@Component({
  selector: 'kirby-x-rich-text-editor-focus-example',
  imports: [RichTextEditorComponent],
  template: `
    <kirby-x-rich-text-editor
      [labels]="{ editor: 'New message', placeholder: 'Write a message...' }"
    />
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
      imports: [ButtonComponent, FocusOnEntryExampleComponent],
    }),
  ],
  parameters: {
    chromatic: { modes: { ...responsiveModes } },
    controls: {
      include: [
        'value',
        'config',
        'toolbarItems',
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
A Tiptap-based rich text editor with Kirby controls and an HTML value.
Supports paragraphs, Heading 1–3, bold, italic, underline, unordered/ordered lists, line breaks and undo/redo.

Import \`RichTextEditorComponent\` from \`@kirbydesign/extensions-angular/rich-text-editor\`
and bind content with \`[(value)]="html"\`. Markdown conversion is the consumer's responsibility.
Programmatic value updates do not emit \`valueChange\` or create undo entries.

### Configuration and toolbar
\`config\` adds Tiptap extensions and selectively enables input/paste rules. It is read once
when the editor is created; replacing it afterward throws an error. Keep it in a stable property.
Rules are disabled by default; enable all with true or select extensions by name/instance.
\`toolbarItems\` selects and orders existing controls; an empty array hides the controls.
\`labels\` partially overrides all wording, including the placeholder and textbox name, and is
read once during initialization. Recreate the editor to apply different labels.
\`toolbarItems\` supports runtime updates without resetting the editor. Hiding controls does not
remove formats from the schema or disable their keyboard shortcuts.

### Sizing
Set CSS custom properties on the editor host: \`--kirby-x-rich-text-editor-min-height\`
and \`--kirby-x-rich-text-editor-max-height\`. They size the writing area including padding,
not the toolbar. Content grows to the maximum, then scrolls while the toolbar stays visible.
Set both to the same value for a fixed height, and keep the maximum at least as large as the minimum.
Custom values apply on desktop and mobile and can change through CSS without recreating the editor.
Without overrides the existing responsive minimum remains, with no maximum.

### Keyboard and accessibility
Provide a meaningful \`labels.editor\` and optionally \`aria-describedby\` referencing visible help.
Tab/Shift+Tab navigate without trapping focus in lists; native buttons support Enter/Space.
Use Ctrl/Cmd+B, I or U for formatting, Ctrl/Cmd+Shift+8/7 for lists,
Ctrl/Cmd+Alt+0–3 for paragraph/headings, and Ctrl/Cmd+Z/Shift+Z for undo/redo.
The toolbar stays in normal document flow at every screen size; controls wrap when necessary.
Formatting controls use Kirby icons; undo/redo are available through keyboard shortcuts or
\`execute(action)\`, not toolbar buttons.
Screen-reader and physical mobile-keyboard assessment are still required before production use;
this is not an accessibility compliance certification.

### Pasted HTML
By default Tiptap's schema preserves supported formatting such as \`<b>\`/\`<strong>\` but excludes
unsupported nodes such as iframes. Additional extensions may change the schema. This is not
a general-purpose security sanitizer for HTML stored or
rendered elsewhere. Keep Tiptap and its transitive ProseMirror dependencies updated.

### Programmatic controls
Call \`editor.focus()\` or \`editor.blur()\` through a template reference or \`ViewChild\`.
To focus on page entry, call \`focus()\` from the parent's \`ngAfterViewInit\`, once the child
editor is initialized. For a cached page, call it from the page-enter lifecycle instead.
See the standalone Focus On Entry story; automatic focus is opt-in and mobile browsers may
require a user gesture to open the software keyboard.
No created event or raw Tiptap instance is required. \`execute(action)\` supports bold, italic,
underline, bulletList, orderedList, undo and redo; \`setBlock(level)\` accepts 0 (paragraph) or 1–3.
`,
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'HTML content. Supports two-way binding through valueChange.',
      table: { category: 'Inputs', defaultValue: { summary: "''" } },
    },
    config: {
      control: false,
      description:
        'Initialization-only RichTextEditorConfig: additional Tiptap extensions and native enableInputRules/enablePasteRules options. Rules default to false. Replacing config after initialization throws; do not mutate it.',
      table: { category: 'Inputs', defaultValue: { summary: '{}' } },
    },
    toolbarItems: {
      control: 'object',
      description:
        'Ordered, unique controls: bold, italic, underline, bulletList, orderedList, textStyle. Defaults to all six. Empty hides controls; does not restrict document formats. Runtime updates preserve the editor.',
      table: { category: 'Inputs', defaultValue: { summary: 'All supported controls' } },
    },
    readonly: {
      control: 'boolean',
      description:
        'Prevents editing and disables formatting controls while retaining focusability.',
      table: { category: 'Inputs', defaultValue: { summary: 'false' } },
    },
    labels: {
      control: false,
      description:
        'Initialization-only Partial<RichTextEditorLabels>: editor name, placeholder, labels, tooltips, headings and accessible toolbar names. Omitted keys keep English defaults. Recreate the editor to apply different labels.',
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
    toolbarItems: fullToolbarItems,
    readonly: false,
    'aria-describedby': '',
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
};
export default meta;
type Story = StoryObj<EditorStoryArgs>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Edit HTML using the built-in toolbar. The value control accepts programmatic HTML updates.',
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

export const ReadOnly: Story = {
  args: { readonly: true },
  parameters: {
    docs: {
      description: {
        story:
          'Read-only content remains focusable and selectable; formatting controls are disabled.',
      },
    },
  },
};

export const CustomHeight: Story = {
  args: { value: '<p>A short note.</p>' },
  parameters: {
    docs: {
      description: {
        story:
          'CSS custom properties give the writing area an 8rem minimum and 16rem maximum, including padding. Add content to reach the maximum and scroll; the toolbar remains visible. Set both properties to the same value for a fixed height. Overrides also apply on small screens.',
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
      <kirby-x-rich-text-editor
        style="--kirby-x-rich-text-editor-min-height: 8rem; --kirby-x-rich-text-editor-max-height: 16rem; margin-block-start: var(--kirby-spacing-s)"
        ${argsToTemplate(args, { exclude: ['value', 'valueChange'] })}
        [(value)]="value"
      />
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
  args: { labels: danishLabels },
  parameters: {
    docs: {
      description: {
        story:
          'Provide labels when creating the editor, including the textbox name, placeholder, headings, tooltips and accessible toolbar names.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textbox = await canvas.findByRole('textbox', { name: danishLabels.editor });
    await expect(textbox).toHaveAttribute('aria-placeholder', danishLabels.placeholder);
    await expect(canvas.getByRole('group', { name: danishLabels.toolbar })).toBeVisible();
    await expect(canvas.getByRole('button', { name: danishLabels.bold })).toBeVisible();
    const dropdown = canvas.getByRole('combobox', { name: danishLabels.textStyle });
    await userEvent.click(dropdown);
    const popup = within(canvasElement.ownerDocument.body);
    const heading = await popup.findByRole('option', { name: danishLabels.heading1 });
    await expect(popup.getByRole('option', { name: danishLabels.heading2 })).toBeVisible();
    await expect(popup.getByRole('option', { name: danishLabels.heading3 })).toBeVisible();
    await expect(popup.getByRole('option', { name: danishLabels.normal })).toBeVisible();
    await userEvent.click(heading);
    await waitFor(() => {
      expect(dropdown).toHaveTextContent(danishLabels.heading1);
      expect(textbox.querySelector('h1')).not.toBeNull();
    });
  },
};

export const CustomToolbar: Story = {
  args: { toolbarItems: ['textStyle', 'bold', 'orderedList'] },
  parameters: {
    docs: {
      description: {
        story:
          'Choose and order controls, then change controls at runtime without resetting the editor. Removing controls does not disable keyboard formatting or supported pasted content.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, fullToolbarItems },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-block-end: 16px">
        <button kirby-button size="sm" (click)="toolbarItems = ['italic', 'bold']">Compact toolbar</button>
        <button kirby-button size="sm" (click)="toolbarItems = []">Hide controls</button>
        <button kirby-button size="sm" (click)="toolbarItems = fullToolbarItems">Full toolbar</button>
      </div>
      <kirby-x-rich-text-editor
        ${argsToTemplate(args, { exclude: ['value', 'valueChange'] })}
        [(value)]="value"
      />
      <pre style="white-space: pre-wrap; overflow-wrap: anywhere">{{ value }}</pre>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textbox = await canvas.findByRole('textbox', { name: 'Case notes' });
    const content = textbox.innerHTML;
    const toolbar = canvas.getByRole('group', { name: 'Text formatting' });
    await expect(getComputedStyle(toolbar).display).toBe('flex');
    await userEvent.click(textbox);
    await expect(getComputedStyle(toolbar).position).toBe('static');
    const items = () =>
      Array.from(canvasElement.querySelectorAll('[data-toolbar-item]')).map((item) =>
        item.getAttribute('data-toolbar-item')
      );
    await expect(items()).toEqual(['textStyle', 'bold', 'orderedList']);
    await userEvent.click(canvas.getByRole('button', { name: 'Compact toolbar' }));
    await waitFor(() => expect(items()).toEqual(['italic', 'bold']));
    await userEvent.click(canvas.getByRole('button', { name: 'Hide controls' }));
    await waitFor(() => expect(items()).toEqual([]));
    await userEvent.click(canvas.getByRole('button', { name: 'Full toolbar' }));
    await waitFor(() => expect(items()).toEqual(fullToolbarItems));
    await expect(canvas.getByRole('textbox', { name: 'Case notes' })).toBe(textbox);
    await expect(textbox.innerHTML).toBe(content);
  },
};

export const CustomInputRules: Story = {
  args: { value: '' },
  parameters: {
    docs: {
      description: {
        story:
          'Type :) to insert an emoji through a consumer-provided Tiptap extension. Only this extension’s input rules are enabled; its paste rules and StarterKit input rules remain disabled. No Markdown conversion is added.',
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      editorConfig: inputRulesConfig,
    },
    template: `
      <kirby-x-rich-text-editor
        ${argsToTemplate(args, { exclude: ['value', 'valueChange', 'config'] })}
        [config]="editorConfig"
        [(value)]="value"
      />
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
        story:
          'Paste :) to insert an emoji. This selects paste rules by extension instance while leaving input rules disabled, so typing :) does not replace it.',
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      editorConfig: pasteRulesConfig,
    },
    template: `
      <kirby-x-rich-text-editor
        ${argsToTemplate(args, { exclude: ['value', 'valueChange', 'config'] })}
        [config]="editorConfig"
        [(value)]="value"
      />
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
        story:
          'A consumer component calls the public focus() method from ngAfterViewInit. This example is excluded from autodocs so it does not steal focus while reading documentation. Mobile browsers may require a user gesture to open their software keyboard.',
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
          'Use a template reference (or ViewChild in TypeScript) to call focus/blur directly. Content remains bound through value; no editorCreated event is necessary. This story explicitly uses zoneless change detection.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, fullToolbarItems },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-block-end: 16px">
        <button kirby-button size="sm" (click)="editor.focus()">Focus editor</button>
        <button kirby-button size="sm" (click)="editor.blur()">Blur editor</button>
        <button kirby-button size="sm" (click)="value = '<p>Loaded <strong>HTML</strong> content.</p>'">Load HTML</button>
        <button kirby-button size="sm" (click)="value = ''">Clear</button>
        <button kirby-button size="sm" (click)="readonly = !readonly">Toggle read-only</button>
        <button kirby-button size="sm" (click)="toolbarItems = toolbarItems.length ? [] : fullToolbarItems">Toggle controls</button>
      </div>
      <kirby-x-rich-text-editor
        #editor
        ${argsToTemplate(args, { exclude: ['value', 'valueChange'] })}
        [(value)]="value"
      />
      <p>Editor focused: {{ editor.focused() }}</p>
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
    await expect(await canvas.findByText('Editor focused: true')).toBeVisible();
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
    await waitFor(() => expect(canvas.getByText('Editor focused: false')).toBeVisible());
    await expect(textbox).not.toHaveFocus();
  },
};
import { AfterViewInit, Component, provideZonelessChangeDetection, viewChild } from '@angular/core';
