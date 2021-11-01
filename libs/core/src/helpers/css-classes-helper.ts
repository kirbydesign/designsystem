// TODO: we should find a better place to store types like this one
export type CssClassMap = { [className: string]: boolean };

export const createClassList = (
  classes: string | (string | null | undefined)[] | undefined
): string[] => {
  if (classes !== undefined) {
    const array = Array.isArray(classes) ? classes : classes.split(' ');
    return array
      .filter((c) => c != null)
      .map((c) => (c as string).trim())
      .filter((c) => c !== '');
  }
  return [];
};

export const createClassMap = (classes: string | string[] | undefined): CssClassMap => {
  const map: CssClassMap = {};
  createClassList(classes).forEach((c) => (map[c] = true));
  return map;
};
