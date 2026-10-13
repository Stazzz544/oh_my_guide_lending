import { useI18n } from '../../i18n/i18n-context';

import type { JSX } from 'react';

import styles from './faq.module.css';

export const Faq = (): JSX.Element => {
  const { t } = useI18n();

  return (
    <section id="faq" className="section">
      <div className={`container ${styles['layout']}`}>
        <h2 className="heading-2">{t.faq.title}</h2>
        <div className={styles['list']}>
          {t.faq.items.map((item) => (
            <details key={item.question} className={styles['item']} name="faq">
              <summary className={styles['question']}>
                <span>{item.question}</span>
                <span className={styles['marker']} aria-hidden="true" />
              </summary>
              <p className={styles['answer']}>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
