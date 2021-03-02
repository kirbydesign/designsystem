export interface ShowcaseEvent {
  name: string;
  defaultValue?: string;
  description?: string;
  inputValues?: string[];
  preserveInputValuesWhitespaces?: boolean;
}

export interface ShowcaseEventColumns {
  Name?: string;
  Description?: string;
  Type?: string;
  Default?: string;
}

export const defaultEventColumns: ShowcaseEventColumns = Object.freeze({
  Name: 'Name',
  Description: 'Description',
  Type: 'Signature',
});
