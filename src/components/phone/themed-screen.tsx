import { useI18n } from '../../i18n/i18n-context';
import { SCREEN_HEIGHT, SCREEN_WIDTH, getScreenSources } from '../../lib/screens';
import { useTheme } from '../../theme/theme-context';

import type { ScreenName } from '../../lib/screens';
import type { Theme } from '../../theme/theme-context';
import type { JSX } from 'react';

import styles from './phone.module.css';

type ThemedScreenProps = {
  name: ScreenName;
  sizes: string;
  fixedTheme?: Theme;
  priority?: boolean;
  decorative?: boolean;
};

export const ThemedScreen = ({
  name,
  sizes,
  fixedTheme,
  priority = false,
  decorative = false,
}: ThemedScreenProps): JSX.Element => {
  const { theme } = useTheme();
  const { t } = useI18n();
  const actualTheme = fixedTheme ?? theme;
  const { src, srcSet } = getScreenSources(name, actualTheme);

  return (
    <img
      key={actualTheme}
      className={styles['image']}
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      width={SCREEN_WIDTH}
      height={SCREEN_HEIGHT}
      alt={decorative ? '' : t.screens[name]}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      draggable={false}
      data-screen={name}
      data-fixed-theme={fixedTheme ? '' : undefined}
    />
  );
};
