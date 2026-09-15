import type { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: 'design.kirby.modalkeyboardlab',
  appName: 'Modal Keyboard Lab',
  // Angular's application builder emits into a `browser` subfolder of the output path.
  webDir: 'www/browser',
  plugins: {
    Keyboard: {
      resize: KeyboardResize.None,
    },
  },
};

export default config;
