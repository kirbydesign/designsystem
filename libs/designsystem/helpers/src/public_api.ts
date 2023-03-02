// re-export helpers from core, to preserve backwards compatability
// of 'designsystem' library
export { elementHasAncestor } from './element-has-ancestor';
export { ColorHelper, Color, BrandColor, KirbyColor, NotificationColor } from '@kirbydesign/core';

export {
  DesignTokenHelper,
  ThemeColorDefinition,
  ThemeColorExtended,
  ThemeColorVariant,
  kebabToCamelCase,
  kebabToTitleCase,
  camelToKebabCase,
  capitalizeFirstLetter,
} from '@kirbydesign/core';

export { ThemeColor } from '@kirbydesign/core';
export { PlatformService } from './platform.service';
export { chartConfigHasType } from './chart-config-has-type';
export { deepCopy } from './deep-copy';
export { mergeDeep, mergeDeepAll } from './merge-deep';
export { UniqueIdGenerator } from './unique-id-generator.helper';
export { LineClampHelper } from './line-clamp-helper';
export { KirbyAnimation } from './kirby-animation';
