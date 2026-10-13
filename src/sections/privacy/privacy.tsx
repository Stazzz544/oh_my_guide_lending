import { useI18n } from '../../i18n/i18n-context';

import type { JSX } from 'react';

import styles from './privacy.module.css';

export const Privacy = (): JSX.Element => {
  const { t } = useI18n();

  return (
    <section className="section">
      <div className="container">
        <h2 className={`heading-2 ${styles['title']}`}>{t.privacy.title}</h2>
        <dl className={styles['list']}>
          {t.privacy.items.map((item) => (
            <div key={item.title} className={styles['item']}>
              <dt className={styles['term']}>{item.title}</dt>
              <dd className={styles['description']}>{item.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
