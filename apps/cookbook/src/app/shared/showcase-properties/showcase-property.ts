export interface ShowcaseProperty {
  name: string;
  defaultValue?: string;
  description?: string;
  inputValues?: string[];
  preserveInputValuesWhitespaces?: boolean;
}

export interface ShowcasePropertyColumns {
  Name?: string;
  Description?: string;
  Type?: string;
  Default?: string;
}
