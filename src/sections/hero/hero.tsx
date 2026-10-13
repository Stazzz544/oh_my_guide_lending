import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

import { DownloadButton } from '../../components/button/download-button';
import { ButtonLink } from '../../components/button/button-link';
import { GithubIcon } from '../../components/icons/icons';
import { Phone } from '../../components/phone/phone';
import { ThemedScreen } from '../../components/phone/themed-screen';
import { useI18n } from '../../i18n/i18n-context';
import { REPO_URL } from '../../lib/links';
import { AnimatedTitle } from './animated-title';
import { titleDuration } from './hero-timing';
import { RadiusLegend } from './radius-legend';
import { RadiusRings } from './radius-rings';

import type { JSX } from 'react';

import styles from './hero.module.css';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const Hero = (): JSX.Element => {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const phoneY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  return (
    <section ref={sectionRef} id="top" className={styles['hero']}>
      <div className={`container ${styles['layout']}`}>
        <div className={styles['copy']}>
          <AnimatedTitle lines={t.hero.titleLines} />
          <motion.div
            className={styles['details']}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: titleDuration(t.hero.titleLines) * 0.7, duration: 0.9, ease: EASE_OUT }}
          >
            <p className="lead">{t.hero.lead}</p>
            <div className={styles['actions']}>
              <DownloadButton />
              <ButtonLink href={REPO_URL} variant="secondary" size="large" external>
                <GithubIcon />
                <span>{t.hero.github}</span>
              </ButtonLink>
            </div>
            <ul className={styles['facts']}>
              {t.hero.facts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          </motion.div>
        </div>
        <div className={styles['stage']}>
          <motion.div className={styles['parallax']} style={{ y: phoneY }}>
            <motion.div
              className={styles['phone-wrap']}
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE_OUT }}
            >
              <RadiusRings progress={scrollYProgress} />
              <Phone className={styles['phone']}>
                <ThemedScreen name="nearby-map" sizes="(max-width: 767px) 66vw, 340px" priority />
              </Phone>
              <RadiusLegend labels={t.hero.rings} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
