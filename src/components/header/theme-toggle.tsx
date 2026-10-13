import { useI18n } from '../../i18n/i18n-context';
import { cx } from '../../lib/cx';
import { preloadOtherThemeScreens } from '../../theme/preload-screens';
import { useTheme } from '../../theme/theme-context';
import { MoonIcon, SunIcon } from '../icons/icons';

import type { JSX } from 'react';

import styles from './header.module.css';

type ThemeToggleProps = {
  className?: string;
};

export const ThemeToggle = ({ className }: ThemeToggleProps): JSX.Element => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useI18n();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className={cx(styles['icon-button'], className)}
      aria-label={isDark ? t.a11y.toLight : t.a11y.toDark}
      title={isDark ? t.a11y.toLight : t.a11y.toDark}
      onPointerEnter={() => {
        preloadOtherThemeScreens(theme);
      }}
      onFocus={() => {
        preloadOtherThemeScreens(theme);
      }}
      onClick={(event) => {
        toggleTheme(event.currentTarget);
      }}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};
