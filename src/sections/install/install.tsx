import { DownloadButton } from '../../components/button/download-button';
import { Phone } from '../../components/phone/phone';
import { ThemedScreen } from '../../components/phone/themed-screen';
import { useI18n } from '../../i18n/i18n-context';
import { APK_URL, RELEASES_URL } from '../../lib/links';
import { useLatestRelease } from '../../lib/use-latest-release';
import { QrCode } from './qr-code';

import type { JSX } from 'react';

import styles from './install.module.css';

export const Install = (): JSX.Element => {
  const { t, lang } = useI18n();
  const release = useLatestRelease();
  const releaseDate = release?.publishedAt
    ? new Intl.DateTimeFormat(lang === 'ru' ? 'ru-RU' : 'en-GB', { dateStyle: 'long' }).format(
        new Date(release.publishedAt),
      )
    : null;

  return (
    <section id="install" className="section section-band">
      <div className="container">
        <div className={styles['top']}>
          <div className={styles['intro']}>
            <h2 className="heading-2">{t.install.title}</h2>
            <p className="lead">{t.install.lead}</p>
          </div>
          <div className={styles['download']}>
            <div className={styles['download-main']}>
              <DownloadButton />
              <ul className={styles['meta']}>
                <li>{t.install.requirements}</li>
                {release && <li>{t.download.version(release.version)}</li>}
                {releaseDate && <li>{releaseDate}</li>}
              </ul>
              <a className={styles['releases']} href={RELEASES_URL} target="_blank" rel="noopener">
                {t.install.releases}
              </a>
            </div>
            <figure className={styles['qr']}>
              <QrCode className={styles['qr-code']} value={APK_URL} />
              <figcaption className={styles['qr-caption']}>{t.install.qr}</figcaption>
            </figure>
          </div>
        </div>
        <div className={styles['bottom']}>
          <ol className={styles['steps']}>
            {t.install.steps.map((step, index) => (
              <li key={step.title} className={styles['step']}>
                <span className={styles['number']} aria-hidden="true">
                  {index + 1}
                </span>
                <h3 className={styles['step-title']}>{step.title}</h3>
                <p className={styles['step-text']}>{step.text}</p>
              </li>
            ))}
          </ol>
          <div className={styles['visual']}>
            <Phone className={styles['phone']}>
              <ThemedScreen name="settings" sizes="(max-width: 767px) 60vw, 260px" />
            </Phone>
          </div>
        </div>
      </div>
    </section>
  );
};
