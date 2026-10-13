import { useCallback, useEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';

import { canAnimateTransitions } from '../theme/view-transition';
import { LANG_STORAGE_KEY, detectLanguage } from './detect-language';
import { en } from './en';
import { I18nContext } from './i18n-context';
import { ru } from './ru';

import type { Lang } from './detect-language';
import type { Dictionary } from './ru';
import type { JSX, ReactNode } from 'react';

type I18nProviderProps = {
  children: ReactNode;
};

const DICTIONARIES: Record<Lang, Dictionary> = { ru, en };

const syncDocument = (lang: Lang): void => {
  const dictionary = DICTIONARIES[lang];
  document.documentElement.lang = lang;
  document.title = dictionary.meta.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', dictionary.meta.description);
};

export const I18nProvider = ({ children }: I18nProviderProps): JSX.Element => {
  const [lang, setLangState] = useState<Lang>(detectLanguage);

  useEffect(() => {
    syncDocument(lang);
  }, [lang]);

  const setLang = useCallback(
    (next: Lang) => {
      if (next === lang) {
        return;
      }
      try {
        window.localStorage.setItem(LANG_STORAGE_KEY, next);
      } catch {
        // storage can be blocked in private mode
      }
      const url = new URL(window.location.href);
      url.searchParams.set('lang', next);
      window.history.replaceState(window.history.state, '', url);

      const apply = (): void => {
        flushSync(() => {
          setLangState(next);
        });
      };
      if (canAnimateTransitions()) {
        document.startViewTransition(apply);
        return;
      }
      apply();
    },
    [lang],
  );

  const value = useMemo(() => ({ lang, t: DICTIONARIES[lang], setLang }), [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};
