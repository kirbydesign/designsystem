export interface ShowcaseProperty {
  name: string;
  description?: string;
  defaultValue?: string;
  inputValues?: string[];
  preserveInputValuesWhitespaces?: boolean;
}

export interface ShowcasePropertyColumns {
  Name: string;
  Description?: string;
  Type?: string;
  Default?: string;
}
