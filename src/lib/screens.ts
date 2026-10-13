import type { Theme } from '../theme/theme-context';

export const SCREEN_NAMES = [
  'nearby-map',
  'nearby-list',
  'nearby-museums',
  'place-card',
  'route',
  'city',
  'free',
  'favorites',
  'generate',
  'tour',
  'saved',
  'settings',
] as const;

export type ScreenName = (typeof SCREEN_NAMES)[number];

export type ScreenSources = {
  src: string;
  srcSet: string;
};

export const SCREEN_WIDTH = 1344;
export const SCREEN_HEIGHT = 2992;

export const HERO_FOCUS = { x: 0.4989, y: 0.3325 };

const files = import.meta.glob<string>('../assets/screens/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
});

const fileUrl = (name: ScreenName, theme: Theme, width: number): string =>
  files[`../assets/screens/${name}-${theme}-${width}.webp`] ?? '';

export const getScreenSources = (name: ScreenName, theme: Theme): ScreenSources => {
  const small = fileUrl(name, theme, 480);
  const large = fileUrl(name, theme, 960);
  return {
    src: large,
    srcSet: `${small} 480w, ${large} 960w`,
  };
};

export const isScreenName = (value: string | undefined): value is ScreenName =>
  SCREEN_NAMES.some((name) => name === value);
