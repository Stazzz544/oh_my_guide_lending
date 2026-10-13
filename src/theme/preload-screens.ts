import { getScreenSources, isScreenName } from '../lib/screens';

import type { Theme } from './theme-context';

const preloaded = new Set<string>();

export const preloadOtherThemeScreens = (current: Theme): void => {
  const other: Theme = current === 'dark' ? 'light' : 'dark';
  document.querySelectorAll<HTMLImageElement>('img[data-screen]:not([data-fixed-theme])').forEach((image) => {
    const name = image.dataset['screen'];
    if (!isScreenName(name)) {
      return;
    }
    const key = `${name}-${other}-${image.sizes}`;
    if (preloaded.has(key)) {
      return;
    }
    preloaded.add(key);
    const loader = new Image();
    loader.decoding = 'async';
    loader.sizes = image.sizes;
    loader.srcset = getScreenSources(name, other).srcSet;
  });
};
