import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

import { Phone } from '../../components/phone/phone';
import { ThemedScreen } from '../../components/phone/themed-screen';
import { useI18n } from '../../i18n/i18n-context';
import { ListenDemo } from './listen-demo';

import type { JSX } from 'react';

import styles from './tours.module.css';

export const Tours = (): JSX.Element => {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const backY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const frontY = useTransform(scrollYProgress, [0, 1], [-30, 50]);

  return (
    <section ref={sectionRef} id="tours" className="section section-band">
      <div className={`container ${styles['layout']}`}>
        <div className={styles['phones']}>
          <motion.div className={styles['phone-back']} style={{ y: backY }}>
            <Phone>
              <ThemedScreen name="generate" sizes="(max-width: 767px) 46vw, 250px" />
            </Phone>
          </motion.div>
          <motion.div className={styles['phone-front']} style={{ y: frontY }}>
            <Phone>
              <ThemedScreen name="tour" sizes="(max-width: 767px) 50vw, 290px" />
            </Phone>
          </motion.div>
        </div>
        <div className={styles['copy']}>
          <h2 className="heading-2">{t.tours.title}</h2>
          <p className="lead">{t.tours.lead}</p>
          <h3 className={styles['subtitle']}>{t.tours.listenTitle}</h3>
          <ul className={styles['features']}>
            {t.tours.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <p className={styles['key-note']}>
            {t.tours.keyNote} <a href="#install">{t.tours.keyLink}</a>
          </p>
          <ListenDemo />
        </div>
      </div>
    </section>
  );
};
