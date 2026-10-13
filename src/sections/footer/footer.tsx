import { useI18n } from '../../i18n/i18n-context';
import { ICON_URL, RELEASES_URL, REPO_URL } from '../../lib/links';

import type { JSX } from 'react';

import styles from './footer.module.css';

export const Footer = (): JSX.Element => {
  const { t } = useI18n();

  return (
    <footer className={styles['footer']}>
      <div className={`container ${styles['layout']}`}>
        <div className={styles['brand']}>
          <img className={styles['logo']} src={ICON_URL} width={44} height={44} alt="" />
          <div>
            <p className={styles['name']}>OhMyGuide</p>
            <p className={styles['tagline']}>{t.footer.tagline}</p>
          </div>
        </div>
        <ul className={styles['links']}>
          <li>
            <a href={REPO_URL} target="_blank" rel="noopener">
              {t.footer.github}
            </a>
          </li>
          <li>
            <a href={RELEASES_URL} target="_blank" rel="noopener">
              {t.footer.releases}
            </a>
          </li>
        </ul>
        <div className={styles['notes']}>
          <p>{t.footer.screenshots}</p>
          <p>{t.footer.credits}</p>
          <p>© 2026 OhMyGuide</p>
        </div>
      </div>
    </footer>
  );
};
