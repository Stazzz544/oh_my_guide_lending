import { useCallback, useEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';

import { ThemeContext } from './theme-context';
import { runThemeTransition } from './view-transition';

import type { Theme } from './theme-context';
import type { JSX, ReactNode } from 'react';

type ThemeProviderProps = {
  children: ReactNode;
};

const THEME_STORAGE_KEY = 'omg-theme';
const THEME_COLORS: Record<Theme, string> = { light: '#ffffff', dark: '#0d0d1a' };

const readInitialTheme = (): Theme => (document.documentElement.dataset['theme'] === 'dark' ? 'dark' : 'light');

const readStoredTheme = (): Theme | null => {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  } catch {
    return null;
  }
  return null;
};

const applyThemeToDocument = (theme: Theme): void => {
  document.documentElement.dataset['theme'] = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
};

export const ThemeProvider = ({ children }: ThemeProviderProps): JSX.Element => {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);

  useEffect(() => {
    if (readStoredTheme()) {
      return;
    }
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event: MediaQueryListEvent): void => {
      if (readStoredTheme()) {
        return;
      }
      const next: Theme = event.matches ? 'dark' : 'light';
      applyThemeToDocument(next);
      setTheme(next);
    };
    query.addEventListener('change', onChange);
    return () => {
      query.removeEventListener('change', onChange);
    };
  }, []);

  const toggleTheme = useCallback(
    (origin?: HTMLElement | null) => {
      const next: Theme = theme === 'dark' ? 'light' : 'dark';
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // storage can be blocked in private mode
      }
      runThemeTransition(origin ?? null, () => {
        flushSync(() => {
          setTheme(next);
        });
        applyThemeToDocument(next);
      });
    },
    [theme],
  );

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
