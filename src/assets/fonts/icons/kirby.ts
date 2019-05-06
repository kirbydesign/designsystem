import { CustomIconSettings } from '~/kirby/components/icon/custom-icon-settings';

export const kirbyCustomIconSettings: CustomIconSettings = {
  fontfamily: "'kirby'",
  icons: [
    {
      name: 'football',
      svg: 'assets/icons/football.svg',
      unicode: '0xf101',
    },
    {
      name: 'icon-sprite',
      svg: 'assets/icons/icon-sprite.svg',
      unicode: '0xf102',
    },
    {
      name: 'umbrella',
      svg: 'assets/icons/umbrella.svg',
      unicode: '0xf103',
    },
  ],
};
