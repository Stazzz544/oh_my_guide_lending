import { useI18n } from '../../i18n/i18n-context';
import { cx } from '../../lib/cx';

import type { Lang } from '../../i18n/detect-language';
import type { JSX } from 'react';

import styles from './header.module.css';

const LANGUAGES: Array<{ code: Lang; label: string; name: string }> = [
  { code: 'ru', label: 'RU', name: 'Русский' },
  { code: 'en', label: 'EN', name: 'English' },
];

export const LangSwitch = (): JSX.Element => {
  const { lang, setLang, t } = useI18n();

  return (
    <div className={styles['segmented']} role="group" aria-label={t.a11y.language}>
      {LANGUAGES.map((language) => (
        <button
          key={language.code}
          type="button"
          className={cx(styles['segment'], lang === language.code && styles['segment-active'])}
          aria-pressed={lang === language.code}
          aria-label={language.name}
          lang={language.code}
          onClick={() => {
            setLang(language.code);
          }}
        >
          {language.label}
        </button>
      ))}
    </div>
  );
};
