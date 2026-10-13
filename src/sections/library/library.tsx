import { Phone } from '../../components/phone/phone';
import { ThemedScreen } from '../../components/phone/themed-screen';
import { useI18n } from '../../i18n/i18n-context';

import type { JSX } from 'react';

import styles from './library.module.css';

export const Library = (): JSX.Element => {
  const { t } = useI18n();

  return (
    <section id="saved" className="section">
      <div className={`container ${styles['layout']}`}>
        <div className={styles['copy']}>
          <h2 className="heading-2">{t.library.title}</h2>
          <p className="lead">{t.library.text}</p>
        </div>
        <div className={styles['visual']}>
          <Phone className={styles['phone']}>
            <ThemedScreen name="saved" sizes="(max-width: 767px) 64vw, 300px" />
          </Phone>
        </div>
      </div>
    </section>
  );
};
