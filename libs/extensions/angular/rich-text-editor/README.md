# Rich text editor

A Tiptap-based rich text editor with Kirby controls and HTML input/output. Supports headings, bold, italic, underline, and ordered and unordered lists.

## Usage

Import the component into your Angular component or module:

```ts
import { RichTextEditorComponent } from '@kirbydesign/extensions-angular/rich-text-editor';
```

Bind HTML content using `value` and `valueChange`:

```html
<kirby-x-rich-text-editor [(value)]="message" [labels]="{ editor: 'Message' }" />
```

For installation and setup, see [Using Kirby Extensions](../README.md#using-kirby-extensions).

## Documentation

Open **Components / Rich Text Editor / Docs** in the Extensions Storybook for the full API and examples.
