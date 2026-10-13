import { Phone } from '../../components/phone/phone';
import { ThemedScreen } from '../../components/phone/themed-screen';
import { useI18n } from '../../i18n/i18n-context';
import { preloadOtherThemeScreens } from '../../theme/preload-screens';
import { useTheme } from '../../theme/theme-context';

import type { JSX } from 'react';

import styles from './themes.module.css';

export const Themes = (): JSX.Element => {
  const { t } = useI18n();
  const { theme, toggleTheme } = useTheme();

  return (
    <section className="section section-band">
      <div className={`container ${styles['layout']}`}>
        <div className={styles['phones']}>
          <Phone className={styles['phone-light']}>
            <ThemedScreen name="route" fixedTheme="light" sizes="(max-width: 767px) 44vw, 260px" />
          </Phone>
          <Phone className={styles['phone-dark']}>
            <ThemedScreen name="route" fixedTheme="dark" sizes="(max-width: 767px) 44vw, 260px" />
          </Phone>
        </div>
        <div className={styles['copy']}>
          <h2 className="heading-2">{t.themes.title}</h2>
          <p className="lead">{t.themes.text}</p>
          <div className={styles['switch']}>
            <button
              type="button"
              className={styles['switch-button']}
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
              <span className={styles['switch-track']} aria-hidden="true">
                <span className={styles['switch-thumb']} />
              </span>
              {t.themes.button}
            </button>
            <p className={styles['caption']}>{t.themes.caption}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
