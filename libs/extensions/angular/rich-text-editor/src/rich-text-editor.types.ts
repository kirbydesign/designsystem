export interface RichTextEditorRef {
  focus(): void;
  blur(): void;
}

export interface RichTextEditorCreatedEvent {
  editor: RichTextEditorRef;
}

export interface RichTextEditorTexts {
  bold: string;
  italic: string;
  underline: string;
  bulletList: string;
  orderedList: string;
  undo: string;
  redo: string;
  boldText: string;
  italicText: string;
  underlineText: string;
  heading1: string;
  heading2: string;
  heading3: string;
  normal: string;
  toolbar: string;
  textStyle: string;
}
