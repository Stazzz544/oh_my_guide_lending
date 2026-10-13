import { motion, useScroll } from 'motion/react';

import { useI18n } from '../../i18n/i18n-context';
import { APK_URL, ICON_URL } from '../../lib/links';
import { ButtonLink } from '../button/button-link';
import { DownloadIcon } from '../icons/icons';
import { LangSwitch } from './lang-switch';
import { ThemeToggle } from './theme-toggle';

import type { JSX } from 'react';

import styles from './header.module.css';

export const Header = (): JSX.Element => {
  const { t } = useI18n();
  const { scrollYProgress } = useScroll();

  return (
    <header className={styles['header']}>
      <a className="skip-link" href="#main">
        {t.a11y.skip}
      </a>
      <div className={`container ${styles['inner']}`}>
        <a className={styles['brand']} href="#top" aria-label={t.a11y.home}>
          <img className={styles['logo']} src={ICON_URL} width={32} height={32} alt="" />
          <span className={styles['wordmark']}>OhMyGuide</span>
        </a>
        <nav className={styles['nav']} aria-label={t.a11y.navigation}>
          {t.nav.map((item) => (
            <a key={item.href} className={styles['nav-link']} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className={styles['controls']}>
          <LangSwitch />
          <ThemeToggle />
          <ButtonLink href={APK_URL} size="compact" className={styles['cta']}>
            <DownloadIcon />
            <span className={styles['cta-full']}>{t.download.full}</span>
            <span className={styles['cta-short']}>{t.download.short}</span>
          </ButtonLink>
        </div>
      </div>
      <div className={styles['route']} aria-hidden="true">
        <motion.div className={styles['route-fill']} style={{ scaleX: scrollYProgress }} />
      </div>
    </header>
  );
};
