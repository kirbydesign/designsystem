import { ShowcaseMember } from '../showcase-member/showcase-member';

export interface ShowcaseProperty extends ShowcaseMember {
  defaultValue?: string;
  inputValues?: string[];
  preserveInputValuesWhitespaces?: boolean;
}
