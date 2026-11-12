import { Component, inject, Input, signal } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { UniqueIdGenerator } from '@kirbydesign/designsystem/helpers';
import { RichTextEditorComponent } from './rich-text-editor.component';
import { EDITOR_ADAPTER_FACTORY } from './editor-adapter/editor-adapter-factory';
import { ProseMirrorAdapter } from './editor-adapter/prosemirror-adapter';
import { TiptapAdapter } from './editor-adapter/tiptap-adapter';
import {
  RichTextEditorCreatedEvent,
  RichTextEditorRef,
  RichTextEditorTexts,
} from './rich-text-editor.types';

const danishTexts: RichTextEditorTexts = {
  bold: 'Fed',
  italic: 'Kursiv',
  underline: 'Understreget',
  bulletList: 'Punktopstilling',
  orderedList: 'Nummereret liste',
  undo: 'Fortryd',
  redo: 'Gentag',
  boldText: 'F',
  italicText: 'K',
  underlineText: 'U',
  heading1: 'Overskrift 1',
  heading2: 'Overskrift 2',
  heading3: 'Overskrift 3',
  normal: 'Normal tekst',
  toolbar: 'Tekstformatering',
  textStyle: 'Teksttype',
};

@Component({
  selector: 'kirby-rich-text-editor-spike',
  imports: [RichTextEditorComponent, ButtonComponent],
  providers: [
    {
      provide: EDITOR_ADAPTER_FACTORY,
      useFactory: () => {
        const demo = inject(RichTextEditorSpikeComponent);
        return () => (demo.engine() === 'tiptap' ? new TiptapAdapter() : new ProseMirrorAdapter());
      },
    },
  ],
  template: `
    <div class="spike-demo">
      <h2>Rich text editor spike</h2>
      <label>
        Engine (demo only)
        <select aria-label="Editor engine" [value]="engine()" (change)="switchEngine($event)">
          <option value="tiptap">Tiptap</option>
          <option value="prosemirror">ProseMirror</option>
        </select>
      </label>
      <p class="demo-actions">
        <button kirby-button size="sm" (click)="readonly = !readonly">Toggle read-only</button>
        <button
          kirby-button
          size="sm"
          (click)="value = '<p>Loaded <strong>HTML</strong> content.</p>'"
        >
          Load HTML
        </button>
        <button kirby-button size="sm" (click)="value = ''">Clear</button>
        <button kirby-button size="sm" (click)="editor?.focus()">Focus editor</button>
        <button kirby-button size="sm" (click)="editor?.blur()">Blur editor</button>
        <button kirby-button size="sm" (click)="texts = texts.heading1 ? {} : danishTexts">
          Toggle Danish labels
        </button>
      </p>
      @if (mounted()) {
        <kirby-x-rich-text-editor
          [value]="value"
          (valueChange)="value = $event; changes = changes + 1"
          placeholder="Write a note..."
          aria-label="Rich text editor"
          [aria-describedby]="helpId"
          [readonly]="readonly"
          [texts]="texts"
          (editorFocus)="focused = true"
          (editorBlur)="focused = false"
          (editorCreated)="created($event)"
        />
      }
      <p [id]="helpId">
        Tab moves between the editor and controls. Enter or Space activates buttons. Arrow keys
        choose text styles. Ctrl/Cmd+B, I or U formats selected text.
      </p>
      <p role="status">
        Focused: {{ focused }} | Read-only: {{ readonly }} | Changes: {{ changes }} | Created:
        {{ creations }}
      </p>
      <h3>HTML output</h3>
      <pre>{{ value }}</pre>
    </div>
  `,
  styles: [
    `
      .spike-demo {
        max-width: 900px;
        margin: auto;
      }
      .demo-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      select {
        font: inherit;
        margin-inline-start: 8px;
        padding: 8px;
      }
      pre {
        white-space: pre-wrap;
        overflow-wrap: anywhere;
      }
    `,
  ],
})
class RichTextEditorSpikeComponent {
  @Input() texts: Partial<RichTextEditorTexts> = {};
  @Input() set initialEngine(value: 'tiptap' | 'prosemirror') {
    this.engine.set(value);
  }
  @Input() autofocus = false;
  readonly engine = signal<'tiptap' | 'prosemirror'>('tiptap');
  protected readonly danishTexts = danishTexts;
  protected readonly helpId = UniqueIdGenerator.scopedTo('rich-text-editor-help').next();
  protected readonly mounted = signal(true);
  protected value =
    '<p>A Kirby note with <strong>bold</strong> and <em>italic</em> text.</p><ul><li><p>Try both engines</p></li></ul>';
  protected readonly = false;
  protected focused = false;
  protected changes = 0;
  protected creations = 0;
  protected editor?: RichTextEditorRef;

  protected switchEngine(event: Event): void {
    const target = event.target;
    if (!(target instanceof HTMLSelectElement)) throw new Error('Expected engine select');
    if (target.value !== 'tiptap' && target.value !== 'prosemirror')
      throw new Error('Unknown editor engine');
    this.engine.set(target.value);
    this.mounted.set(false);
    this.editor = undefined;
    this.focused = false;
    setTimeout(() => this.mounted.set(true));
  }

  protected created(event: RichTextEditorCreatedEvent): void {
    this.editor = event.editor;
    this.creations++;
    if (this.autofocus) this.editor.focus();
  }
}

const meta: Meta<RichTextEditorSpikeComponent> = {
  title: 'Spikes/Rich Text Editor',
  component: RichTextEditorSpikeComponent,
  parameters: { controls: { disable: true } },
};
export default meta;
type Story = StoryObj<RichTextEditorSpikeComponent>;

export const Comparison: Story = {};
export const Tiptap: Story = { args: { initialEngine: 'tiptap', autofocus: true } };
export const ProseMirror: Story = { args: { initialEngine: 'prosemirror', autofocus: true } };
export const Danish: Story = { args: { texts: danishTexts } };
