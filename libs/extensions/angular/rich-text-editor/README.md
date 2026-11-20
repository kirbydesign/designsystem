# Rich text editor

A Tiptap-based rich text editor with Kirby controls and HTML input/output. Supports headings, bold, italic, underline, and ordered and unordered lists.

## Usage

Import the component into your Angular component or module:

```ts
import { CardComponent } from '@kirbydesign/designsystem/card';
import {
  RichTextEditorComponent,
  RichTextEditorConfig,
  richTextToolbar,
} from '@kirbydesign/extensions-angular/rich-text-editor';
```

Define the controls and their labels on your component:

```ts
readonly config: RichTextEditorConfig = {
  toolbarItems: [
    richTextToolbar.bold('Bold'),
    richTextToolbar.bulletList('Unordered list'),
  ],
};
```

Bind HTML content using `value` and `valueChange`:

```html
<kirby-card>
  <kirby-x-rich-text-editor
    [(value)]="message"
    [config]="config"
    [labels]="{ editor: 'Message' }"
  />
</kirby-card>
```

Omit `config.toolbarItems` for no controls. Only selected controls need labels; Kirby supplies their icons and shortcuts. Configuration is initialization-only; recreate the editor to apply changes.

Place the editor in a `kirby-card` for background, rounded corners and elevation. Use the card's `variant` to choose a surface. Without a card, the editor is transparent and inherits the surrounding surface.

For installation and setup, see [Using Kirby Extensions](../README.md#using-kirby-extensions).

## Documentation

Open **Components / Rich Text Editor / Docs** in the Extensions Storybook for the full API and examples.
