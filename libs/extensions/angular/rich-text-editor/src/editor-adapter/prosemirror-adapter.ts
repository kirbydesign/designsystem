import { baseKeymap, setBlockType, toggleMark } from 'prosemirror-commands';
import { history, redo, undo } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import {
  Node as DocumentNode,
  DOMParser,
  DOMSerializer,
  NodeType,
  Schema,
} from 'prosemirror-model';
import { schema as basicSchema } from 'prosemirror-schema-basic';
import { addListNodes, liftListItem, splitListItem, wrapInList } from 'prosemirror-schema-list';
import { AllSelection, Command, EditorState, TextSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import {
  BlockLevel,
  EditorAction,
  editorAttributes,
  EditorOptions,
  EditorSettings,
  FormattingAction,
  formattingActions,
  RichTextEditorAdapter,
} from './rich-text-editor-adapter';

export class ProseMirrorAdapter implements RichTextEditorAdapter {
  private readonly schema = new Schema({
    nodes: addListNodes(
      basicSchema.spec.nodes
        .update('heading', {
          ...basicSchema.nodes['heading'].spec,
          parseDOM: [1, 2, 3].map((level) => ({ tag: `h${level}`, attrs: { level } })),
        })
        .remove('blockquote')
        .remove('code_block')
        .remove('horizontal_rule')
        .remove('image'),
      'paragraph block*',
      'block'
    ),
    marks: {
      bold: basicSchema.marks['strong'].spec,
      italic: basicSchema.marks['em'].spec,
      underline: {
        parseDOM: [{ tag: 'u' }, { style: 'text-decoration=underline' }],
        toDOM: () => ['u', 0],
      },
    },
  });
  private view!: EditorView;
  private options!: EditorOptions;
  private readonly commands: Record<EditorAction, Command> = {
    bold: toggleMark(this.schema.marks['bold'], null, { removeWhenPresent: false }),
    italic: toggleMark(this.schema.marks['italic'], null, { removeWhenPresent: false }),
    underline: toggleMark(this.schema.marks['underline'], null, { removeWhenPresent: false }),
    bulletList: this.listCommand(this.schema.nodes['bullet_list']),
    orderedList: this.listCommand(this.schema.nodes['ordered_list']),
    undo,
    redo,
  };

  mount(element: HTMLElement, options: EditorOptions): void {
    this.options = options;
    const item = this.schema.nodes['list_item'];
    const blockShortcut = (level: BlockLevel) => () => {
      this.setBlock(level);
      return true;
    };
    const hardBreak: Command = (state, dispatch) => {
      dispatch?.(
        state.tr.replaceSelectionWith(this.schema.nodes['hard_break'].create()).scrollIntoView()
      );
      return true;
    };
    this.view = new EditorView(element, {
      state: EditorState.create({
        schema: this.schema,
        doc: this.parse(options.value),
        plugins: [
          history(),
          keymap({
            'Mod-b': this.commands.bold,
            'Mod-i': this.commands.italic,
            'Mod-u': this.commands.underline,
            'Mod-Alt-0': blockShortcut(0),
            'Mod-Alt-1': blockShortcut(1),
            'Mod-Alt-2': blockShortcut(2),
            'Mod-Alt-3': blockShortcut(3),
            'Mod-Shift-8': this.commands.bulletList,
            'Mod-Shift-7': this.commands.orderedList,
            'Mod-z': undo,
            'Mod-Shift-z': redo,
            'Mod-y': redo,
            Enter: splitListItem(item),
            'Shift-Enter': hardBreak,
            'Mod-Enter': hardBreak,
          }),
          keymap(baseKeymap),
        ],
      }),
      dispatchTransaction: (transaction) => {
        if (transaction.selection instanceof AllSelection) {
          transaction.setSelection(
            TextSelection.between(
              transaction.doc.resolve(0),
              transaction.doc.resolve(transaction.doc.content.size)
            )
          );
        }
        this.view.updateState(this.view.state.apply(transaction));
        if (transaction.docChanged && transaction.getMeta('externalValue') !== true) {
          options.onChange(this.getValue());
        }
        this.publishState();
      },
      handleDOMEvents: {
        focus: () => {
          options.onFocus();
          return false;
        },
        blur: () => {
          options.onBlur();
          return false;
        },
      },
    });
    this.configure(options);
  }

  setValue(value: string): void {
    if (value === this.getValue()) return;
    this.view.dispatch(
      this.view.state.tr
        .replaceWith(0, this.view.state.doc.content.size, this.parse(value).content)
        .setMeta('addToHistory', false)
        .setMeta('externalValue', true)
    );
  }

  configure(settings: EditorSettings): void {
    this.view.setProps({
      editable: () => !settings.readonly,
      attributes: editorAttributes(settings),
    });
    this.publishState();
  }

  execute(action: EditorAction): void {
    if (!this.view.editable) return;
    this.view.focus();
    this.commands[action](this.view.state, this.view.dispatch, this.view);
  }

  setBlock(level: BlockLevel): void {
    if (!this.view.editable) return;
    this.view.focus();
    const command =
      level === 0
        ? setBlockType(this.schema.nodes['paragraph'])
        : setBlockType(this.schema.nodes['heading'], { level });
    if (command(this.view.state, this.view.dispatch)) return;
    if (
      this.activeList(this.view.state) &&
      liftListItem(this.schema.nodes['list_item'])(this.view.state, this.view.dispatch)
    ) {
      this.setBlock(level);
    }
  }

  focus(): void {
    this.view.focus();
  }

  blur(): void {
    this.view.dom.blur();
  }

  destroy(): void {
    this.view.destroy();
  }

  private parse(value: string): DocumentNode {
    const container = document.createElement('div');
    container.innerHTML = value;
    return DOMParser.fromSchema(this.schema).parse(container);
  }

  private getValue(): string {
    const container = document.createElement('div');
    container.appendChild(
      DOMSerializer.fromSchema(this.schema).serializeFragment(this.view.state.doc.content)
    );
    return container.innerHTML;
  }

  private listCommand(type: NodeType): Command {
    return (state, dispatch, view) => {
      const list = this.activeList(state);
      if (!list) {
        if (!wrapInList(type)(state) && dispatch) {
          setBlockType(this.schema.nodes['paragraph'])(state, dispatch);
          state = this.view.state;
        }
        return wrapInList(type)(state, dispatch, view);
      }
      if (list.type === type)
        return liftListItem(this.schema.nodes['list_item'])(state, dispatch, view);
      dispatch?.(state.tr.setNodeMarkup(list.pos, type).scrollIntoView());
      return true;
    };
  }

  private activeList(state: EditorState): { type: NodeType; pos: number } | undefined {
    const { $from } = state.selection;
    for (let depth = $from.depth; depth > 0; depth--) {
      const type = $from.node(depth).type;
      if (type === this.schema.nodes['bullet_list'] || type === this.schema.nodes['ordered_list']) {
        return { type, pos: $from.before(depth) };
      }
    }
    return undefined;
  }

  private isActive(action: FormattingAction): boolean {
    const state = this.view.state;
    if (action === 'bulletList' || action === 'orderedList') {
      return (
        this.activeList(state)?.type ===
        this.schema.nodes[action === 'bulletList' ? 'bullet_list' : 'ordered_list']
      );
    }
    const { from, to, empty, $from } = state.selection;
    const mark = this.schema.marks[action];
    if (empty) return !!mark.isInSet(state.storedMarks || $from.marks());
    let hasText = false;
    let allMarked = true;
    state.doc.nodesBetween(from, to, (node) => {
      if (node.isText) {
        hasText = true;
        allMarked = allMarked && !!mark.isInSet(node.marks);
      }
    });
    return hasText && allMarked;
  }

  private publishState(): void {
    const state = this.view.state;
    const heading = state.selection.$from.parent;
    const level: unknown =
      heading.type === this.schema.nodes['heading'] ? heading.attrs['level'] : 0;
    this.options.onStateChange({
      empty:
        state.doc.childCount === 1 &&
        !!state.doc.firstChild?.isTextblock &&
        state.doc.firstChild.content.size === 0,
      active: formattingActions.filter((action) => this.isActive(action)),
      block: level === 1 || level === 2 || level === 3 ? level : 0,
      canUndo: undo(state),
      canRedo: redo(state),
    });
  }
}
