export interface ShowcaseEvent {
  name: string;
  description?: string;
  signature?: string;
}

export interface ShowcaseEventColumns {
  Name?: string;
  Description?: string;
  Type?: string;
}

export const defaultEventColumns: ShowcaseEventColumns = Object.freeze({
  Name: 'Name',
  Description: 'Description',
  Type: 'Signature',
});
